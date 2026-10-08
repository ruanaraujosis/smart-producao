import { ModulePlaceholder } from "@/components/kit/module-placeholder";

export const metadata = { title: "Financeiro" };

export default function Page() {
  return (
    <ModulePlaceholder
      href="/financeiro"
      description="Contas a receber e a pagar, fluxo de caixa e margens."
    />
  );
}
