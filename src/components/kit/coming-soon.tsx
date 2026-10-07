import { Construction } from "lucide-react";
import { IconChip } from "./stat-card";

export function ComingSoon({ title, phase }: { title: string; phase?: number }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      <IconChip icon={Construction} tone="pink" className="size-14 rounded-2xl" />
      <div>
        <h2 className="font-heading text-lg font-semibold">{title} chega em breve</h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {phase
            ? `Este módulo faz parte da Fase ${phase} do projeto e será liberado assim que essa fase for entregue.`
            : "Este módulo ainda está em desenvolvimento."}
        </p>
      </div>
    </div>
  );
}
