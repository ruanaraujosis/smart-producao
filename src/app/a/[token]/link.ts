/** Formato do token do link (base64url, 32+ caracteres). Barra lixo antes de ir ao banco. */
export function isTokenFormat(token: string) {
  return /^[A-Za-z0-9_-]{32,64}$/.test(token);
}

/** IP de quem acessa (Vercel preenche x-forwarded-for / x-real-ip). */
export function clientIp(h: Headers) {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip")?.trim() || "";
  return /^[0-9a-fA-F:.]{3,45}$/.test(ip) ? ip : "desconhecido";
}
