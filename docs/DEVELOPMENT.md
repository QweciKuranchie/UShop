# UShop Development Guide

Welcome to the UShop development guide. This document outlines the project setup, environment configuration, code conventions, and workflows required to develop and maintain the UShop application.

## Project Info

- **Name:** u-shop
- **Version:** 0.1.0
- **Framework:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript 5
- **Package Manager:** pnpm
- **Dev Server:** `next dev --turbopack`
- **Build Command:** `next build`
- **Deployment:** Vercel (deployments run from the `develop` branch)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js:** Compatible with Next.js 16
- **pnpm:** For package management
- **Git:** For version control

**Required Accounts:**
- Clerk (Authentication)
- Sanity (Headless CMS)
- Firebase (Analytics)
- Google Cloud (for Gmail OAuth2)

## Environment Variables

Create a `.env` or `.env.local` file in the root directory. The following environment variables are required:

### Clerk Auth
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Sanity CMS
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=your_sanity_api_version
SANITY_API_WRITE_TOKEN=your_sanity_api_write_token
# OR SANITY_API_TOKEN
```

### App
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Admin
```env
NEXT_PUBLIC_ADMIN_EMAIL=admin1@example.com,admin2@example.com # Comma-separated or JSON array
```

### Taxes & Points
```env
TAX_AMOUNT=your_tax_amount
REWARD_POINTS_THRESHOLD=your_threshold
REWARD_POINTS_AMOUNT=your_amount
LOYALTY_POINTS_ORDER_THRESHOLD=your_order_threshold
LOYALTY_POINTS_AMOUNT=your_loyalty_amount
```

### Email (Gmail OAuth2)
```env
SENDER_EMAIL_ADDRESS=your_sender_email
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

### Firebase Analytics
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Scripts

