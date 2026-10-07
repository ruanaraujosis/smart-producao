import { z } from "zod";
import { APP_ROLES } from "@/lib/auth/roles";
import { passwordSchema, usernameSchema } from "@/lib/auth/username";

const fullName = z.string().trim().min(2, "Informe o nome completo.").max(120, "Nome muito longo.");
const role = z.enum(APP_ROLES, { error: "Escolha o perfil de acesso." });

export const createUserSchema = z
  .object({
    username: usernameSchema,
    fullName,
    role,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem.",
  });

export const updateUserSchema = z.object({
  id: z.uuid(),
  fullName,
  role,
  active: z.boolean(),
});

export const resetPasswordSchema = z
  .object({
    id: z.uuid(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem.",
  });

export type CreateUserInput = z.input<typeof createUserSchema>;
export type UpdateUserInput = z.input<typeof updateUserSchema>;
export type ResetPasswordInput = z.input<typeof resetPasswordSchema>;
