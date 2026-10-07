import { Suspense } from "react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { LoginForm } from "./login-form";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Painel da marca (desktop) */}
      <div className="relative hidden overflow-hidden bg-linear-to-br from-brand-header via-brand-deep to-[#6b1a63] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo className="text-white" />
        <div className="relative z-10 max-w-md">
          <p className="font-heading text-4xl leading-tight font-bold">
            Comunicação visual que <span className="text-brand-pink">VENDE!</span>
          </p>
          <p className="mt-4 text-white/75">
            Pedidos, artes, produção, estoque e expedição da Smart Gráfica em um só lugar.
          </p>
        </div>
        <p className="text-sm text-white/60">Smart Produção 2.0</p>
        <LogoMark
          title=""
          className="pointer-events-none absolute -right-24 -bottom-24 size-[28rem] opacity-15"
        />
      </div>

      {/* Formulário */}
      <main className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <LogoMark className="size-14 lg:hidden" />
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight">Entrar no sistema</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Use seu usuário e senha da Smart.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <Suspense fallback={<div className="h-64" aria-hidden />}>
              <LoginForm />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Esqueceu a senha? Peça ao administrador para redefinir.
          </p>
        </div>
      </main>
    </div>
  );
}
