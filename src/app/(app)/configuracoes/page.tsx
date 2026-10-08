import { ChevronRight, PlugZap, Tv, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/kit/page-header";
import { IconChip, type Tone } from "@/components/kit/stat-card";
import { requireOrg } from "@/lib/auth/dal";

export const metadata = { title: "Configurações" };

const SECTIONS: {
  href?: string;
  title: string;
  description: string;
  icon: typeof Users;
  tone: Tone;
  phase?: number;
}[] = [
  {
    href: "/configuracoes/usuarios",
    title: "Usuários e perfis",
    description: "Cadastre a equipe, defina perfis de acesso e redefina senhas.",
    icon: Users,
    tone: "primary",
  },
  {
    title: "Integrações",
    description: "Lojas da Shopee, Magalu e TikTok Shop, e saúde das sincronizações.",
    icon: PlugZap,
    tone: "teal",
    phase: 5,
  },
  {
    title: "Dispositivos de TV",
    description: "Tokens de acesso somente leitura para o painel da produção.",
    icon: Tv,
    tone: "info",
    phase: 4,
  },
];

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Configurações" description="Administração do sistema." />
      <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-muted" />}>
        <SectionsGrid />
      </Suspense>
    </div>
  );
}

async function SectionsGrid() {
  await requireOrg(["admin"]);
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {SECTIONS.map((section) => {
        const content = (
          <>
            <IconChip icon={section.icon} tone={section.tone} />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{section.title}</p>
              <p className="text-sm text-muted-foreground">{section.description}</p>
              {section.phase && (
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Fase {section.phase} · em breve
                </p>
              )}
            </div>
            {section.href && (
              <ChevronRight className="size-5 self-center text-muted-foreground" aria-hidden />
            )}
          </>
        );
        const className = "bg-card flex items-start gap-4 rounded-2xl border p-5 shadow-sm";
        return section.href ? (
          <Link
            key={section.title}
            href={section.href}
            className={`${className} transition-shadow outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50`}
          >
            {content}
          </Link>
        ) : (
          <div key={section.title} className={`${className} opacity-75`}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
