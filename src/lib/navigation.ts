import {
  Boxes,
  Building2,
  Contact,
  House,
  Palette,
  Settings,
  ShoppingBag,
  SquareKanban,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { hasRole, type AppRole } from "@/lib/auth/roles";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** "org": módulo da gráfica ativa; "platform": só para o SuperAdmin. */
  scope: "org" | "platform";
  /** Perfis (na gráfica ativa) que veem o item; o admin sempre vê tudo. Vazio = todos. */
  roles: readonly AppRole[];
  /** Fase do roadmap em que o módulo chega; enquanto isso aparece como "em breve". */
  phase?: number;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/inicio", label: "Início", icon: House, scope: "org", roles: [] },
  {
    href: "/pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
    scope: "org",
    roles: ["atendimento", "financeiro"],
    phase: 3,
  },
  {
    href: "/artes",
    label: "Artes",
    icon: Palette,
    scope: "org",
    roles: ["atendimento", "designer"],
    phase: 3,
  },
  {
    href: "/pcp",
    label: "Produção",
    icon: SquareKanban,
    scope: "org",
    roles: ["atendimento", "designer", "producao", "expedicao"],
    phase: 3,
  },
  {
    href: "/estoque",
    label: "Estoque",
    icon: Boxes,
    scope: "org",
    roles: ["atendimento", "producao"],
    phase: 2,
  },
  {
    href: "/expedicao",
    label: "Expedição",
    icon: Truck,
    scope: "org",
    roles: ["expedicao"],
    phase: 5,
  },
  {
    href: "/cadastros",
    label: "Cadastros",
    icon: Contact,
    scope: "org",
    roles: ["atendimento"],
    phase: 2,
  },
  {
    href: "/financeiro",
    label: "Financeiro",
    icon: Wallet,
    scope: "org",
    roles: ["financeiro"],
    phase: 4,
  },
  {
    href: "/configuracoes",
    label: "Configurações",
    icon: Settings,
    scope: "org",
    roles: ["admin"],
  },
  { href: "/plataforma", label: "Plataforma", icon: Building2, scope: "platform", roles: [] },
];

export type NavContext = {
  /** Perfil na gráfica ativa (null = nenhuma gráfica selecionada). */
  role: AppRole | null | undefined;
  isPlatformAdmin?: boolean;
};

export function navItemsFor({ role, isPlatformAdmin = false }: NavContext) {
  return NAV_ITEMS.filter((item) => {
    if (item.scope === "platform") return isPlatformAdmin;
    if (!role) return false;
    return item.roles.length === 0 || hasRole(role, item.roles);
  });
}

export function findNavItem(href: string) {
  return NAV_ITEMS.find((item) => item.href === href);
}

/** No celular cabem 4 atalhos na barra inferior; o resto vai para "Mais". */
export const BOTTOM_NAV_LIMIT = 4;

export function splitBottomNav(items: readonly NavItem[]) {
  if (items.length <= BOTTOM_NAV_LIMIT + 1) return { primary: [...items], overflow: [] };
  return {
    primary: items.slice(0, BOTTOM_NAV_LIMIT),
    overflow: items.slice(BOTTOM_NAV_LIMIT),
  };
}

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
