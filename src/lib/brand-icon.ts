/** SVG do símbolo da graphicX usado para gerar favicon e ícones do PWA. */
export function brandIconSvg({ padded }: { padded: boolean }) {
  // Ícone "maskable": o Android recorta as bordas, então o X fica menor dentro de um fundo cheio.
  const s = padded ? 0.72 : 1;
  const offset = (64 - 64 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#0e7c86"/><stop offset="100%" stop-color="#42a5f5"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="${padded ? 0 : 16}" fill="url(#g)"/>
  <g transform="translate(${offset} ${offset}) scale(${s})">
    <path d="M20 20 44 44" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M44 20 20 44" stroke="#f47b13" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>`;
}

export function brandIconDataUri(padded: boolean) {
  return `data:image/svg+xml;base64,${Buffer.from(brandIconSvg({ padded })).toString("base64")}`;
}
