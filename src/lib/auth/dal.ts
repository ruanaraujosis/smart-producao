import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  ACTIVE_ORG_COOKIE,
  requiresMfa,
  resolveActiveMembership,
  type Membership,
} from "./organization";
import { hasRole, isAppRole, type AppRole } from "./roles";

export type Session = {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  /** Nível da sessão: aal2 = senha + código do autenticador. */
  aal: "aal1" | "aal2";
  isPlatformAdmin: boolean;
  /** Gráficas ativas em que a pessoa trabalha. */
  memberships: Membership[];
  mfaRequired: boolean;
};

/**
 * Camada de acesso a dados: o único ponto que lê a sessão, o perfil e os vínculos.
 * Pessoa sem perfil é tratada como deslogada.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;

  const [profileResult, membersResult, platformResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, username, full_name, email")
      .eq("id", claims.sub)
      .maybeSingle(),
    supabase
      .from("organization_members")
      .select("role, organizations(id, slug, name)")
      .eq("user_id", claims.sub)
      .eq("active", true),
    supabase.from("platform_admins").select("user_id").eq("user_id", claims.sub).maybeSingle(),
  ]);

  const profile = profileResult.data;
  if (!profile) return null;

  const rows = membersResult.data ?? [];
  const isPlatformAdmin = Boolean(platformResult.data);
  // Antes do MFA o banco esconde as gráficas em que a pessoa é admin; o perfil, não.
  const memberships = rows.flatMap((row) =>
    row.organizations && isAppRole(row.role)
      ? [
          {
            organizationId: row.organizations.id,
            slug: row.organizations.slug,
            name: row.organizations.name,
            role: row.role,
          },
        ]
      : [],
  );

  return {
    id: profile.id,
    username: profile.username,
    fullName: profile.full_name,
    email: profile.email,
    aal: claims.aal === "aal2" ? "aal2" : "aal1",
    isPlatformAdmin,
    memberships,
    mfaRequired: requiresMfa({ isPlatformAdmin, roles: rows.map((row) => row.role) }),
  };
});

/** Logado e, se for admin, com o segundo fator confirmado. */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.mfaRequired && session.aal !== "aal2") redirect("/mfa");
  return session;
}

export const getActiveMembership = cache(async (session: Session) => {
  const preferred = (await cookies()).get(ACTIVE_ORG_COOKIE)?.value;
  return resolveActiveMembership(session.memberships, preferred);
});

/** Para as telas sem gráfica obrigatória (perfil, plataforma): sessão + gráfica ativa, se houver. */
export async function getShellContext() {
  const session = await requireUser();
  const membership = await getActiveMembership(session);
  return { session, membership };
}

/**
 * Exige uma gráfica ativa e, opcionalmente, um dos perfis nela
 * (lista vazia = qualquer membro). O admin da gráfica passa em todas.
 */
export async function requireOrg(allowed: readonly AppRole[] = []) {
  const session = await requireUser();
  const membership = await getActiveMembership(session);

  if (!membership) {
    if (session.memberships.length > 1) redirect("/selecionar-empresa");
    redirect(session.isPlatformAdmin ? "/plataforma" : "/sem-acesso");
  }
  if (allowed.length > 0 && !hasRole(membership.role, allowed)) redirect("/inicio");

  return { session, membership };
}

export async function requirePlatformAdmin() {
  const session = await requireUser();
  if (!session.isPlatformAdmin) redirect("/inicio");
  return session;
}
