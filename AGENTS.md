<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Smart Produção — regras do projeto

- Especificação completa em `PROMPT.md`. Interface 100% em português do Brasil; datas em `America/Sao_Paulo` (`src/lib/format.ts`); moeda BRL.
- Repositório **público**: nunca versionar segredos, dados de clientes ou arquivos de arte.
- Paleta da marca: tokens em `src/app/globals.css` (primário `#8b1c80`, header `#391036`, rosa `#ed47a7`). Toda tela precisa funcionar nos temas claro e escuro e no celular (alvos de toque ≥ 44px; tabelas viram cards).
- **Multi-empresa (SaaS)**: toda tabela de negócio tem `organization_id` e políticas RLS com `private.is_member(organization_id)` / `private.has_org_role(organization_id, ...)`. Nunca confie na gráfica ativa (cookie) para autorizar.
- Autorização na aplicação: `requireOrg([...perfis])`, `requireUser` ou `requirePlatformAdmin` (`src/lib/auth/dal.ts`) em toda página e Server Action. O RLS é a barreira final; toda tabela nova precisa de RLS e políticas na mesma migration.
- A chave secreta (`createAdminClient`) só depois de autorizar, e só para o que o RLS não cobre (contas no Auth). Contas que participam de mais de uma gráfica não podem ser alteradas pelo admin de uma delas (`exclusiveMembers`).
- Com Cache Components, leitura de sessão/cookies fica dentro de `<Suspense>`; a moldura da página continua estática.
- Banco só muda por migration em `supabase/migrations/` (`npm run db:new <nome>`). Tabelas críticas recebem o trigger `private.audit_row_change()`.
- Commits em Conventional Commits, em português. Branches `feat/*`, `fix/*`, `chore/*` saem de `develop`.
- Antes de abrir PR: `npm run format && npm run lint && npm run typecheck && npm test && npm run build`.
