import { describe, expect, it } from "vitest";
import { APP_ROLES, hasRole } from "./auth/roles";
import {
  BOTTOM_NAV_LIMIT,
  isActivePath,
  navItemsFor,
  NAV_ITEMS,
  splitBottomNav,
} from "./navigation";

const hrefs = (role: (typeof APP_ROLES)[number], isPlatformAdmin = false) =>
  navItemsFor({ role, isPlatformAdmin }).map((item) => item.href);

describe("hasRole", () => {
  it("admin passa em qualquer regra", () => {
    expect(hasRole("admin", ["financeiro"])).toBe(true);
  });
  it("sem perfil não passa", () => {
    expect(hasRole(null, ["financeiro"])).toBe(false);
  });
});

describe("navItemsFor", () => {
  it("admin vê todos os módulos", () => {
    expect(hrefs("admin")).toEqual(
      NAV_ITEMS.filter((item) => item.scope === "org").map((item) => item.href),
    );
  });

  it("todos os perfis veem o Início", () => {
    for (const role of APP_ROLES) expect(hrefs(role)).toContain("/inicio");
  });

  it("só o admin vê Configurações", () => {
    for (const role of APP_ROLES.filter((r) => r !== "admin")) {
      expect(hrefs(role)).not.toContain("/configuracoes");
    }
  });

  it("financeiro não vê a fila de artes", () => {
    expect(hrefs("financeiro")).toContain("/financeiro");
    expect(hrefs("financeiro")).not.toContain("/artes");
  });

  it("designer vê artes e produção", () => {
    expect(hrefs("designer")).toEqual(expect.arrayContaining(["/artes", "/pcp"]));
  });

  it("sem gráfica ativa não vê módulos", () => {
    expect(navItemsFor({ role: null })).toEqual([]);
  });

  it("Plataforma só aparece para o SuperAdmin", () => {
    expect(hrefs("admin")).not.toContain("/plataforma");
    expect(hrefs("producao", true)).toContain("/plataforma");
    expect(navItemsFor({ role: null, isPlatformAdmin: true }).map((i) => i.href)).toEqual([
      "/plataforma",
    ]);
  });
});

describe("splitBottomNav", () => {
  it("não cria 'Mais' quando todos os itens cabem", () => {
    const items = NAV_ITEMS.slice(0, BOTTOM_NAV_LIMIT + 1);
    expect(splitBottomNav(items).overflow).toEqual([]);
  });

  it("move o excedente para 'Mais'", () => {
    const { primary, overflow } = splitBottomNav(NAV_ITEMS);
    expect(primary).toHaveLength(BOTTOM_NAV_LIMIT);
    expect(primary.length + overflow.length).toBe(NAV_ITEMS.length);
  });
});

describe("isActivePath", () => {
  it("marca subpáginas", () => {
    expect(isActivePath("/configuracoes/usuarios", "/configuracoes")).toBe(true);
  });
  it("não confunde prefixos", () => {
    expect(isActivePath("/pedidos-antigos", "/pedidos")).toBe(false);
  });
});
