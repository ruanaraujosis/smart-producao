import { useId } from "react";
import { cn } from "cn";

/**
 * Símbolo da graphicX: quadrado arredondado em degradê verde-azulado → azul-céu
 * com um "X" formado por um traço branco e um laranja.
 * Versão vetorial provisória — substituir pelo arquivo oficial da marca quando existir.
 */
export function LogoMark({
  className,
  title = "graphicX",
}: {
  className?: string;
  title?: string;
}) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("size-9 shrink-0", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e7c86" />
          <stop offset="100%" stopColor="#42a5f5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />
      <path d="M20 20 44 44" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      <path d="M44 20 20 44" stroke="#f47b13" strokeWidth="8" strokeLinecap="round" />
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
