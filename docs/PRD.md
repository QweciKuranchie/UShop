# Product Requirements Document (PRD) — UShop

> **Version**: 1.0  
> **Last Updated**: August 2026  
> **Status**: V1 — In Development  
> **Platform**: Web (PWA)  
> **Currency**: Ghanaian Cedi (GHS / GH₵)

---

## 1. Executive Summary

**UShop** (U-Shop) is a full-stack **Consumer-to-Consumer (C2C) Campus Tech Marketplace** that connects university students and campus communities in Ghana for buying and selling technology products. The platform provides a localized, trust-oriented marketplace tailored to the unique needs of campus life — including peer-to-peer meetup locations, student verification, campus store profiles, and mobile money payment options.

Built on Next.js 16 (React 19), Sanity v5, Clerk authentication, and Tailwind CSS v4, UShop delivers a fast, server-rendered, Progressive Web App experience optimized for both desktop and mobile.

---

## 2. Product Vision & Mission

### Vision
To be the most trusted and convenient marketplace for university students in Ghana to buy and sell technology products within their local campus ecosystems.

### Mission
Empower Ghanaian university communities with a secure, user-friendly platform that:
- Eliminates friction in campus tech trading
- Builds trust through student verification and seller ratings
- Supports local payment methods (Mobile Money, Cash on Delivery)
- Provides an offline-capable PWA experience for low-bandwidth environments

---

## 3. Target Market

### 3.1 Primary Market
- **Geography**: Ghana — initial rollout at University of Ghana (Legon) and KNUST
- **Demographics**: University students (ages 17–30), campus staff, and faculty
- **Market Size**: 500,000+ university students across Ghana's public and private universities

### 3.2 User Segments

| Segment | Description | Size Estimate |
|---|---|---|
| Student Buyers | Students seeking affordable new/used tech | ~70% of users |
| Student Sellers | Students selling personal tech or running side-hustles | ~20% of users |
| Small Campus Businesses | Registered small businesses operating near campuses | ~8% of users |
| Admin / Platform Operators | UShop team managing the marketplace | ~2% of users |

---

## 4. User Personas

### Persona 1: Kwame — The Student Buyer
- **Age**: 20, 2nd-year Computer Science, University of Ghana
- **Goal**: Find a reliable, affordable used laptop for coding
- **Pain Points**: Scammed on social media marketplaces; can't verify product quality remotely
- **Needs**: See seller ratings, verify product condition, meet at a campus location, pay via MoMo
- **Device**: Android smartphone, intermittent WiFi

### Persona 2: Abena — The Campus Seller
- **Age**: 23, recent KNUST graduate running a phone accessories side-hustle
- **Goal**: Reach more students without social media advertising costs
- **Pain Points**: Managing inventory across WhatsApp groups is chaotic; no payment tracking
- **Needs**: Product listing management, order notifications, customer communication, sales analytics
- **Device**: iPhone, reliable data plan

### Persona 3: Prof. Mensah — The Faculty Buyer
- **Age**: 45, Lecturer, KNUST
- **Goal**: Find discounted tech peripherals (keyboards, monitors) for the department
- **Pain Points**: University procurement is slow; wants to buy locally and quickly
- **Needs**: Search for specific products, compare prices, pay by card or COD
- **Device**: Laptop, campus WiFi

### Persona 4: Ama — The Platform Admin
- **Age**: 26, UShop Operations Manager
- **Goal**: Ensure smooth marketplace operations, handle disputes, moderate content
- **Pain Points**: Needs visibility into orders, reviews, and user activity across the platform
- **Needs**: Admin dashboard with KPIs, order management, review moderation, user management
- **Device**: Laptop, office connection

---

## 5. Feature Requirements — V1 (Current Scope)

### 5.1 Authentication & Authorization

| ID | Feature | Priority | Description |
|---|---|---|---|
| AUTH-01 | Email/Password Sign-Up | Must Have | Clerk-powered registration with email verification |
| AUTH-02 | Social Login (SSO) | Must Have | Google, Apple, and other OAuth providers via Clerk |
| AUTH-03 | Password Reset | Must Have | Multi-step forgot-password flow with email verification |
| AUTH-04 | Route Protection | Must Have | `/user/*` and `/admin/*` routes require authentication |
| AUTH-05 | Auth Modal | Must Have | Inline sign-in prompt when unauthenticated users attempt cart, wishlist, or checkout actions |
| AUTH-06 | Admin Authorization | Must Have | Role-based access control via `NEXT_PUBLIC_ADMIN_EMAIL` and Sanity `isAdmin` flag |
| AUTH-07 | Student Verification | Should Have | University email domain matching and student ID verification workflow |

