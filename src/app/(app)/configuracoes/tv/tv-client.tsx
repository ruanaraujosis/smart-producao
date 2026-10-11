"use client";

import { Copy, ExternalLink, Pencil, Plus, Power, Timer } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { ConfirmButton } from "@/components/kit/confirm-button";
import { EntityFormDialog } from "@/components/kit/entity-form";
import { Button } from "@/components/ui/button";
import { revokeTvDevice, saveTvDevice, saveTvRotation } from "./actions";
import { tvDeviceSchema, tvRotationSchema } from "./schema";

const subscribeNothing = () => () => {};

/** Endereço do link da TV a partir do navegador (vale em qualquer domínio). */
function useTvUrl(token: string) {
  const origin = useSyncExternalStore(
    subscribeNothing,
    () => window.location.origin,
    () => "",
  );
  return origin ? `${origin}/tv/${token}` : "";
}

const deviceFields = [
  { name: "name", label: "Nome da TV", placeholder: "Ex.: TV da produção" },
  {
    name: "show_financials",
    label: "Mostrar valores em R$",
    type: "switch" as const,
    hint: "Faturamento, meta e vendas em R$. Contagens aparecem sempre.",
  },
];

export function NewTvButton() {
  return (
    <EntityFormDialog
      title="Nova TV"
      description="Gera um link só de leitura para abrir no navegador da TV, sem login."
      trigger={
        <Button>
          <Plus />
          Nova TV
        </Button>
      }
      schema={tvDeviceSchema}
      defaultValues={{ name: "", show_financials: false }}
      fields={deviceFields}
      action={(values) => saveTvDevice(values)}
      submitLabel="Criar"
    />
  );
}

export function TvDeviceActions({
  device,
}: {
  device: { id: string; name: string; token: string; show_financials: boolean; revoked: boolean };
}) {
  const url = useTvUrl(device.token);
  const [editing, setEditing] = useState(false);
  if (device.revoked) return null;
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="min-h-11 md:min-h-8"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          toast.success("Link copiado. Abra no navegador da TV.");
        }}
      >
        <Copy />
        Copiar link
      </Button>
      <Button variant="outline" size="sm" asChild className="min-h-11 md:min-h-8">
        <a href={url} target="_blank" rel="noreferrer">
          <ExternalLink />
          Abrir
        </a>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="min-h-11 md:min-h-8"
        onClick={() => setEditing(true)}
      >
        <Pencil />
        Editar
      </Button>
      <ConfirmButton
        trigger={
          <Button variant="ghost" size="sm" className="min-h-11 text-destructive md:min-h-8">
            <Power />
            Desligar
          </Button>
        }
        title={`Desligar ${device.name}?`}
        description="O link para de funcionar na hora. Para voltar, crie uma TV nova."
        confirmLabel="Desligar"
        action={() => revokeTvDevice(device.id)}
      />
      <EntityFormDialog
        open={editing}
        onOpenChange={setEditing}
        title={`Editar ${device.name}`}
        schema={tvDeviceSchema}
        defaultValues={{ name: device.name, show_financials: device.show_financials }}
        fields={deviceFields}
        action={(values) => saveTvDevice(values, device.id)}
      />
    </div>
  );
}

export function RotationDialog({ seconds }: { seconds: number }) {
  return (
    <EntityFormDialog
      title="Tempo de cada tela"
      description="A TV gira entre as telas sozinha. Escolha quantos segundos cada uma fica visível."
      trigger={
        <Button variant="outline">
          <Timer />
          {seconds} s por tela
        </Button>
      }
      schema={tvRotationSchema}
      defaultValues={{ tv_rotation_seconds: String(seconds) }}
      fields={[{ name: "tv_rotation_seconds", label: "Segundos (5 a 120)", type: "number" }]}
      action={(values) => saveTvRotation(values)}
    />
  );
}
