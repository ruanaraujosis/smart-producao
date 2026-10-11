"use server";

import { revalidatePath } from "next/cache";
import { requireOrg } from "@/lib/auth/dal";
import { dbErrorMessage, type ActionResult } from "@/lib/crud";
import { admin } from "@/lib/marketplaces/store";
import { createClient } from "@/lib/supabase/server";
import { shopSettingsSchema } from "./schema";

const PAGE = "/configuracoes/integracoes";

export async function saveShopSettings(id: string, input: unknown): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const parsed = shopSettingsSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const v = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("marketplace_shops")
    .update({
      name: v.name,
      stock_ratio: v.stock_pct / 100,
      chat_message_enabled: v.chat_message_enabled,
      chat_template: v.chat_template,
    })
    .eq("id", id)
    .eq("organization_id", membership.organizationId);
  if (error)
    return { ok: false, error: dbErrorMessage(error, { fallback: "Não foi possível salvar." }) };
  // Margem nova: reenvia o estoque de todos os anúncios da loja.
  await admin().rpc("marketplace_enqueue", {
    p_shop: id,
    p_kind: "stock.push_all",
    p_dedupe: "stock_all",
  });
  revalidatePath(PAGE);
  return { ok: true, message: "Loja atualizada." };
}

export async function disconnectShop(id: string): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const supabase = await createClient();
  // Confere pela sessão (RLS) que a loja é desta gráfica antes de usar a chave secreta.
  const { data: shop } = await supabase
    .from("marketplace_shops")
    .select("id")
    .eq("id", id)
    .eq("organization_id", membership.organizationId)
    .maybeSingle();
  if (!shop) return { ok: false, error: "Loja não encontrada." };
  const { error } = await admin().rpc("marketplace_forget_tokens", { p_shop: id });
  if (error) return { ok: false, error: "Não foi possível desconectar." };
  revalidatePath(PAGE);
  return { ok: true, message: "Loja desconectada. A autorização foi apagada." };
}

export async function retryFailedJobs(shopId: string): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const supabase = await createClient();
  const { data: shop } = await supabase
    .from("marketplace_shops")
    .select("id")
    .eq("id", shopId)
    .eq("organization_id", membership.organizationId)
    .maybeSingle();
  if (!shop) return { ok: false, error: "Loja não encontrada." };
  const { error, count } = await admin()
    .from("marketplace_jobs")
    .update(
      { status: "pendente", attempts: 0, run_after: new Date().toISOString() },
      { count: "exact" },
    )
    .eq("shop_id", shopId)
    .eq("status", "erro");
  if (error) return { ok: false, error: "Não foi possível reenfileirar." };
  revalidatePath(PAGE);
  return { ok: true, message: `${count ?? 0} tarefa(s) voltaram para a fila.` };
}
