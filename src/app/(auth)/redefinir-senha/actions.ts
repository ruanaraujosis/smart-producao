"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth/dal";
import { passwordSchema } from "@/lib/auth/username";
import { createClient } from "@/lib/supabase/server";

const schema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem.",
  });

export async function setNewPassword(input: z.input<typeof schema>): Promise<{ error: string }> {
  const session = await getSession();
  if (!session) redirect("/login?erro=link-invalido");

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    // Conta com MFA: o Supabase exige o segundo fator antes de trocar a senha.
    if (error.code === "insufficient_aal") redirect("/mfa?next=/redefinir-senha");
    if (error.code === "same_password") return { error: "Use uma senha diferente da anterior." };
    return { error: "Não foi possível salvar. Tente uma senha mais forte." };
  }

  redirect("/inicio");
}
