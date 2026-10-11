import { Tv } from "lucide-react";
import { Suspense } from "react";
import { BackLink, ListSkeleton } from "@/components/kit/back-link";
import { Pill } from "@/components/kit/data-list";
import { PageHeader } from "@/components/kit/page-header";
import { IconChip } from "@/components/kit/stat-card";
import { requireOrg } from "@/lib/auth/dal";
import { formatDateTime } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { NewTvButton, RotationDialog, TvDeviceActions } from "./tv-client";

export const metadata = { title: "Dispositivos de TV" };

export default function TvConfigPage() {
  return (
    <div className="flex flex-col gap-6">
      <BackLink href="/configuracoes" label="Configurações" />
      <Suspense fallback={<ListSkeleton />}>
        <Dispositivos />
      </Suspense>
    </div>
  );
}

async function Dispositivos() {
  const { membership } = await requireOrg("configuracoes.gerenciar");
  const org = membership.organizationId;
  const supabase = await createClient();
  const [{ data: devices }, { data: settings }] = await Promise.all([
    supabase
      .from("tv_devices")
      .select("id, name, token, show_financials, revoked_at, last_seen_at, created_at")
      .eq("organization_id", org)
      .order("revoked_at", { ascending: true, nullsFirst: true })
      .order("created_at"),
    supabase
      .from("organization_settings")
      .select("tv_rotation_seconds")
      .eq("organization_id", org)
      .maybeSingle(),
  ]);
  const list = devices ?? [];

  return (
    <>
      <PageHeader
        title="Dispositivos de TV"
        description="Painel da produção em tela cheia: pedidos por etapa, prazos, artes, faturamento e estoque crítico."
        actions={
          <>
            <RotationDialog seconds={settings?.tv_rotation_seconds ?? 15} />
            <NewTvButton />
          </>
        }
      />

      <ol className="grid gap-2 rounded-2xl border bg-card p-4 text-sm shadow-sm md:grid-cols-3">
        <li>
          <strong>1.</strong> Crie a TV aqui e toque em <em>Copiar link</em>.
        </li>
        <li>
          <strong>2.</strong> Abra o link no navegador da TV (ou de um computador ligado nela).
        </li>
        <li>
          <strong>3.</strong> Toque na tela para entrar em tela cheia. O painel atualiza sozinho a
          cada 30 s.
        </li>
      </ol>

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Nenhuma TV ainda.
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {list.map((d) => (
            <li
              key={d.id}
              className={`flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm ${d.revoked_at ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <IconChip icon={Tv} tone={d.revoked_at ? "warning" : "primary"} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.last_seen_at
                      ? `Visto por último ${formatDateTime(d.last_seen_at)}`
                      : "Ainda não foi aberta"}
                  </p>
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {d.revoked_at ? (
                    <Pill tone="danger">Desligada</Pill>
                  ) : (
                    <Pill tone="success">Ativa</Pill>
                  )}
                  <Pill>{d.show_financials ? "Mostra R$" : "Sem valores"}</Pill>
                </div>
              </div>
              <TvDeviceActions
                device={{
                  id: d.id,
                  name: d.name,
                  token: d.token,
                  show_financials: d.show_financials,
                  revoked: Boolean(d.revoked_at),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