### 5.2 Product Browsing & Discovery

| ID | Feature | Priority | Description |
|---|---|---|---|
| PROD-01 | Homepage | Must Have | Hero banner carousel, flash sale countdown, featured products grid, category tiles, brand showcase |
| PROD-02 | Product Catalog | Must Have | Full product listing with grid view, pagination, and sort options (price, name, newest, popularity) |
| PROD-03 | Product Detail Page | Must Have | Image gallery with zoom, specifications table, pricing (original + discounted), seller info, condition badge, reviews section |
| PROD-04 | Search | Must Have | Global search bar with live autocomplete suggestions (products + categories) |
| PROD-05 | Category Browsing | Must Have | Hierarchical category pages (Department → Main → Sub → Item Type) with breadcrumb navigation |
| PROD-06 | Faceted Filtering | Must Have | Multi-faceted filters: category, brand, condition (new/used/refurbished), price range slider, dynamic attributes (RAM, Storage, Screen Size, etc.) |
| PROD-07 | Brand Pages | Should Have | Brand directory and brand-specific product listings |
| PROD-08 | Store Pages | Should Have | Seller storefront profiles with ratings, descriptions, and product listings |
| PROD-09 | University Hubs | Should Have | Campus-specific marketplace pages for localized peer-to-peer meetups |
| PROD-10 | Flash Sales & Deals | Should Have | Time-limited deals with countdown timers and discount badges |
| PROD-11 | Related Products | Nice to Have | Product recommendations based on shared category or store |

**Acceptance Criteria (PROD-04 — Search)**:
- Search results appear within 300ms of typing
- Results include product name, image, price, and brand
- Clicking a result navigates to the product detail page
- Empty state shown when no results match

### 5.3 Shopping Cart & Checkout

| ID | Feature | Priority | Description |
|---|---|---|---|
| CART-01 | Add to Cart | Must Have | Add products with quantity selection and stock validation |
| CART-02 | Persistent Cart | Must Have | Cart state persisted to localStorage via Zustand (survives page refreshes) |
| CART-03 | Cart Management | Must Have | Update quantities, remove items, view subtotal/total/discount |
| CART-04 | Address Management | Must Have | CRUD operations for shipping addresses (types: home, office, hostel, campus_hall) |
| CART-05 | Checkout Flow | Must Have | Multi-step: Review items → Select address → Choose payment → Confirm order |
| CART-06 | Payment Methods | Must Have | Mobile Money (MoMo), Card, Cash on Delivery |
| CART-07 | Order Confirmation | Must Have | Success page with order number, itemized receipt, and confirmation email |
| CART-08 | Order Emails | Must Have | HTML confirmation email via Nodemailer/Gmail OAuth2 with product images |
| CART-09 | Stock Validation | Must Have | Prevent checkout when items are out of stock or quantity exceeds available stock |

**Acceptance Criteria (CART-05 — Checkout Flow)**:
- User cannot proceed without selecting a shipping address
- Order summary displays subtotal, shipping, tax, discounts, and total
- Order is created in Sanity with status `pending` and unique order number
- User is redirected to success page after order creation

### 5.4 Wishlist

| ID | Feature | Priority | Description |
|---|---|---|---|
| WISH-01 | Add/Remove Favorites | Should Have | Toggle products in/out of wishlist with heart icon animation |
| WISH-02 | Wishlist Page | Should Have | View all saved items with product cards, stock indicators, and remove actions |
| WISH-03 | Bulk Add to Cart | Nice to Have | Add all in-stock wishlist items to cart in one action |
| WISH-04 | Wishlist Count Badge | Should Have | Header icon showing live count of saved items |

### 5.5 User Account & Dashboard

| ID | Feature | Priority | Description |
|---|---|---|---|
| USER-01 | Dashboard Overview | Must Have | Stats cards: Total Orders, Unread Notifications, Wishlist Count |
| USER-02 | Order History | Must Have | Searchable, filterable order list with status badges and pagination |
| USER-03 | Order Detail | Must Have | Full order view with itemized breakdown, payment status, and timeline tracking (Pending → Processing → Shipped → Delivered) |
| USER-04 | Profile Management | Must Have | Edit first name, last name, phone, date of birth |
| USER-05 | Notification Center | Should Have | View, mark as read, and delete in-app notifications |
| USER-06 | Account Settings | Nice to Have | Preferences for marketing emails, SMS alerts, dark mode, language |
| USER-07 | Newsletter Subscription | Must Have | Manage email newsletter opt-in/out from profile settings |

