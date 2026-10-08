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
import { requireOrg } from "@/lib/auth/dal";
import { exclusiveMembers } from "@/lib/auth/people";
import { can, expandPermissions, roleRequiresMfa } from "@/lib/auth/permissions";
import { formatDate, initials } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { cn } from "cn";
import {
  CreateMemberDialog,
  EditMemberDialog,
  ResetMfaDialog,
  ResetPasswordDialog,
  type RoleOption,
  type TeamMember,
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
  const { session, membership } = await requireOrg("equipe.ver");
  const canManage = can(membership.permissions, "equipe.gerenciar");
  const supabase = await createClient();
  const [{ data, error }, { data: roleRows }] = await Promise.all([
    supabase
      .from("organization_members")
      .select(
        "user_id, role_id, active, created_at, profiles(username, full_name, email), organization_roles(name, is_admin, permissions)",
      )
      .eq("organization_id", membership.organizationId),
    supabase
      .from("organization_roles")
      .select("id, name, description, is_admin, permissions")
      .eq("organization_id", membership.organizationId)
      .order("is_admin", { ascending: false })
      .order("name"),
  ]);

  // Só aparecem para escolha os perfis que quem está logado pode atribuir (o banco também confere).
  const roles: RoleOption[] = (roleRows ?? [])
    .filter(
      (r) =>
        membership.isAdmin ||
        (!r.is_admin &&
          expandPermissions(r.permissions).every((p) => membership.permissions.includes(p))),
    )
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      requiresMfa: roleRequiresMfa({ isAdmin: r.is_admin, permissions: r.permissions }),
    }));

  const rows = (data ?? []).filter((row) => row.profiles && row.organization_roles);
  const exclusive = await exclusiveMembers(
    membership.organizationId,
    rows.map((row) => row.user_id),
  );
  const members: (TeamMember & { since: string })[] = rows
    .map((row) => ({
      userId: row.user_id,
      username: row.profiles!.username,
      fullName: row.profiles!.full_name,
      email: row.profiles!.email,
      roleId: row.role_id,
      roleName: row.organization_roles!.name,
      requiresMfa: roleRequiresMfa({
        isAdmin: row.organization_roles!.is_admin,
        permissions: row.organization_roles!.permissions,
      }),
      active: row.active,
      exclusive: exclusive.has(row.user_id),
      isSelf: row.user_id === session.id,
      since: row.created_at,
    }))
    .sort((a, b) => Number(b.active) - Number(a.active) || a.fullName.localeCompare(b.fullName));

  const header = (
    <PageHeader
      title="Equipe"
      description={`${membership.name} · ${members.filter((m) => m.active).length} ativos`}
      actions={canManage ? <CreateMemberDialog roles={roles} /> : undefined}
    />
  );

  if (error) {
    return (
      <>
        {header}
        <p className="text-destructive">Não foi possível carregar a equipe.</p>
      </>
    );
  }

  // Quem só tem "equipe.ver" vê a lista, sem os botões de ação.
  const actions = (member: TeamMember) =>
    canManage && (
      <div className="flex flex-wrap justify-end gap-1">
        {member.requiresMfa && <ResetMfaDialog member={member} />}
        <ResetPasswordDialog member={member} />
        <EditMemberDialog member={member} roles={roles} />
      </div>
    );

  const identity = (member: TeamMember) => (
    <>
      <span className="font-mono">{member.username}</span>
      {member.email && <span className="text-muted-foreground"> · {member.email}</span>}
    </>
  );

  return (
    <>
      {header}

      {/* Celular: cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {members.map((member) => (
          <li
            key={member.userId}
            className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-accent font-semibold text-accent-foreground">
                  {initials(member.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{member.fullName}</p>
                <p className="truncate text-xs">{identity(member)}</p>
              </div>
              <StatusPill active={member.active} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">{member.roleName}</span>
              {actions(member)}
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop/tablet: tabela */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Pessoa</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Desde</TableHead>
              <TableHead className="pr-5 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.userId} className={cn(!member.active && "opacity-70")}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                        {initials(member.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium">
                        {member.fullName}
                        {member.isSelf && (
                          <span className="font-normal text-muted-foreground"> (você)</span>
                        )}
                      </p>
                      <p className="truncate text-xs">{identity(member)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.roleName}</TableCell>
                <TableCell>
                  <StatusPill active={member.active} />
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(member.since)}</TableCell>
                <TableCell className="pr-5">{actions(member)}</TableCell>
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
