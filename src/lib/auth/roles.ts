/**
 * Perfis de acesso (RBAC). Espelha o enum `public.app_role` do banco.
 * A permissão real é garantida pelo RLS no Supabase — estas regras só
 * decidem o que aparece na interface.
 */
export const APP_ROLES = [
  "admin",
  "atendimento",
  "designer",
  "producao",
  "expedicao",
  "financeiro",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Diretor / Admin",
  atendimento: "Atendimento / Comercial",
  designer: "Designer",
  producao: "Produção",
  expedicao: "Expedição",
  financeiro: "Financeiro",
};

export const ROLE_DESCRIPTIONS: Record<AppRole, string> = {
  admin: "Acesso total, financeiro, configurações e integrações.",
  atendimento: "Pedidos, clientes, orçamentos e artes.",
  designer: "Fila de artes, upload de provas e histórico de versões.",
  producao: "Painel PCP e apontamento de etapas.",
  expedicao: "Separação, etiquetas, despacho e rastreio.",
  financeiro: "Contas a receber/pagar, NF-e e relatórios.",
};

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && (APP_ROLES as readonly string[]).includes(value);
}

export function hasRole(role: AppRole | null | undefined, allowed: readonly AppRole[]) {
  if (!role) return false;
  return role === "admin" || allowed.includes(role);
}
