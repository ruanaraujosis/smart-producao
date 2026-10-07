import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/kit/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/lib/auth/dal";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { formatDate, initials } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { cn } from "cn";
import {
  CreateUserDialog,
  EditUserDialog,
  ResetPasswordDialog,
  type TeamUser,
} from "./user-dialogs";

export const metadata = { title: "Usuários" };

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/configuracoes"
        className="-mb-2 inline-flex min-h-11 items-center gap-1 self-start text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Configurações
      </Link>
      <Suspense fallback={<UsersSkeleton />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        active ? "bg-success-soft text-success" : "bg-muted text-muted-foreground",
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {active ? "Ativo" : "Desativado"}
    </span>
  );
}

async function UsersContent() {
  const me = await requireRole(["admin"]);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, role, active, created_at")
    .order("active", { ascending: false })
    .order("full_name");

  const users = (data ?? []).map((row) => ({
    id: row.id,
    username: row.username,
    fullName: row.full_name,
    role: row.role,
    active: row.active,
    createdAt: row.created_at,
  }));

  const header = (
    <PageHeader
      title="Usuários"
      description={`${users.filter((u) => u.active).length} ativos · login no formato nome.cargo`}
      actions={<CreateUserDialog />}
    />
  );

  if (error) {
    return (
      <>
        {header}
        <p className="text-destructive">Não foi possível carregar os usuários.</p>
      </>
    );
  }

  const actions = (user: TeamUser) => (
    <div className="flex justify-end gap-1">
      <ResetPasswordDialog user={user} />
      <EditUserDialog user={user} isSelf={user.id === me.id} />
    </div>
  );

  return (
    <>
      {header}

      {/* Celular: cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-accent font-semibold text-accent-foreground">
                  {initials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{user.fullName}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">{user.username}</p>
              </div>
              <StatusPill active={user.active} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">{ROLE_LABELS[user.role]}</span>
              {actions(user)}
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop/tablet: tabela */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Nome</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Desde</TableHead>
              <TableHead className="pr-5 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={cn(!user.active && "opacity-70")}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                        {initials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {user.fullName}
                      {user.id === me.id && (
                        <span className="font-normal text-muted-foreground"> (você)</span>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{user.username}</TableCell>
                <TableCell>{ROLE_LABELS[user.role]}</TableCell>
                <TableCell>
                  <StatusPill active={user.active} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="pr-5">{actions(user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function UsersSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="h-14 w-64 animate-pulse rounded-xl bg-muted" />
      <div className="h-80 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
