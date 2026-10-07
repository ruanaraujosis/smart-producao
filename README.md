# Smart Produção

Sistema de gestão da Smart Gráfica: pedidos, aprovação de artes, produção (PCP), estoque, financeiro, NF-e, dashboard para TV e integração com marketplaces (Shopee, Magalu, TikTok Shop).

**Stack:** Next.js · React · TypeScript · Tailwind CSS · Supabase · Vercel

A especificação completa está em [PROMPT.md](PROMPT.md).

## Fluxo de trabalho

- `main` → produção (protegida, só via Pull Request)
- `develop` → homologação
- `feat/*`, `fix/*`, `chore/*` → saem de `develop` e voltam por Pull Request
- Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/)

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha. Segredos nunca entram no repositório — este repositório é **público**.
