/**
 * Cria (ou reativa) o primeiro administrador do sistema.
 *
 * Uso:  npm run admin:criar
 * Lê de .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY,
 * ADMIN_USERNAME (ex.: ruan.diretor), ADMIN_FULL_NAME e ADMIN_PASSWORD.
 * Depois de rodar, apague ADMIN_PASSWORD do .env.local.
 */
import { createClient } from "@supabase/supabase-js";
import { passwordSchema, usernameSchema, usernameToEmail } from "../src/lib/auth/username";

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    console.error(`✖ Defina ${name} no .env.local.`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const url = required("NEXT_PUBLIC_SUPABASE_URL");
  const secretKey = required("SUPABASE_SECRET_KEY");
  const username = usernameSchema.parse(required("ADMIN_USERNAME"));
  const fullName = required("ADMIN_FULL_NAME").trim();
  const password = passwordSchema.parse(required("ADMIN_PASSWORD"));
  const email = usernameToEmail(username);

  const supabase = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  let userId = existing?.id as string | undefined;

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error || !data.user) throw error ?? new Error("Falha ao criar o usuário no Auth.");
    userId = data.user.id;
  } else {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password,
      ban_duration: "none",
    });
    if (error) throw error;
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    username,
    full_name: fullName,
    role: "admin",
    active: true,
  });
  if (profileError) throw profileError;

  console.log(`✔ Administrador "${username}" pronto. Agora apague ADMIN_PASSWORD do .env.local.`);
}

main().catch((error) => {
  console.error("✖ Não foi possível criar o administrador:", error.message ?? error);
  process.exit(1);
});
