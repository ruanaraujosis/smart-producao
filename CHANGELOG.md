# Changelog

Todas as mudanças relevantes deste projeto. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [versionamento semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Fase 1 — Fundação

#### Adicionado

- Projeto Next.js 16 (App Router, Cache Components) com TypeScript estrito, Tailwind CSS 4 e shadcn/ui.
- Design system com a paleta da Smart Gráfica, fonte Poppins e tema **claro, escuro e automático**.
- Login com usuário `nome.cargo` e senha (Supabase Auth), com sessão renovada no `proxy.ts`.
- Perfis de acesso (admin, atendimento, designer, produção, expedição, financeiro) com RLS no Postgres.
- Tabela de auditoria com trigger genérico (quem alterou o quê e quando).
- Layout responsivo: sidebar no desktop, navegação inferior no celular e menu filtrado por perfil.
- Gestão de usuários (admin): criar, editar perfil, desativar/reativar e redefinir senha.
- Página _Meu perfil_: nome, troca de senha e tema.
- PWA instalável (manifest e ícones gerados).
- Script `npm run admin:criar` para o primeiro administrador.
- CI no GitHub Actions (formatação, lint, tipos, Vitest, build, validação de migrations, Playwright), Dependabot e template de PR.