### 5.6 Reviews & Ratings

| ID | Feature | Priority | Description |
|---|---|---|---|
| REV-01 | Submit Review | Should Have | 1–5 star rating with title, content text, and verified purchase badge |
| REV-02 | Rating Display | Should Have | Average rating, total reviews count, and rating breakdown bar chart on product pages |
| REV-03 | Helpful Votes | Nice to Have | Users can mark reviews as helpful; sort by most helpful |
| REV-04 | Admin Moderation | Must Have | Review workflow: pending → approved / rejected with admin notes |

### 5.7 Admin Dashboard

| ID | Feature | Priority | Description |
|---|---|---|---|
| ADM-01 | KPI Overview | Must Have | Cards: Total Revenue, Total Orders, Total Products, Total Users with percentage change indicators |
| ADM-02 | Sales Analytics | Must Have | Recharts visualizations: revenue over time, order volume, payment method breakdown, best sellers |
| ADM-03 | Order Management | Must Have | Full order CRUD: search, filter by status, update status/tracking, refund/cancel |
| ADM-04 | Product Management | Must Have | Product inventory table with stock levels and status management |
| ADM-05 | User Management | Must Have | Clerk + Sanity user sync, role assignment, activate/suspend accounts |
| ADM-06 | Account Request Moderation | Should Have | Approve/reject business and premium seller applications |
| ADM-07 | Review Moderation | Should Have | Approve/reject customer reviews with admin notes |
| ADM-08 | Notification Broadcasting | Should Have | Send targeted or broadcast announcements with delivery tracking |
| ADM-09 | Newsletter Management | Should Have | Subscriber list, search, duplicate cleanup |

### 5.8 Progressive Web App (PWA)

| ID | Feature | Priority | Description |
|---|---|---|---|
| PWA-01 | Installability | Nice to Have | Web app manifest for "Add to Home Screen" on mobile devices |
| PWA-02 | Offline Support | Nice to Have | Service worker with cache-first strategies and offline fallback page |
| PWA-03 | Smart Caching | Nice to Have | Multi-strategy caching: static assets (cache-first), images (FIFO-limited cache), HTML (network-first), JSON (stale-while-revalidate) |

### 5.9 Newsletter

| ID | Feature | Priority | Description |
|---|---|---|---|
| NEWS-01 | Subscribe | Must Have | Footer subscription form with email validation |
| NEWS-02 | Welcome Email | Should Have | Automated HTML welcome email on subscription |
| NEWS-03 | Unsubscribe | Must Have | One-click unsubscribe support |

---

## 6. V2 Roadmap Features (Future Scope)

The following features are explicitly **out of scope for V1** and planned for a future release:

| Feature | Description | V2 Priority |
|---|---|---|
| **Wallet & Fund Management** | Digital wallet balance, fund deposits, withdrawal to Bank/PayPal | High |
| **Reward Points & Loyalty** | Points earned per purchase, milestone rewards, tier system (Bronze → Silver → Gold) | High |
| **Premium Membership** | Premium seller verification badges, priority listing, reduced fees | Medium |
| **Paystack Integration** | Full payment gateway integration replacing Clerk payment sessions | High |
| **Stripe Integration** | International payment support for diaspora buyers | Medium |
| **Invoice Generation** | PDF invoice generation and download for completed orders | Medium |
| **Employee Management** | Store employee roles, delivery agent assignment, fulfillment workflows | Low |
| **Employee Analytics** | Staff performance metrics, fulfillment tracking, shift management | Low |
| **In-App Messaging** | Direct messaging between buyers and sellers | Medium |
| **Push Notifications** | Browser/mobile push notifications for order updates and deals | Medium |

---

## 7. Non-Functional Requirements

### 7.1 Performance
- **Server Response**: Pages rendered via SSR/ISR with cache revalidation (300s–3600s based on data volatility)
- **Core Web Vitals**: Target LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Code-split via Next.js App Router with Turbopack in development

### 7.2 SEO
- Server-side rendering with dynamic `<meta>` tags per page
- Structured data for products, reviews, and organization
- Semantic HTML and accessible component primitives

### 7.3 Responsiveness
- Mobile-first responsive design using Tailwind CSS breakpoints
- Desktop optimization for admin dashboard and data-heavy views
- Touch-optimized interactions (swipe carousels, tap targets)

