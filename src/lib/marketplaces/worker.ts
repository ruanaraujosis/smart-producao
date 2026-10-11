import "server-only";
import type { Database } from "@/lib/supabase/database.types";
import { ShopeeError } from "./shopee/client";
import { admin, loadShop, shopCredentials, type ShopRow } from "./store";

type Job = Database["public"]["Tables"]["marketplace_jobs"]["Row"];

/** Tarefa da fila: recebe a loja e o payload; lança erro para tentar de novo. */
export type JobHandler = (ctx: { job: Job; shop: ShopRow }) => Promise<void>;

const handlers: Record<string, JobHandler> = {
  // Renova a autorização antes de vencer.
  "auth.refresh": async ({ shop }) => {
    await shopCredentials(shop, true);
  },
};

/** Registra um tipo de tarefa (cada etapa da integração acrescenta os seus). */
export function registerHandler(kind: string, handler: JobHandler) {
  handlers[kind] = handler;
}

/** Processa um lote da fila. Chamado pelo relógio do banco (pg_cron) ou logo após um aviso. */
export async function processJobs(limit = 20) {
  const db = admin();
  const { data: jobs, error } = await db.rpc("marketplace_claim_jobs", { p_limit: limit });
  if (error) throw new Error(`Fila indisponível: ${error.message}`);

  let done = 0;
  let failed = 0;
  for (const job of jobs ?? []) {
    const handler = handlers[job.kind];
    try {
      if (!handler) throw new Error(`Tarefa "${job.kind}" ainda não suportada.`);
      const shop = await loadShop(job.shop_id);
      if (!shop || shop.status === "desconectada") throw new Error("Loja desconectada.");
      await handler({ job, shop });
      await db.rpc("marketplace_finish_job", { p_job: job.id, p_ok: true });
      await db
        .from("marketplace_shops")
        .update({ last_sync_at: new Date().toISOString() })
        .eq("id", shop.id);
      done++;
    } catch (e) {
      const message =
        e instanceof ShopeeError
          ? `${e.code}: ${e.message}`
          : e instanceof Error
            ? e.message
            : "Erro desconhecido.";
      await db.rpc("marketplace_finish_job", { p_job: job.id, p_ok: false, p_error: message });
      failed++;
    }
  }
  return { claimed: jobs?.length ?? 0, done, failed };
}
