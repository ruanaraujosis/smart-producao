import { ModulePlaceholder } from "@/components/kit/module-placeholder";

export const metadata = { title: "Pedidos" };

export default function Page() {
  return (
    <ModulePlaceholder
      href="/pedidos"
      description="Pedidos de todos os canais em uma única lista, com prazos de postagem."
    />
  );
}
