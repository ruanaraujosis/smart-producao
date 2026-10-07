import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Logo } from "@/components/brand/logo";
import { BottomNav } from "@/components/shell/bottom-nav";
import { SidebarNav, SidebarNavSkeleton } from "@/components/shell/sidebar-nav";
import { UserMenu } from "@/components/shell/user-menu";
import { getCurrentUser } from "@/lib/auth/dal";

/**
 * Layout das áreas logadas. A moldura (header, sidebar) é estática e entra no
 * shell pré-renderizado; o que depende do usuário carrega dentro de <Suspense>.
 */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 bg-brand-header text-brand-header-foreground shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6">
          <Link
            href="/inicio"
            className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-brand-pink/60"
          >
            <Logo />
          </Link>
          <Suspense fallback={<div className="size-9 rounded-full bg-white/10" aria-hidden />}>
            <HeaderUser />
          </Suspense>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-screen-2xl flex-1">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 overflow-y-auto border-r bg-sidebar p-4 md:block">
          <Suspense fallback={<SidebarNavSkeleton />}>
            <Sidebar />
          </Suspense>
        </aside>
        <main id="conteudo" className="min-w-0 flex-1 px-4 pt-6 pb-28 md:px-8 md:pb-10">
          {children}
        </main>
      </div>

      <Suspense fallback={null}>
        <MobileNav />
      </Suspense>
    </div>
  );
}

async function loadUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

async function HeaderUser() {
  const user = await loadUser();
  return <UserMenu fullName={user.fullName} username={user.username} role={user.role} />;
}

async function Sidebar() {
  const user = await loadUser();
  return <SidebarNav role={user.role} />;
}

async function MobileNav() {
  const user = await loadUser();
  return <BottomNav role={user.role} />;
}
