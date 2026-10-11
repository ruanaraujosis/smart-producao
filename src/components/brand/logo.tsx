import { cn } from "cn";
import { MARK } from "./mark";

/**
 * Símbolo da graphicX. A perna principal usa a cor do texto (currentColor):
 * preta nas telas claras e branca no header e no tema escuro.
 * A geometria fica em ./mark (a mesma dos ícones).
 */
export function LogoMark({
  className,
  title = "graphicX",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("size-9 shrink-0", className)}
    >
      <path d={MARK.orangeTip} fill={MARK.orange} />
      <path d={MARK.blueLeg} fill={MARK.blue} />
      <path d={MARK.mainStroke} fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
  inverse = false,
}: {
  className?: string;
  compact?: boolean;
  /** Sobre fundo escuro fixo (ex.: painel do login). */
  inverse?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-xl font-bold tracking-tight">
            graphic<span className={inverse ? "text-[#f47b13]" : "text-brand-orange"}>X</span>
          </span>
          <span
            className={cn(
              "text-[0.65rem] font-medium tracking-wide",
              inverse ? "text-white/80" : "text-brand-teal",
            )}
          >
            Gestão para gráficas
          </span>
        </span>
      )}
    </span>
  );
}
