import { z } from "zod";
import { isValidCnpj, normalizeCnpj, slugSchema } from "@/lib/auth/organization";
import { emailSchema, passwordSchema, usernameSchema } from "@/lib/auth/username";

const optionalEmail = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v))
  .pipe(emailSchema.optional());

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome da gráfica.").max(120),
  slug: slugSchema,
  document: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : normalizeCnpj(v)))
    .refine((v) => v === undefined || isValidCnpj(v), "CNPJ inválido."),
  adminFullName: z.string().trim().min(2, "Informe o nome do administrador.").max(120),
  adminUsername: usernameSchema,
  adminEmail: optionalEmail,
  adminPassword: passwordSchema,
});

export type CreateOrganizationInput = z.input<typeof createOrganizationSchema>;
