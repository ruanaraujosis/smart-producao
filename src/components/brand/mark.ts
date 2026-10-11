/**
 * Geometria do símbolo da graphicX (grade 64 × 64), usada pelo componente da
 * logo e pelos ícones (favicon/PWA), para os dois saírem sempre iguais.
 * Um "X" com a perna principal ("/") na cor do texto (preta no claro, branca no
 * escuro), a perna de baixo em azul e a ponta de cima destacada em laranja.
 */
export const MARK = {
  /** Fundo dos ícones do app e do navegador. */
  background: "#ffffff",
  /** Perna principal nos ícones (sobre o fundo branco). */
  ink: "#111111",
  blue: "#1d5fd1",
  orange: "#f47b13",
  /** Ponta laranja de cima, à esquerda. */
  orangeTip: "M10 7 H23 L30 18 L23.5 28 Z",
  /** Perna azul de baixo; o topo fica escondido sob a perna principal. */
  blueLeg: "M25 30 L37 30 L53 57 H39 Z",
  /** Perna principal, na diagonal "/". */
  mainStroke: "M38 7 H52 L23 57 H9 Z",
} as const;
