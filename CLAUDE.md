# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Saleor storefront built with Next.js 16 and React 19. It's a headless e-commerce frontend that connects to a Saleor GraphQL API backend. The project uses the App Router with React Server Components.

## Build Commands

```bash
# Install dependencies (pnpm required)
pnpm install

# Development server (runs codegen automatically)
pnpm dev

# Production build
pnpm build

# Linting
pnpm lint

# Generate GraphQL types (runs automatically before dev/build)
pnpm run generate
```

## Environment Variables

Required in `.env`:

- `NEXT_PUBLIC_SALEOR_API_URL` - Full Saleor GraphQL endpoint (e.g., `https://example.saleor.cloud/graphql/`)
- `NEXT_PUBLIC_STOREFRONT_URL` - Storefront URL for canonical URLs
- `NEXT_PUBLIC_DEFAULT_CHANNEL` - Default Saleor channel slug
- `SALEOR_APP_TOKEN` - (Optional) Token for fetching channels list

## Architecture

### GraphQL Workflow

1. Write GraphQL queries/mutations in `src/graphql/*.graphql`
2. Run `pnpm run generate` to generate types in `src/gql/`
3. Import generated typed documents and use with `executeGraphQL()` from `src/lib/graphql.ts`

The codegen uses `TypedDocumentString` with `documentMode: "string"` to minimize bundle size.

### App Structure

- `src/app/` - Next.js App Router pages

  - `[channel]/` - Dynamic channel routing (multi-store support)
  - `[channel]/(main)/` - Main storefront routes (products, categories, cart, etc.)
  - `api/` - API routes
  - `checkout/` - Checkout page entry

- `src/checkout/` - Self-contained checkout module (portable, doesn't use Next.js components)

  - `sections/` - Checkout form sections (Address, Payment, Contact, etc.)
  - `views/` - Main checkout views (Checkout, OrderConfirmation, EmptyCartPage)
  - Uses urql client with Saleor auth SDK
  - Integrates Adyen and Stripe payment providers

- `src/ui/` - Reusable UI components

  - `atoms/` - Basic UI elements
  - `components/` - Composite components

- `src/lib/` - Core utilities

  - `graphql.ts` - `executeGraphQL()` function for server-side GraphQL calls with auth
  - `checkout.ts` - Checkout helper functions

- `src/hooks/` - React hooks

### Authentication

Uses `@saleor/auth-sdk` with Next.js server cookie storage. The `getServerAuthClient()` in `src/app/config.ts` creates the auth client for server-side requests.

### Path Aliases

- `@/*` → `./src/*`
- `@ui/*` → `./src/components/*`

### Shared Styles

The `src/styles` directory is a symlink to `../../shared/styles` (shared across the monorepo).

## Docker

```bash
# Build and run with docker-compose
docker-compose up

# Build args required:
# - NEXT_PUBLIC_SALEOR_API_URL
# - NEXT_PUBLIC_STOREFRONT_URL
```

The Dockerfile builds from parent context to include shared styles.
