"use server";

import { revalidatePath } from "next/cache";
import { requireOrg } from "@/lib/auth/dal";
import { dbErrorMessage, type ActionResult } from "@/lib/crud";
import { createClient } from "@/lib/supabase/server";
import { tvDeviceSchema, tvRotationSchema } from "./schema";

const PAGE = "/configuracoes/tv";

export async function saveTvDevice(input: unknown, id?: string): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const parsed = tvDeviceSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const supabase = await createClient();
  const { error } = id
    ? await supabase
        .from("tv_devices")
        .update(parsed.data)
        .eq("id", id)
        .eq("organization_id", membership.organizationId)
    : await supabase
        .from("tv_devices")
        .insert({ ...parsed.data, organization_id: membership.organizationId });
  if (error)
    return {
      ok: false,
      error: dbErrorMessage(error, { fallback: "Não foi possível salvar a TV." }),
    };
  revalidatePath(PAGE);
  return { ok: true, message: id ? "TV atualizada." : "TV criada. Abra o link dela na TV." };
}

export async function revokeTvDevice(id: string): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const supabase = await createClient();
  const { error } = await supabase
    .from("tv_devices")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", id)
    .eq("organization_id", membership.organizationId);
  if (error)
    return { ok: false, error: dbErrorMessage(error, { fallback: "Não foi possível revogar." }) };
  revalidatePath(PAGE);
  return { ok: true, message: "TV desligada. O link parou de funcionar." };
}

export async function saveTvRotation(input: unknown): Promise<ActionResult> {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const parsed = tvRotationSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Valor inválido." };
  const supabase = await createClient();
  const { error } = await supabase.from("organization_settings").upsert(
    {
      organization_id: membership.organizationId,
      tv_rotation_seconds: parsed.data.tv_rotation_seconds,
    },
    { onConflict: "organization_id" },
  );
  if (error)
    return { ok: false, error: dbErrorMessage(error, { fallback: "Não foi possível salvar." }) };
  revalidatePath(PAGE);
  return { ok: true, message: "Tempo de cada tela salvo." };
}
