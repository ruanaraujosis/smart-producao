import type { Metadata } from "next";
import { MonitorX } from "lucide-react";
import { Suspense } from "react";
import { loadTvSnapshot } from "./data";
import { TvBoard } from "./tv-board";

export const metadata: Metadata = {
  title: "Painel da produção",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function TvPage({ params }: PageProps<"/tv/[token]">) {
  return (
    // O painel é sempre escuro, independente do tema do aparelho.
    <div className="dark min-h-dvh bg-background text-foreground">
      <Suspense fallback={<div className="min-h-dvh bg-black" />}>
        <Painel params={params} />
      </Suspense>
    </div>
  );
}

async function Painel({ params }: { params: PageProps<"/tv/[token]">["params"] }) {
  const { token } = await params;
  const snapshot = await loadTvSnapshot(token);
  if (!snapshot) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
        <MonitorX className="size-16 text-muted-foreground" aria-hidden />
        <h1 className="text-3xl font-bold">TV desligada ou link inválido</h1>
        <p className="text-xl text-muted-foreground">
          Peça um link novo em Configurações → Dispositivos de TV.
        </p>
      </main>
    );
  }
  return <TvBoard token={token} initial={snapshot} />;
}
