# Bond Super App - Execution Plan

**Status:** Planning
**Version:** 1.0

---

## Overview

This document outlines the order of operations for building Bond. Each sprint builds on the previous one. Nothing is time-boxed - sprints are just logical groupings of work.

---

## Sprint 0: Foundation

**Goal:** Empty monorepo that builds and runs

- [ ] Initialize Turborepo monorepo structure
- [ ] Create `apps/web` (Next.js 16 app, empty)
- [ ] Create placeholder packages: `ui`, `wallet`, `state`, `api`
- [ ] Configure TypeScript, Biome (linting), path aliases
- [ ] Verify `bun install` and `bun dev` work
- [ ] Push to GitHub, set up Vercel preview deployments

**Output:** Running app at localhost:3000 showing "Bond" with nothing else

---

## Sprint 1: Design System & Wallet

**Goal:** Shared UI components and Privy wallet working

**@bond/ui package:**
- [ ] Set up Mantine 8 with Bond theme (colors, fonts, spacing)
- [ ] Create base components: Button, Card, Modal, Input, Table
- [ ] Create layout components: Stack, Group, Grid, Container
- [ ] Create feedback components: Notification, Loading, Skeleton
- [ ] Create trading components: PriceDisplay, PercentChange, TokenIcon

**@bond/wallet package:**
- [ ] Set up Privy provider with embedded wallet config
- [ ] Configure multi-chain support (0G mainnet, testnet, + future chains)
- [ ] Create `useWallet` hook (address, login, logout)
- [ ] Create `useDelegatedSigner` hook (auto-sign transactions)
- [ ] Create `useChain` hook (current chain, switch chain)
- [ ] Create chain registry (add new chains easily)

**apps/web:**
- [ ] Add global providers (Privy, Mantine, QueryClient)
- [ ] Create app shell: Header with wallet button, sidebar nav
- [ ] Test: User can login with email, see their address

**Output:** App with working login, styled header, empty pages

---

## Sprint 2: Trade Module (from Perpdex)

**Goal:** Trading UI working in Bond

**@bond/trade package:**
- [ ] Copy components from perpdex-frontend
- [ ] Update imports to use `@bond/ui` and `@bond/wallet`
- [ ] Split perpdex global store into focused stores:
  - `useOrderStore` (order form state)
  - `usePositionStore` (open positions)
  - `useMarketStore` (market data, prices)
- [ ] Update contract calls to use delegated signer
- [ ] Export public API: components, hooks, types

**apps/web:**
- [ ] Create `/trade` route group with layout
- [ ] Create `/trade` page (main trading interface)
- [ ] Create `/portfolio` page (positions, history)
- [ ] Create `/vaults` page
- [ ] Create `/staking` page
- [ ] Create `/leaderboard` page
- [ ] Wire up navigation

**Output:** Full trading experience at bond.app/trade

---

## Sprint 3: Swap Module (from Jaine)

**Goal:** Swap/AMM UI working in Bond

**@bond/swap package:**
- [ ] Copy components from jaine-amm-frontent
- [ ] Convert Vite patterns to Next.js compatible
- [ ] Upgrade Mantine 7 → 8 where needed
- [ ] Replace `@phongjimmy/wallet` with `@bond/wallet`
- [ ] Keep `@zer0dex/sdk` for AMM math
- [ ] Create focused stores:
  - `useSwapStore` (swap form, selected tokens)
  - `usePoolStore` (pool data)
  - `useLiquidityStore` (LP positions)
- [ ] Export public API

**apps/web:**
- [ ] Create `/swap` route group with layout
- [ ] Create `/swap` page (token swap interface)
- [ ] Create `/pools` page (all pools)
- [ ] Create `/pools/[id]` page (pool detail)
- [ ] Create `/rewards` page

**Output:** Full swap experience at bond.app/swap

---

## Sprint 4: Predict Module (from Prediction Market)

**Goal:** Prediction markets working in Bond

**@bond/predict package:**
- [ ] Copy components from 0g-prediction-market
- [ ] Rebuild custom components with Mantine (14 components)
- [ ] Already uses Privy - align with `@bond/wallet` config
- [ ] Connect to real backend (replace mock data)
- [ ] Create stores:
  - `useMarketsStore` (event listings)
  - `usePredictOrderStore` (order form)
  - `usePositionsStore` (user positions)
- [ ] Export public API