Use the following commands to manage the application lifecycle and database:

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:seed      # Seed database
pnpm db:seed-all  # Seed all product categories
pnpm db:nuke      # Delete all content from Sanity
pnpm typegen      # Generate TypeScript types from Sanity schema
```

**Category-Specific Seed Scripts:**
- `db:seed-appliances`, `db:seed-tvs-video`, `db:seed-audio`, `db:seed-cameras`
- `db:seed-phones`, `db:seed-tablets`, `db:seed-computers`, `db:seed-printers`
- `db:seed-networking`, `db:seed-software`, `db:seed-storage`, `db:seed-pc-components`
- `db:seed-gaming`, `db:seed-accessories`, `db:seed-digital-services`, `db:seed-brands`, `db:seed-products`

## Project Structure

```text
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (client)/           # Main application
│   │   ├── (user)/         # Protected user routes
│   │   ├── brands/         # Brand pages
│   │   ├── category/       # Category pages
│   │   ├── deals/          # Deal pages
│   │   ├── product/        # Product pages
│   │   ├── shop/           # Shop page
│   │   ├── stores/         # Store pages
│   │   └── universities/   # University pages
│   ├── api/                # API routes (70+ endpoints)
│   ├── offline/            # PWA offline fallback
│   └── studio/             # Sanity Studio
├── actions/                # Server actions
├── components/             # UI components (170+ files)
│   ├── admin/              # Admin dashboard (29 files)
│   ├── auth/               # Auth components
│   ├── cart/               # Cart components (12 files)
│   ├── checkout/           # Checkout components
│   ├── common/             # Shared components
│   ├── layout/             # Layout components
│   ├── profile/            # Profile components
│   ├── shopPage/           # Shop filter components
│   ├── ui/                 # shadcn/ui primitives (35 files)
│   └── wishlist/           # Wishlist components
├── Constants/              # App constants
├── contexts/               # React contexts
├── hooks/                  # Custom hooks
├── images/                 # Static images
├── lib/                    # Utilities & services
├── public/                 # Public assets & service worker
├── sanity/                 # Sanity config, schema, queries
│   ├── schemaTypes/        # 18 document schemas
│   └── Queries/            # GROQ queries & data fetching
├── types/                  # TypeScript types
├── store.ts                # Zustand global store
├── proxy.ts                # Clerk auth middleware
├── next.config.ts          # Next.js config
├── sanity.config.ts        # Sanity Studio config
└── components.json         # shadcn/ui config
```

## Code Conventions

### TypeScript
- Strict mode is enabled.
- **NO `any` types** — this violates ESLint rules.
- Use properly typed interfaces for all Sanity data (e.g., `SanityOrder`, `SanityUser`, `SanityNotificationItem`).
- Handle optional fields with fallbacks (e.g., `order.orderDate || order._createdAt || Date.now()`).
- Path aliases: `@/` resolves to the project root.

### Components
- **Server Components** by default (React Server Components).
- **Client Components** must explicitly be marked with the `"use client"` directive.
- UI primitives are built using **shadcn/ui** (powered by `@base-ui/react` headless).
- Icons: primarily `lucide-react`, supplemented by `react-icons` and `@sanity/icons`.

### Styling
- **Tailwind CSS v4** utility classes.
- Brand tokens: `ushop-purple`, `ushop-pink`, `ushop_light_bg`, `dark-color`, `light-color`.
- **NO arbitrary values** when Tailwind utilities exist.
- Use the `cn()` utility from `lib/utils.ts` for dynamic/conditional class names.
- **NO `blur-3xl`/`blur-2xl`** decorative blobs.
- Maintain a consistent `rounded-2xl` border radius across UI elements.

### State Management
- **Zustand:** For client-side global state (e.g., cart, wishlist).
- **React Context:** For localized or user data state (`UserDataContext`).
- **URL Search Params:** For managing filter states (e.g., on the shop page).
- **Next.js Cache:** Utilize `unstable_cache` and cache tags for server-side caching.

### API Routes
- All admin APIs must verify admin permissions securely.
- All user APIs must implement Clerk auth using `auth()` from `@clerk/nextjs/server`.
- Return consistent JSON responses: `{ success: true, data }` or `{ error: string }`.
- Use `sanityFetch` for read operations; use `client.create/patch/delete` for mutations.

### Sanity Queries
- GROQ queries are defined in `sanity/Queries/query.ts`.
- Data fetching implementations reside in `sanity/Queries/index.ts` (cached) and `sanity/Queries/userQueries.ts`.
- **Always cast `sanityFetch` results explicitly**: `return (data as SanityUser) ?? null`.
- Ensure proper use of cache tags and revalidation intervals to keep data fresh.

### Next.js 16 Specifics
> [!WARNING]
> This project uses Next.js 16, which contains breaking changes from Next.js 15.
- Use `proxy.ts` instead of the deprecated `middleware.ts`.
- `tsconfig.json` explicitly excludes `middleware.ts`.
- Always consult the local documentation at `node_modules/next/dist/docs/` before using new APIs.

## Git Workflow
- **Primary Branch:** `develop`
- **Remote Repo:** `git@github.com:QweciKuranchie/UShop.git` (SSH)
- **Push Command:** `git push origin develop`
- **CI/CD:** Vercel automatically deploys updates pushed to the `develop` branch.

## Database Seeding

To populate your local or development database:
1. Ensure `SANITY_API_WRITE_TOKEN` is configured in your environment variables.
2. Run `pnpm db:seed-brands` first (brands are strongly referenced by product records).
3. Run specific category seeds (e.g., `pnpm db:seed-appliances`) or seed everything using `pnpm db:seed-all`.
4. To reset data, use `pnpm db:nuke` (Use with caution as it **deletes all content** from the connected Sanity dataset).

## Sanity Studio
- Accessible at the `/studio` route.
- Configured via `sanity.config.ts`.
- Utilizes both `structureTool` and `visionTool`.
- Schema definitions are registered in `sanity/schemaTypes/index.ts`.

## Troubleshooting

### Build Issues
- **OOM (Out Of Memory) during local builds:** 
  Prefix your build command: `NODE_OPTIONS="--max-old-space-size=4096" pnpm run build`
- **Type errors with `SanityOrder` optional fields:** 
  Always provide fallback values for optional properties.
- **`sanityFetch` returns `{}` by default:** 
  You must cast results explicitly to your defined types.

### Common Patterns
- **Admin checks:** Use `isAdmin(user)` or `isUserAdmin(email)` from `lib/adminUtils.ts`.
- **Image URLs:** Use `@sanity/image-url` for Sanity assets; use `lib/emailImageUtils.ts` for handling images within emails.
- **Toast notifications:** Use the `toast()` function from `sonner`.
- **Analytics tracking:** Use `trackEvent()` and specific tracking wrappers located in `lib/analytics.ts`.
- **Cache invalidation:** Leverage functions from `lib/cache.ts` following any data mutation.

### Deployment
- Vercel deployments are triggered automatically from the `develop` branch.
- The build command is `pnpm run build`.
- Build container specs: 2 Cores, 8 GB RAM.
- Verify that all necessary environment variables have been added in the Vercel project dashboard.
- Monitor Vercel build logs specifically for TypeScript validation errors.
