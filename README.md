# Smart Produção

Sistema de gestão da Smart Gráfica: pedidos, aprovação de artes, produção (PCP), estoque, financeiro, NF-e, dashboard para TV e integração com marketplaces (Shopee, Magalu, TikTok Shop).

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 + shadcn/ui · Supabase · Vercel

A especificação completa está em [PROMPT.md](PROMPT.md).

## Rodando localmente

Requisitos: Node 22+ e um projeto no [Supabase](https://supabase.com) (o plano grátis serve para desenvolvimento).

1. **Instale as dependências**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente.** Copie `.env.example` para `.env.local` e preencha com os dados do seu projeto Supabase (_Project Settings → API Keys_):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`)
   - `SUPABASE_SECRET_KEY` (`sb_secret_...`): **somente no servidor**

3. **Crie as tabelas** aplicando as migrations no projeto:

   ```bash
   npx supabase login
   npx supabase link --project-ref <ref-do-projeto>
   npm run db:push
   ```

4. **Desative o cadastro público** no painel do Supabase (_Authentication → Sign In / Providers → Allow new users to sign up_: desligado). Os usuários são criados só pelo administrador.

5. **Crie o primeiro administrador.** Preencha `ADMIN_USERNAME` (ex.: `ruan.diretor`), `ADMIN_FULL_NAME` e `ADMIN_PASSWORD` no `.env.local` e rode:

   ```bash
   npm run admin:criar
   ```

   Depois **apague `ADMIN_PASSWORD`** do `.env.local`.

6. **Suba o servidor** e acesse <http://localhost:3000>:

   ```bash
   npm run dev
   ```

### Scripts

| Script                                  | O que faz                                                       |
| --------------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                           | Servidor de desenvolvimento                                     |
| `npm run build` / `start`               | Build e servidor de produção                                    |
| `npm run lint` / `typecheck` / `format` | ESLint, TypeScript e Prettier                                   |
| `npm test`                              | Testes unitários (Vitest)                                       |
| `npm run test:e2e`                      | Testes de ponta a ponta (Playwright)                            |
| `npm run db:new <nome>`                 | Cria uma migration nova em `supabase/migrations/`               |
| `npm run db:push`                       | Aplica as migrations no projeto Supabase vinculado              |
| `npm run db:types`                      | Regenera `src/lib/supabase/database.types.ts` a partir do banco |
| `npm run admin:criar`                   | Cria/reativa o administrador definido no `.env.local`           |

## Arquitetura

```
src/
  app/
    (app)/            áreas logadas (layout com header, sidebar e navegação inferior)
    login/            tela de login (usuário nome.cargo + senha)
    manifest.ts       PWA instalável
  components/
    ui/               componentes base (shadcn/ui)
    kit/              componentes do sistema (KPI, badge de canal, cabeçalho...)
    shell/            moldura: navegação, menu do usuário, seletor de tema
  lib/
    auth/             perfis (RBAC), camada de acesso a dados (DAL), login
    supabase/         clientes do servidor, navegador, proxy e admin
    navigation.ts     menu por perfil
  proxy.ts            renova a sessão e redireciona quem não está logado
supabase/migrations/  schema versionado (nunca alterar o banco manualmente)
```

**Segurança em camadas:** o `proxy.ts` faz só a checagem otimista de login. Quem decide o acesso é a DAL (`src/lib/auth/dal.ts`), chamada em cada página e Server Action, e, no fim, o **RLS** do Postgres. A chave secreta do Supabase só é usada no servidor e só para o que o RLS não cobre (criar usuários no Auth).

**Login `nome.cargo`:** o Supabase Auth exige e-mail, então `joao.producao` vira internamente `joao.producao@usuarios.smart.local`. Esse e-mail não é exibido nem recebe mensagens.

**Auditoria:** a tabela `audit_log` registra quem alterou o quê e quando. Para auditar uma tabela nova:

```sql
create trigger minha_tabela_audit
  after insert or update or delete on public.minha_tabela
  for each row execute function private.audit_row_change();
```

**Tema:** claro, escuro ou automático (segue o aparelho), escolhido em _Meu perfil_ ou no menu do usuário. Os tokens de cor da marca ficam em `src/app/globals.css`.

## Fluxo de trabalho

- `main` → produção (protegida, só via Pull Request com CI verde)
- `develop` → homologação
- `feat/*`, `fix/*`, `chore/*` → saem de `develop` e voltam por Pull Request
- Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português

O CI (`.github/workflows/ci.yml`) roda formatação, lint, tipos, testes unitários, build e valida as migrations num Postgres limpo. O E2E roda a cada merge em `develop`. As migrations são aplicadas automaticamente pelo workflow `migrations.yml` (`develop` → homologação, `main` → produção), usando os secrets dos ambientes `homologacao` e `producao` no GitHub.

### Configuração da Vercel

1. Importe o repositório na Vercel (_Add New → Project_).
2. Em _Environment Variables_, cadastre `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` e `SUPABASE_SECRET_KEY`, com valores diferentes para _Production_ (`main`) e _Preview_ (`develop` e PRs).
3. No Supabase, em _Authentication → URL Configuration_, adicione a URL da Vercel em _Site URL_ e _Redirect URLs_.

## Variáveis de ambiente

Veja [.env.example](.env.example). Segredos nunca entram no repositório: este repositório é **público**.

## Cadastrando uma nova loja/marketplace

Chega na Fase 5 (Shopee), com a camada `MarketplaceAdapter`. Esta seção será preenchida nessa fase.