**apps/web:**
- [ ] Create `/markets` route group with layout
- [ ] Create `/markets` page (event listings)
- [ ] Create `/event/[ticker]` page (event detail + trading)
- [ ] Create `/profile` page (prediction history)

**Output:** Full prediction market at bond.app/markets

---

## Sprint 5: Lend Module (New Build)

**Goal:** Lending/borrowing UI (based on Zerrow/AAVE spec)

**@bond/lend package:**
- [ ] Build from scratch using AAVE_vs_ZERROW spec
- [ ] Create ActionBox component (supply/borrow in one place)
- [ ] Create SupplyTable (assets you can supply)
- [ ] Create BorrowTable (assets you can borrow)
- [ ] Create HealthIndicator (liquidation risk)
- [ ] Create UserModeSelector (3 modes from Zerrow spec)
- [ ] Create stores:
  - `useSupplyStore`
  - `useBorrowStore`
  - `useHealthStore`
- [ ] Export public API

**apps/web:**
- [ ] Create `/lend` route group with layout
- [ ] Create `/lend` page (main lending interface)
- [ ] Create `/lend/portfolio` page (your positions)

**Output:** Full lending experience at bond.app/lend

---

## Sprint 6: Unified Dashboard

**Goal:** Single view of user's entire portfolio across all products

**apps/web:**
- [ ] Create `/dashboard` page
- [ ] Show combined portfolio value (trade + swap + lend + predict)
- [ ] Show positions from each module in unified table
- [ ] Show recent activity across all modules
- [ ] Show P&L breakdown by product
- [ ] Add quick actions (close position, claim rewards, etc.)

**@bond/api package:**
- [ ] Create unified portfolio aggregation
- [ ] Create cross-module position fetching

**Output:** User sees everything in one place at bond.app/dashboard

---

## Sprint 7: Multi-Chain Support

**Goal:** App works across multiple chains

**@bond/wallet package:**
- [ ] Add chain registry with easy chain addition
- [ ] Implement chain switching UI
- [ ] Handle chain-specific contract addresses
- [ ] Add chain-specific RPC endpoints

**All modules:**
- [ ] Make contract addresses chain-aware
- [ ] Handle chain switching gracefully (reload positions, etc.)
- [ ] Show chain indicator in UI

**Supported chains (initial):**
- [ ] 0G Mainnet
- [ ] 0G Testnet
- [ ] (Add more as needed)

**Output:** Users can switch chains, everything updates

---

## Sprint 8: Polish & Launch Prep

**Goal:** Production ready

**Performance:**
- [ ] Add loading skeletons everywhere
- [ ] Implement optimistic updates for transactions
- [ ] Add error boundaries
- [ ] Lazy load modules (code splitting)

**UX:**
- [ ] Add onboarding flow for new users
- [ ] Add tooltips/help for complex features
- [ ] Mobile responsive pass on all pages
- [ ] Add keyboard shortcuts for traders

**Testing:**
- [ ] Add critical path E2E tests
- [ ] Test wallet flows (login, sign, disconnect)
- [ ] Test each module's core actions

**Deployment:**
- [ ] Set up production environment variables
- [ ] Configure Vercel production deployment
- [ ] Set up monitoring/error tracking

**Output:** Ready for users

---

## Dependency Graph

```
Sprint 0 (Foundation)
    │
    ▼
Sprint 1 (UI + Wallet)
    │
    ├──────────────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼
Sprint 2       Sprint 3       Sprint 4       Sprint 5
(Trade)        (Swap)         (Predict)      (Lend)
    │              │              │              │
    └──────────────┴──────────────┴──────────────┘
                           │
                           ▼
                    Sprint 6 (Dashboard)
                           │
                           ▼
                    Sprint 7 (Multi-Chain)
                           │
                           ▼
                    Sprint 8 (Polish)
```

**Note:** Sprints 2, 3, 4, 5 can run in parallel once Sprint 1 is done.

---

## Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| UI Library | Mantine 8 | Already used by Perpdex/Jaine |
| Wallet | Privy embedded | No popups, email login |
| State | Zustand | Simple, already used |
| Monorepo | Turborepo | Fast builds |
| Package Manager | Bun | Fast installs |
| Multi-chain | Chain registry pattern | Easy to add chains |

---

## Open Questions

- [ ] Which additional chains beyond 0G?
- [ ] Backend APIs - are they ready for each module?
- [ ] Contract addresses for each chain?
- [ ] Privy app ID for production?

---

*This plan will be updated as work progresses.*
