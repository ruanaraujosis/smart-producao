import { useId } from "react";
import { cn } from "cn";

/**
 * Símbolo da Smart Gráfica: círculo roxo escuro com o "S" rosa.
 * Versão vetorial simplificada — substituir pelo arquivo oficial quando disponível.
 */
export function LogoMark({
  className,
  title = "Smart Gráfica",
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
          <stop offset="0%" stopColor="#ff8fcf" />
          <stop offset="55%" stopColor="#ed47a7" />
          <stop offset="100%" stopColor="#c0168a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="#4a1347" />
      <path
        d="M42 19H28a6.5 6.5 0 0 0 0 13h8a6.5 6.5 0 0 1 0 13H22"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight">Smart</span>
          <span className="text-[0.65rem] font-medium tracking-wide text-brand-pink">
            Gráfica e Comunicação
          </span>
        </span>
      )}
    </span>
  );
}
