import { MARK } from "@/components/brand/mark";

/** SVG do símbolo da graphicX usado para gerar favicon e ícones do PWA (fundo branco). */
export function brandIconSvg({ padded }: { padded: boolean }) {
  // Ícone "maskable": o Android recorta as bordas, então o X fica menor dentro de um fundo cheio.
  const s = padded ? 0.66 : 0.86;
  const offset = (64 - 64 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${padded ? 0 : 14}" fill="${MARK.background}"/>
  <g transform="translate(${offset} ${offset}) scale(${s})">
    <path d="${MARK.orangeTip}" fill="${MARK.orange}"/>
    <path d="${MARK.blueLeg}" fill="${MARK.blue}"/>
    <path d="${MARK.mainStroke}" fill="${MARK.ink}"/>
  </g>
</svg>`;
}

export function brandIconDataUri(padded: boolean) {
  return `data:image/svg+xml;base64,${Buffer.from(brandIconSvg({ padded })).toString("base64")}`;
}
