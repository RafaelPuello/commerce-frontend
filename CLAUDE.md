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

## Routing Architecture

The storefront is served under the `/shop` path prefix (both in development and production):

- **Production:** `https://digidex.bio/shop/` (served under /shop subdirectory)
- **Development:** `http://localhost:10000/shop/` or `http://10.0.0.218:10000/shop/`

**How it works:**

- `next.config.js` sets `basePath: '/shop'`, so all Next.js routes and assets are prefixed with `/shop`
- Traefik routes requests to the storefront container without stripping the `/shop` prefix
- Next.js internally handles the `/shop` prefix via basePath
- This ensures assets load correctly and all routes work under the `/shop` subdirectory

## Environment Variables

Required in `.env`:

- `NEXT_PUBLIC_SALEOR_API_URL` - Full Saleor GraphQL endpoint (e.g., `https://api.digidex.bio/graphql/`)
- `NEXT_PUBLIC_STOREFRONT_URL` - Storefront URL for canonical URLs (e.g., `https://digidex.bio/shop`)
- `NEXT_PUBLIC_DEFAULT_CHANNEL` - Default Saleor channel slug
- `SALEOR_APP_TOKEN` - (Optional) Token for fetching channels list

## Architecture

### GraphQL Workflow

**Step 1: Write GraphQL Queries**

```graphql
# src/graphql/products.graphql
query GetProducts($first: Int!, $channel: String!) {
	products(first: $first, channel: $channel) {
		edges {
			node {
				id
				name
				slug
				pricing(address: {}) {
					priceRange {
						start {
							gross {
								amount
								currency
							}
						}
					}
				}
			}
		}
	}
}
```

**Step 2: Generate TypeScript Types**

```bash
pnpm run generate
# Creates: src/gql/products.ts with typed ProductsDocument
```

**Step 3: Use in Server Components**

```typescript
// src/app/[channel]/(main)/products/page.tsx
import { ProductsDocument } from '@/gql/products';
import { executeGraphQL } from '@/lib/graphql';

export default async function ProductsPage({ params }) {
  const products = await executeGraphQL(ProductsDocument, {
    first: 12,
    channel: params.channel || 'default'
  });

  return (
    <div>
      {products.products.edges.map(({ node }) => (
        <ProductCard key={node.id} product={node} />
      ))}
    </div>
  );
}
```

**Step 4: Use in Client Components**

```typescript
// src/components/ProductFilter.tsx
'use client';

import { useQuery } from 'urql';
import { ProductsDocument } from '@/gql/products';

export function ProductFilter({ channel }: { channel: string }) {
  const [result] = useQuery({
    query: ProductsDocument,
    variables: { first: 12, channel }
  });

  if (result.fetching) return <div>Loading...</div>;
  if (result.error) return <div>Error: {result.error.message}</div>;

  return (
    <div>
      {result.data?.products.edges.map(({ node }) => (
        <ProductCard key={node.id} product={node} />
      ))}
    </div>
  );
}
```

**Codegen Configuration:**

- Uses `TypedDocumentString` with `documentMode: "string"` to minimize bundle size
- Types are strongly typed (full TypeScript support)
- Auto-runs before `pnpm dev` and `pnpm build`

### App Structure

**Pages** (`src/app/`)

- `[channel]/` - Dynamic channel routing (multi-store support)

  ```
  /shop/us/          # US store (channel: us)
  /shop/eu/          # EU store (channel: eu)
  /shop/              # Default channel
  ```

  - `[channel]/(main)/` - Main storefront routes
    - `page.tsx` - Home/landing page
    - `products/page.tsx` - Product listing
    - `products/[slug]/page.tsx` - Product detail
    - `categories/[slug]/page.tsx` - Category pages
    - `cart/page.tsx` - Shopping cart
  - `[channel]/checkout/page.tsx` - Checkout entry

- `api/` - API routes (server-side utilities)
- `layout.tsx` - Root layout with providers

**Checkout Module** (`src/checkout/`) - Self-contained, portable

- `views/`
  - `Checkout.tsx` - Main checkout form
  - `OrderConfirmation.tsx` - Order success page
  - `EmptyCartPage.tsx` - Empty cart message
- `sections/`
  - `ContactSection.tsx` - Email/shipping contact info
  - `AddressSection.tsx` - Shipping and billing address
  - `ShippingSection.tsx` - Shipping method selection
  - `PaymentSection.tsx` - Payment provider (Adyen/Stripe)
- `useCheckout.ts` - State management hook
- Uses urql client with `@saleor/auth-sdk` for auth token management

**UI Components** (`src/ui/`)

- `atoms/` - Basic UI elements (Button, Input, Select, etc.)
- `components/` - Composite components (ProductCard, CartItem, etc.)

**Utilities** (`src/lib/`)

- `graphql.ts` - Server-side GraphQL execution with auth
  ```typescript
  export async function executeGraphQL(query, variables) {
  	// Calls Saleor GraphQL API with auth token
  	// Used for server-side data fetching
  }
  ```
- `checkout.ts` - Checkout helper functions (calculate totals, validate addresses, etc.)
- `auth.ts` - Saleor auth SDK integration

- `src/hooks/` - React hooks

### Multi-Channel (Multi-Store) Support

Saleor supports multiple sales channels (regions, currencies, stores) through dynamic routing:

**Channel-Based Routing**:

```
/shop/us/              # US store (channel: us, currency: USD)
/shop/eu/              # EU store (channel: eu, currency: EUR)
/shop/au/              # AU store (channel: au, currency: AUD)
/shop/                 # Default channel (typically first in list)
```

**Accessing Channel in Pages/Components**:

```typescript
// src/app/[channel]/(main)/products/page.tsx
export default async function ProductsPage({
  params
}: {
  params: { channel: string }
}) {
  const channel = params.channel || 'default';

  // Pass channel to GraphQL queries
  const products = await executeGraphQL(ProductsDocument, {
    channel,
    first: 12
  });

  return <ProductListing products={products} channel={channel} />;
}
```

**Querying Channel-Specific Data**:

```graphql
# GraphQL query that respects channel
query GetProducts($channel: String!, $first: Int!) {
	products(channel: $channel, first: $first) {
		edges {
			node {
				id
				name
				pricing(address: {}) {
					# Pricing varies by channel/currency
					priceRange {
						start {
							gross {
								amount
								currency # Currency from channel
							}
						}
					}
				}
			}
		}
	}
}
```

**Channel Configuration**:

- Defined in Saleor backend (admin panel or API)
- Each channel has:
  - Slug (e.g., "us", "eu")
  - Currency (e.g., USD, EUR)
  - Default country
  - Tax handling
  - Shipping zones
  - Product availability

**Setting Default Channel**:

```typescript
// src/app/config.ts or environment config
export const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default";
```

### Authentication

Uses `@saleor/auth-sdk` with Next.js server cookie storage. The `getServerAuthClient()` in `src/app/config.ts` creates the auth client for server-side requests and manages:

- Access tokens (short-lived)
- Refresh tokens (long-lived)
- User session state
- CSRF protection

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
