"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { usernameToEmail } from "@/lib/auth/username";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  createUserSchema,
  resetPasswordSchema,
  updateUserSchema,
  type CreateUserInput,
  type ResetPasswordInput,
  type UpdateUserInput,
} from "./schemas";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

const PAGE = "/configuracoes/usuarios";
/** "Banimento" longo = conta bloqueada no Auth enquanto o usuário estiver desativado. */
const DEACTIVATED_BAN = "876000h";

export async function createTeamUser(input: CreateUserInput): Promise<ActionResult> {
  await requireRole(["admin"]);
  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const { username, fullName, role, password } = parsed.data;

  const supabase = await createClient();
  const { data: taken } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (taken) return { ok: false, error: `O usuário "${username}" já existe.` };

  const admin = createAdminClient();
  const { data: created, error: authError } = await admin.auth.admin.createUser({
    email: usernameToEmail(username),
    password,
    email_confirm: true,
  });
  if (authError || !created.user) {
    return {
      ok: false,
      error: "Não foi possível criar o acesso. Verifique a senha e tente novamente.",
    };
  }

  // O perfil é gravado com a sessão do admin para a auditoria registrar quem criou.
  const { error: profileError } = await supabase.from("profiles").insert({
    id: created.user.id,
    username,
    full_name: fullName,
    role,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return { ok: false, error: "Não foi possível salvar o perfil do usuário." };
  }

  revalidatePath(PAGE);
  return { ok: true, message: `Usuário ${username} criado.` };
}

export async function updateTeamUser(input: UpdateUserInput): Promise<ActionResult> {
  const actor = await requireRole(["admin"]);
  const parsed = updateUserSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const { id, fullName, role, active } = parsed.data;

  if (id === actor.id && (role !== "admin" || !active)) {
    return {
      ok: false,
      error: "Você não pode alterar o próprio perfil de acesso nem se desativar.",
    };
  }

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("profiles")
    .select("active")
    .eq("id", id)
    .maybeSingle();
  if (!before) return { ok: false, error: "Usuário não encontrado." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, role, active })
    .eq("id", id);
  if (error) return { ok: false, error: "Não foi possível salvar as alterações." };

  if (before.active !== active) {
    const { error: banError } = await createAdminClient().auth.admin.updateUserById(id, {
      ban_duration: active ? "none" : DEACTIVATED_BAN,
    });
    if (banError) {
      return {
        ok: false,
        error: "Perfil salvo, mas não foi possível bloquear/liberar o login. Tente de novo.",
      };
    }
  }

  revalidatePath(PAGE);
  return { ok: true, message: "Usuário atualizado." };
}

export async function resetTeamUserPassword(input: ResetPasswordInput): Promise<ActionResult> {
  const actor = await requireRole(["admin"]);
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(parsed.data.id, {
    password: parsed.data.password,
  });
  if (error) return { ok: false, error: "Não foi possível redefinir a senha." };

  await admin.from("audit_log").insert({
    table_name: "auth.users",
    record_id: parsed.data.id,
    action: "PASSWORD_RESET",
    actor_id: actor.id,
  });

  return { ok: true, message: "Senha redefinida. Passe a nova senha pessoalmente ao usuário." };
}
