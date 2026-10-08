import { describe, expect, it } from "vitest";
import { formatCurrency, formatDateTime, initials } from "./format";

describe("format", () => {
  it("formata reais", () => {
    expect(formatCurrency(1234.5).replace(/\s/g, " ")).toBe("R$ 1.234,50");
  });

  it("usa o fuso de São Paulo", () => {
    // 02:30 UTC = 23:30 do dia anterior em São Paulo
    expect(formatDateTime("2026-10-08T02:30:00Z")).toBe("07/10/2026, 23:30");
  });

  it("gera iniciais", () => {
    expect(initials("Ruan Araújo Silva")).toBe("RS");
    expect(initials("Ana")).toBe("A");
    expect(initials("   ")).toBe("?");
  });
});
