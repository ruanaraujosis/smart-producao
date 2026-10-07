"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { usernameSchema, usernameToEmail } from "@/lib/auth/username";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "./safe-next";

const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, "Informe a senha."),
  next: z.string().optional(),
});

export type LoginState = { error?: string };

const INVALID = "Usuário ou senha incorretos.";

export async function login(input: z.input<typeof loginSchema>): Promise<LoginState> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { error: INVALID };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: usernameToEmail(parsed.data.username),
    password: parsed.data.password,
  });

  if (error || !data.user) {
    if (error?.status === 429) {
      return { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." };
    }
    return { error: INVALID };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("active")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile?.active) {
    await supabase.auth.signOut();
    return { error: "Usuário desativado. Fale com o administrador." };
  }

  redirect(safeNextPath(parsed.data.next));
}
