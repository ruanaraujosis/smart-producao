/** SVG do símbolo usado para gerar favicon e ícones do PWA. */
export function brandIconSvg({ padded }: { padded: boolean }) {
  // Ícone "maskable": o Android recorta as bordas, então o símbolo fica menor dentro de um fundo cheio.
  const s = padded ? 0.72 : 1;
  const offset = (64 - 64 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#ff8fcf"/><stop offset="55%" stop-color="#ed47a7"/><stop offset="100%" stop-color="#c0168a"/>
  </linearGradient></defs>
  ${padded ? '<rect width="64" height="64" fill="#4a1347"/>' : '<circle cx="32" cy="32" r="32" fill="#4a1347"/>'}
  <g transform="translate(${offset} ${offset}) scale(${s})">
    <path d="M42 19H28a6.5 6.5 0 0 0 0 13h8a6.5 6.5 0 0 1 0 13H22" fill="none" stroke="url(#g)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

export function brandIconDataUri(padded: boolean) {
  return `data:image/svg+xml;base64,${Buffer.from(brandIconSvg({ padded })).toString("base64")}`;
}