### 7.4 Accessibility
- Headless UI primitives from `@base-ui/react` ensuring WAI-ARIA compliance
- Keyboard navigation support across all interactive components
- Color contrast ratios meeting WCAG 2.1 AA standards

### 7.5 Security
- Authentication and session management via Clerk (industry-standard)
- Server-side API route authorization (admin role verification)
- Environment variable separation for secrets (never exposed to client)
- CSRF protection via Next.js built-in mechanisms

### 7.6 Reliability
- Graceful error handling with custom 404 page and error boundaries
- PWA offline fallback for network failures
- Optimistic UI updates with server reconciliation

### 7.7 Localization
- **Currency**: Ghanaian Cedi (GHS / GH₵) — primary and only currency for V1
- **Language**: English (Ghana) — V1 scope
- **Address Types**: Ghana-specific (hostel, campus_hall support)
- **Payment Methods**: Ghana-centric (Mobile Money / MoMo)

### 7.8 Analytics & Monitoring
- **User Behavior**: Firebase Analytics (page views, add-to-cart, purchases, search, category views)
- **Performance**: Vercel Analytics + Speed Insights
- **Admin Insights**: Built-in analytics dashboard with Recharts

---

## 8. Product Taxonomy

UShop uses a hierarchical product classification system:

```
Product Classification (Top Level)
├── Physical Tech
├── Digital Product
└── Tech Service

Category Hierarchy
├── Department (e.g., Computing)
│   ├── Main Category (e.g., Laptops)
│   │   ├── Sub Category (e.g., Gaming Laptops)
│   │   │   └── Item Type (e.g., 15-inch Gaming Laptop)
```

### Product Conditions
| Condition | Description |
|---|---|
| New | Factory sealed, unused |
| Used — Like New | Minimal or no signs of use |
| Used — Good | Functional with visible wear |
| Refurbished | Professionally restored to working condition |

### Dynamic Attributes
Categories can define their own filterable attributes:
- **Phones**: RAM, Storage, Screen Size, Battery, OS
- **Laptops**: RAM, Storage, CPU, GPU, Screen Size, Weight
- **Accessories**: Compatibility, Color, Material
- **Audio**: Driver Size, Connectivity, Battery Life

---

## 9. Success Metrics & KPIs

### Launch Phase (Months 1–3)
| Metric | Target |
|---|---|
| Verified Student Accounts | 500+ |
| Products Listed | 1,000+ |
| Monthly Active Users (MAU) | 300+ |
| Orders Completed | 100+ |

### Growth Phase (Months 4–12)
| Metric | Target |
|---|---|
| Verified Student Accounts | 5,000+ |
| Monthly Active Users (MAU) | 2,000+ |
| Cart-to-Purchase Conversion Rate | > 15% |
| Repeat Purchase Rate (60-day) | > 25% |
| Average Session Duration | > 4 minutes |
| Core Web Vitals (LCP) | < 2.5s |
| App Install Rate (PWA) | > 10% of mobile users |

---

## 10. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Low initial product listings | Users leave due to empty catalog | High | Seed database with 1000+ products; onboard campus sellers early |
| Payment gateway delays (Paystack) | Users can't pay online | Medium | Offer Cash on Delivery and Clerk payment sessions as interim |
| Trust concerns (C2C fraud) | Users avoid the platform | Medium | Student verification, seller ratings, campus meetup locations |
| Low mobile performance | Poor UX on budget Android devices | Medium | PWA with aggressive caching; server-rendered pages |
| Content moderation burden | Fake or inappropriate listings | Low | Admin review workflow; report mechanism |

---

## 11. Glossary

| Term | Definition |
|---|---|
| **C2C** | Consumer-to-Consumer marketplace model |
| **MoMo** | Mobile Money — popular mobile payment system in Ghana |
| **PWA** | Progressive Web App — web app installable on mobile devices |
| **ISR** | Incremental Static Regeneration — Next.js caching strategy |
| **GROQ** | Graph-Relational Object Queries — Sanity's query language |
| **Clerk** | Third-party authentication and user management service |
| **Sanity** | Headless CMS used as the primary database and content management system |
| **GHS** | Ghanaian Cedi — official currency of Ghana |
| **KNUST** | Kwame Nkrumah University of Science and Technology |
| **COD** | Cash on Delivery — payment upon physical receipt of goods |
| **SSO** | Single Sign-On — authentication via external providers (Google, Apple) |
