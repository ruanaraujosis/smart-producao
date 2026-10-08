import { CheckCircle2, CircleDashed } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ChannelBadge } from "@/components/kit/channel-badge";
import { PageHeader } from "@/components/kit/page-header";
import { IconChip, type Tone } from "@/components/kit/stat-card";
import { requireOrg } from "@/lib/auth/dal";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { TIME_ZONE } from "@/lib/format";
import { navItemsFor } from "@/lib/navigation";

export const metadata = { title: "Início" };

const ROADMAP = [
  {
    phase: 1,
    title: "Fundação",
    detail: "Multi-empresa, perfis por gráfica, MFA, tema claro/escuro",
  },
  {
    phase: 2,
    title: "Cadastros + Estoque",
    detail: "Produtos, variações, insumos e ficha técnica",
  },
  { phase: 3, title: "Pedidos + PCP + Artes", detail: "Kanban em tempo real e aprovação de artes" },
  { phase: 4, title: "TV + Financeiro", detail: "Painel para TV e financeiro básico" },
  { phase: 5, title: "Shopee", detail: "Produtos, estoque, pedidos, etiquetas e rastreio" },
  { phase: 6, title: "NF-e automática", detail: "Emissão e reforma tributária (IBS/CBS)" },
  { phase: 7, title: "Marketing Shopee", detail: "Impulsionamento e respostas com IA" },
  { phase: 8, title: "Magalu e TikTok Shop", detail: "Mesma camada de integrações" },
];

const CURRENT_PHASE = 1;
const SHORTCUT_TONES: Tone[] = ["primary", "pink", "info", "success", "warning"];

export default function InicioPage() {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<div className="h-14 w-72 animate-pulse rounded-xl bg-muted" />}>
        <Greeting />
      </Suspense>

      <section aria-labelledby="atalhos" className="flex flex-col gap-3">
        <h2 id="atalhos" className="font-heading text-base font-semibold">
          Seus módulos
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          }
        >
          <Shortcuts />
        </Suspense>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section
          aria-labelledby="roadmap"
          className="rounded-2xl border bg-card p-5 shadow-sm lg:col-span-2"
        >
          <h2 id="roadmap" className="font-heading text-base font-semibold">
            Andamento do projeto
          </h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {ROADMAP.map((step) => {
              const done = step.phase <= CURRENT_PHASE;
              return (
                <li key={step.phase} className="flex items-start gap-3 rounded-xl p-2">
                  {done ? (
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-success"
                      aria-label="Concluída"
                    />
                  ) : (
                    <CircleDashed
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      aria-label="Pendente"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      Fase {step.phase} · {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="canais" className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 id="canais" className="font-heading text-base font-semibold">
            Canais de venda
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Todos os pedidos vão chegar numa lista só, identificados por canal.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ChannelBadge channel="shopee" />
            <ChannelBadge channel="magalu" />
            <ChannelBadge channel="tiktok" />
            <ChannelBadge channel="whatsapp" />
            <ChannelBadge channel="balcao" />
          </div>
        </section>
      </div>
    </div>
  );
}

function greetingFor(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: TIME_ZONE,
    }).format(date),
  );
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

async function Greeting() {
  const { session, membership } = await requireOrg();
  const firstName = session.fullName.split(" ")[0];
  return (
    <PageHeader
      title={`${greetingFor(new Date())}, ${firstName}!`}
      description={`${membership.name} · você está como ${ROLE_LABELS[membership.role]}.`}
    />
  );
}

async function Shortcuts() {
  const { session, membership } = await requireOrg();
  const items = navItemsFor({
    role: membership.role,
    isPlatformAdmin: session.isPlatformAdmin,
  }).filter((item) => item.href !== "/inicio");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm transition-shadow outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <IconChip icon={item.icon} tone={SHORTCUT_TONES[index % SHORTCUT_TONES.length]} />
          <div>
            <p className="font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">
              {item.phase ? `Fase ${item.phase} · em breve` : "Disponível"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
