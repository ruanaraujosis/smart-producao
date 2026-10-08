import { ModulePlaceholder } from "@/components/kit/module-placeholder";

export const metadata = { title: "Estoque" };

export default function Page() {
  return (
    <ModulePlaceholder
      href="/estoque"
      description="Produtos acabados, insumos e disponibilidade calculada pela ficha técnica."
    />
  );
}
