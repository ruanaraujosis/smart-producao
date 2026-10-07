import {
  Boxes,
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
  /** Perfis que veem o item (o admin sempre vê tudo). Vazio = todos. */
  roles: readonly AppRole[];
  /** Fase do roadmap em que o módulo chega; enquanto isso aparece como "em breve". */
  phase?: number;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/inicio", label: "Início", icon: House, roles: [] },
  {
    href: "/pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
    roles: ["atendimento", "financeiro"],
    phase: 3,
  },
  {
    href: "/artes",
    label: "Artes",
    icon: Palette,
    roles: ["atendimento", "designer"],
    phase: 3,
  },
  {
    href: "/pcp",
    label: "Produção",
    icon: SquareKanban,
    roles: ["atendimento", "designer", "producao", "expedicao"],
    phase: 3,
  },
  {
    href: "/estoque",
    label: "Estoque",
    icon: Boxes,
    roles: ["atendimento", "producao"],
    phase: 2,
  },
  { href: "/expedicao", label: "Expedição", icon: Truck, roles: ["expedicao"], phase: 5 },
  { href: "/cadastros", label: "Cadastros", icon: Contact, roles: ["atendimento"], phase: 2 },
  { href: "/financeiro", label: "Financeiro", icon: Wallet, roles: ["financeiro"], phase: 4 },
  { href: "/configuracoes", label: "Configurações", icon: Settings, roles: ["admin"] },
];

export function navItemsFor(role: AppRole | null | undefined) {
  if (!role) return [];
  return NAV_ITEMS.filter((item) => item.roles.length === 0 || hasRole(role, item.roles));
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
