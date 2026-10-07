"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, Pencil, UserPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm, useWatch, type FieldError as RHFFieldError } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { APP_ROLES, ROLE_DESCRIPTIONS, ROLE_LABELS, type AppRole } from "@/lib/auth/roles";
import {
  createTeamUser,
  resetTeamUserPassword,
  updateTeamUser,
  type ActionResult,
} from "./actions";
import { createUserSchema, resetPasswordSchema, updateUserSchema } from "./schemas";

export type TeamUser = {
  id: string;
  username: string;
  fullName: string;
  role: AppRole;
  active: boolean;
};

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: RHFFieldError;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-erro`} className="text-sm text-destructive">
          {error.message}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function invalidProps(id: string, error?: RHFFieldError) {
  return { "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-erro` : undefined };
}

function useSubmit(onDone: () => void) {
  const [pending, startTransition] = useTransition();
  const run = (action: () => Promise<ActionResult>) =>
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        toast.success(result.message);
        onDone();
      } else {
        toast.error(result.error);
      }
    });
  return { pending, run };
}

function RoleSelect({
  id,
  value,
  onChange,
  disabled,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: RHFFieldError;
}) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={id} className="w-full" {...invalidProps(id, error)}>
        <SelectValue placeholder="Escolha o perfil" />
      </SelectTrigger>
      <SelectContent>
        {APP_ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {ROLE_LABELS[role]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      fullName: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = form.formState;
  const { pending, run } = useSubmit(() => {
    setOpen(false);
    form.reset();
  });
  const role = useWatch({ control: form.control, name: "role" });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Novo usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo usuário</DialogTitle>
          <DialogDescription>
            A pessoa entra com o usuário e a senha definidos aqui.
          </DialogDescription>
        </DialogHeader>
        <form
          id="create-user"
          noValidate
          onSubmit={form.handleSubmit((values) => run(() => createTeamUser(values)))}
          className="flex flex-col gap-4"
        >
          <Field id="new-fullName" label="Nome completo" error={errors.fullName}>
            <Input
              id="new-fullName"
              autoComplete="off"
              {...invalidProps("new-fullName", errors.fullName)}
              {...form.register("fullName")}
            />
          </Field>
          <Field
            id="new-username"
            label="Usuário"
            error={errors.username}
            hint="Formato nome.cargo, ex.: maria.atendimento"
          >
            <Input
              id="new-username"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="nome.cargo"
              {...invalidProps("new-username", errors.username)}
              {...form.register("username")}
            />
          </Field>
          <Field
            id="new-role"
            label="Perfil de acesso"
            error={errors.role}
            hint={role ? ROLE_DESCRIPTIONS[role] : undefined}
          >
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <RoleSelect
                  id="new-role"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.role}
                />
              )}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="new-password" label="Senha inicial" error={errors.password}>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                {...invalidProps("new-password", errors.password)}
                {...form.register("password")}
              />
            </Field>
            <Field id="new-confirm" label="Repita a senha" error={errors.confirmPassword}>
              <Input
                id="new-confirm"
                type="password"
                autoComplete="new-password"
                {...invalidProps("new-confirm", errors.confirmPassword)}
                {...form.register("confirmPassword")}
              />
            </Field>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="create-user" disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            Criar usuário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditUserDialog({ user, isSelf }: { user: TeamUser; isSelf: boolean }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { id: user.id, fullName: user.fullName, role: user.role, active: user.active },
  });
  const { errors } = form.formState;
  const { pending, run } = useSubmit(() => setOpen(false));
  const prefix = `edit-${user.id}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next)
          form.reset({
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            active: user.active,
          });
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label={`Editar ${user.fullName}`}>
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription className="font-mono">{user.username}</DialogDescription>
        </DialogHeader>
        <form
          id={prefix}
          noValidate
          onSubmit={form.handleSubmit((values) => run(() => updateTeamUser(values)))}
          className="flex flex-col gap-4"
        >
          <Field id={`${prefix}-name`} label="Nome completo" error={errors.fullName}>
            <Input
              id={`${prefix}-name`}
              {...invalidProps(`${prefix}-name`, errors.fullName)}
              {...form.register("fullName")}
            />
          </Field>
          <Field
            id={`${prefix}-role`}
            label="Perfil de acesso"
            error={errors.role}
            hint={isSelf ? "Você não pode alterar o próprio perfil." : undefined}
          >
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <RoleSelect
                  id={`${prefix}-role`}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSelf}
                  error={errors.role}
                />
              )}
            />
          </Field>
          <Controller
            control={form.control}
            name="active"
            render={({ field }) => (
              <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 p-3">
                <div>
                  <Label htmlFor={`${prefix}-active`}>Acesso liberado</Label>
                  <p className="text-xs text-muted-foreground">
                    {isSelf
                      ? "Você não pode se desativar."
                      : "Desativado, o usuário não consegue entrar."}
                  </p>
                </div>
                <Switch
                  id={`${prefix}-active`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSelf}
                />
              </div>
            )}
          />
        </form>
        <DialogFooter>
          <Button type="submit" form={prefix} disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ResetPasswordDialog({ user }: { user: TeamUser }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { id: user.id, password: "", confirmPassword: "" },
  });
  const { errors } = form.formState;
  const { pending, run } = useSubmit(() => {
    setOpen(false);
    form.reset();
  });
  const prefix = `reset-${user.id}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={`Redefinir senha de ${user.fullName}`}>
          <KeyRound />
          Senha
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redefinir senha</DialogTitle>
          <DialogDescription>
            Nova senha para <strong>{user.fullName}</strong>. Depois, peça para a pessoa trocar em
            “Meu perfil”.
          </DialogDescription>
        </DialogHeader>
        <form
          id={prefix}
          noValidate
          onSubmit={form.handleSubmit((values) => run(() => resetTeamUserPassword(values)))}
          className="flex flex-col gap-4"
        >
          <Field id={`${prefix}-pw`} label="Nova senha" error={errors.password}>
            <Input
              id={`${prefix}-pw`}
              type="password"
              autoComplete="new-password"
              {...invalidProps(`${prefix}-pw`, errors.password)}
              {...form.register("password")}
            />
          </Field>
          <Field id={`${prefix}-confirm`} label="Repita a senha" error={errors.confirmPassword}>
            <Input
              id={`${prefix}-confirm`}
              type="password"
              autoComplete="new-password"
              {...invalidProps(`${prefix}-confirm`, errors.confirmPassword)}
              {...form.register("confirmPassword")}
            />
          </Field>
        </form>
        <DialogFooter>
          <Button type="submit" form={prefix} disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            Redefinir senha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
