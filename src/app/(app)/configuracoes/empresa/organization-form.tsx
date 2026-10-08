"use client";

import { Pencil } from "lucide-react";
import { EntityFormDialog } from "@/components/kit/entity-form";
import { Button } from "@/components/ui/button";
import { organizationDataSchema } from "@/app/(app)/plataforma/schemas";
import { saveOrganizationData } from "./actions";

export function OrganizationDataDialog({
  organization,
}: {
  organization: { name: string; legal_name: string | null; document: string | null };
}) {
  return (
    <EntityFormDialog
      title="Dados da gráfica"
      description="O nome aparece para a equipe e para os clientes nos links de arte."
      trigger={
        <Button>
          <Pencil />
          Editar dados
        </Button>
      }
      schema={organizationDataSchema}
      defaultValues={{
        name: organization.name,
        legal_name: organization.legal_name ?? "",
        document: organization.document ?? "",
      }}
      fields={[
        { name: "name", label: "Nome da gráfica" },
        { name: "legal_name", label: "Razão social" },
        { name: "document", label: "CNPJ", inputMode: "numeric" },
      ]}
      action={saveOrganizationData}
    />
  );
}
