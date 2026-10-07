import { ModulePlaceholder } from "@/components/kit/module-placeholder";

export const metadata = { title: "Cadastros" };

export default function Page() {
  return (
    <ModulePlaceholder
      href="/cadastros"
      description="Clientes, produtos, insumos, fichas técnicas e fornecedores."
    />
  );
}
