"use server";

import { loadTvSnapshot, type TvSnapshot } from "./data";

/** Atualização periódica do painel (a TV não tem login: o token autoriza). */
export async function refreshTv(token: string): Promise<TvSnapshot | null> {
  return loadTvSnapshot(token);
}
