import { KeyRound, Palette, UserRound } from "lucide-react";
import { Suspense } from "react";
import { PageHeader } from "@/components/kit/page-header";
import { IconChip } from "@/components/kit/stat-card";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { requireUser } from "@/lib/auth/dal";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { NameForm, PasswordForm } from "./profile-forms";

export const metadata = { title: "Meu perfil" };

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border bg-card p-5 shadow-sm md:p-6">
      <div className="flex items-start gap-3">
        <IconChip icon={icon} />
        <div>
          <h2 className="font-heading text-base font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function PerfilPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader title="Meu perfil" description="Seus dados de acesso e preferências." />

      <Section icon={Palette} title="Aparência" description="Escolha o tema deste aparelho.">
        <ThemeToggle className="w-full sm:w-auto" />
      </Section>

      <Suspense fallback={<div className="h-56 animate-pulse rounded-2xl bg-muted" />}>
        <AccountSection />
      </Suspense>

      <Section
        icon={KeyRound}
        title="Senha"
        description="Use pelo menos 8 caracteres. Não compartilhe sua senha com colegas."
      >
        <PasswordForm />
      </Section>
    </div>
  );
}

async function AccountSection() {
  const user = await requireUser();
  return (
    <Section
      icon={UserRound}
      title="Conta"
      description="Seu usuário e perfil são definidos pelo administrador."
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">Usuário</dt>
          <dd className="font-mono text-sm">{user.username}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Perfil de acesso</dt>
          <dd className="text-sm font-medium">{ROLE_LABELS[user.role]}</dd>
        </div>
      </dl>
      <NameForm fullName={user.fullName} />
    </Section>
  );
}
