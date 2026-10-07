import { describe, expect, it } from "vitest";
import {
  emailToUsername,
  normalizeUsername,
  passwordSchema,
  usernameSchema,
  usernameToEmail,
} from "./username";

describe("normalizeUsername", () => {
  it("remove acentos, espaços e maiúsculas", () => {
    expect(normalizeUsername("  João.Produção ")).toBe("joao.producao");
  });
});

describe("usernameSchema", () => {
  it.each(["ruan.diretor", "maria.silva.atendimento", "ana2.expedicao"])("aceita %s", (value) => {
    expect(usernameSchema.safeParse(value).success).toBe(true);
  });

  it.each(["ruan", ".diretor", "ruan.", "ruan..diretor", "ruan diretor@x", "ru"])(
    "recusa %s",
    (value) => {
      expect(usernameSchema.safeParse(value).success).toBe(false);
    },
  );

  it("normaliza antes de validar", () => {
    expect(usernameSchema.parse("Joana.Designer")).toBe("joana.designer");
  });
});

describe("e-mail interno", () => {
  it("é reversível", () => {
    const email = usernameToEmail("Joana.Designer");
    expect(email).toBe("joana.designer@usuarios.smart.local");
    expect(emailToUsername(email)).toBe("joana.designer");
  });

  it("ignora e-mails de fora do domínio interno", () => {
    expect(emailToUsername("alguem@gmail.com")).toBeNull();
  });
});

describe("passwordSchema", () => {
  it("exige pelo menos 8 caracteres", () => {
    expect(passwordSchema.safeParse("1234567").success).toBe(false);
    expect(passwordSchema.safeParse("12345678").success).toBe(true);
  });
});
