import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasRole, type AppRole } from "./roles";

export type CurrentUser = {
  id: string;
  username: string;
  fullName: string;
  role: AppRole;
};

/**
 * Camada de acesso a dados: único ponto que lê a sessão e o perfil.
 * Usuário sem perfil ou desativado é tratado como deslogado.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, full_name, role, active")
    .eq("id", userId)
    .maybeSingle();

  if (!profile?.active) return null;
  return {
    id: profile.id,
    username: profile.username,
    fullName: profile.full_name,
    role: profile.role,
  };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Garante o perfil (lista vazia = qualquer usuário ativo); sem permissão, volta para o início. */
export async function requireRole(allowed: readonly AppRole[]) {
  const user = await requireUser();
  if (allowed.length > 0 && !hasRole(user.role, allowed)) redirect("/inicio");
  return user;
}
