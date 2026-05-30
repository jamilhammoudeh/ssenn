# SSENN Education Holdings

Marketing site and lightweight commerce/admin surface for **SSENN**, a holding
company that builds and stewards a focused portfolio of education and digital
companies, guided by the pursuit of *ihsaan*, excellence in everything we do.

The flagship subsidiary is **Strategic Influence Ihsaan**, an influencer
marketing company.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with a tokenized design system (see `src/index.css`)
- **shadcn/ui** (Radix primitives) for UI components
- **Phosphor Icons** for content iconography
- **Supabase** for auth, products, and orders
- **React Router**, **TanStack Query**, **Recharts**

## Design system

The look is intentionally editorial: a warm neutral palette, **Fraunces** for
display headings, **Inter** for body/UI, hairline borders, and a single deep
teal accent. Everything is driven by CSS variables in
[`src/index.css`](src/index.css), the entire brand pivots on `--primary`, so
re-skinning the site is a one-line change.

## Getting started

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

## Routes

| Path                      | Page                  | Access                |
| ------------------------- | --------------------- | --------------------- |
| `/`                       | Home                  | Public                |
| `/subsidiaries`           | Portfolio companies   | Public                |
| `/about`                  | About                 | Public                |
| `/ihsaan`                 | Strategic Influence   | Public                |
| `/shop`                   | Digital products      | Public                |
| `/contact`                | Contact               | Public                |
| `/auth`                   | Sign in / sign up     | Public                |
| `/admin`                  | Product/order admin   | Authenticated only    |
| `/business-intelligence`  | Analytics dashboard   | Authenticated only    |

> **Note:** protected routes currently require a signed-in user but do **not**
> enforce an admin *role*. For production, enforce role-based access with
> Supabase row-level security and a roles table.

## Configuration

Supabase credentials live in [`src/integrations/supabase/client.ts`](src/integrations/supabase/client.ts).
The values are the **public anon key** and project URL, which are designed to be
exposed in client code and are protected by row-level security. `.env` is git-ignored.
