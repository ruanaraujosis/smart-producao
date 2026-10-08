# Changelog

Todas as mudanças relevantes deste projeto. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [versionamento semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Fase 2 — Cadastros + Estoque

_(em desenvolvimento)_

## [0.1.0] - 2026-10-08

### Fase 1 — Fundação

#### Adicionado

- Projeto Next.js 16 (App Router, Cache Components) com TypeScript estrito, Tailwind CSS 4 e shadcn/ui.
- Marca da plataforma **graphicX**: logo, ícones do PWA e design system (laranja, azul-marinho, verde-azulado, azul-céu, roxo e verde-limão), fonte Poppins e tema **claro, escuro e automático**, com contraste AA conferido.
- **Multi-empresa (SaaS)**: gráficas (tenants), vínculo pessoa↔gráfica com perfil por gráfica, isolamento por RLS.
- **Perfis de acesso configuráveis** por gráfica (Ver/Gerenciar por módulo), com perfil Administrador fixo, perfis iniciais editáveis, proteção contra escalada de privilégio e MFA para perfis sensíveis.
- **Senha provisória**: quem recebe a senha de um admin cria a própria no primeiro acesso.
- Andamento do projeto visível só para o SuperAdmin, na Plataforma.
- Login único por **e-mail ou usuário** `nome.cargo`, seletor de gráfica para quem trabalha em mais de uma e troca pelo header.
- **MFA obrigatório** (app autenticador) para admins e SuperAdmin, exigido também pelo banco (`aal2`).
- Painel da **plataforma** (SuperAdmin): cadastro de gráficas e do primeiro admin, ativar/desativar.
- Recuperação de senha por e-mail (`/esqueci-senha`).
- Perfis de acesso (admin, atendimento, designer, produção, expedição, financeiro) com RLS no Postgres.
- Tabela de auditoria com trigger genérico (quem alterou o quê e quando).
- Layout responsivo: sidebar no desktop, navegação inferior no celular e menu filtrado por perfil.
- Gestão da equipe da gráfica (admin): adicionar pessoa nova ou existente, perfil, desativar, redefinir senha e MFA.
- Página _Meu perfil_: nome, troca de senha e tema.
- PWA instalável (manifest e ícones gerados).
- Script `npm run plataforma:iniciar` para a primeira gráfica e o SuperAdmin.
- CI no GitHub Actions (formatação, lint, tipos, Vitest, build, validação de migrations, Playwright), Dependabot e template de PR.
