# Bond Super App - Product Requirements Document

**Version:** 1.0
**Date:** January 9, 2026
**Status:** Draft
**Author:** 0G-X Product Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Problem Statement](#3-problem-statement)
4. [Solution Overview](#4-solution-overview)
5. [User Personas](#5-user-personas)
6. [Feature Requirements](#6-feature-requirements)
7. [Technical Requirements](#7-technical-requirements)
8. [Success Metrics](#8-success-metrics)
9. [Timeline & Milestones](#9-timeline--milestones)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Appendix](#11-appendix)

---

## 1. Executive Summary

Bond is a **DeFi super app** that consolidates four distinct financial products into a single, unified platform on the 0G blockchain:

| Module | Function | Comparable To |
|--------|----------|---------------|
| **Trade** | Perpetual futures trading | Hyperliquid |
| **Swap** | DEX/AMM with concentrated liquidity | Cetus |
| **Lend** | Lending and borrowing | Aave V3 |
| **Predict** | Prediction markets | Polymarket/Kalshi |

The goal is to provide users with a seamless experience across all DeFi primitives without needing to navigate multiple applications, manage separate wallet connections, or track positions across different interfaces.

---

## 2. Product Vision

### Vision Statement

> "One app for all your DeFi needs on 0G - trade, swap, lend, and predict from a single interface with unified portfolio management."

### Strategic Objectives

1. **User Acquisition**: Capture users who want comprehensive DeFi access without app-switching
2. **TVL Growth**: Aggregate liquidity across all modules to increase total value locked
3. **Ecosystem Stickiness**: Users engaged with multiple modules are less likely to churn
4. **0G Adoption**: Position Bond as the flagship DeFi application on 0G blockchain

### Product Principles

1. **Unified Experience**: One wallet connection, one theme, one navigation
2. **Module Independence**: Each module can function standalone if needed
3. **Performance First**: Sub-second interactions, optimistic updates
4. **Mobile Ready**: Full functionality on mobile devices
5. **Progressive Disclosure**: Simple by default, powerful when needed

---

## 3. Problem Statement

### Current State

Users on 0G currently must:

- Navigate to **4 separate applications** for different DeFi activities
- **Connect wallet 4 times** with different authentication flows
- **Track positions across 4 dashboards** with no unified view
- Learn **4 different UI patterns** and navigation structures
- Experience **inconsistent design** and user experience

### User Pain Points

| Pain Point | Impact | Frequency |
|------------|--------|-----------|
| Multiple wallet connections | High friction, security concerns | Every session |
| No unified portfolio | Cannot assess total exposure | Daily |
| Context switching | Cognitive load, missed opportunities | Multiple times/day |
| Inconsistent UX | Learning curve, mistakes | Ongoing |
| Mobile fragmentation | Poor mobile experience | 40% of sessions |

### Market Opportunity

- **Super apps are proven**: WeChat, Grab, Revolut demonstrate the model
- **DeFi is fragmented**: No dominant super app in crypto yet
- **0G is early**: Opportunity to establish the flagship app

---

## 4. Solution Overview

### Product Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BOND SUPER APP                          │
├─────────────────────────────────────────────────────────────┤
│  [Trade]    [Swap]    [Lend]    [Predict]    [Portfolio]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   TRADE     │ │    SWAP     │ │    LEND     │           │
│  │  (Perpdex)  │ │   (Jaine)   │ │  (Zerrow)   │           │
│  │             │ │             │ │             │           │
│  │ • Perpetuals│ │ • Token Swap│ │ • Supply    │           │
│  │ • Leverage  │ │ • Pools     │ │ • Borrow    │           │
│  │ • Positions │ │ • Liquidity │ │ • Looper    │           │
│  │ • Orders    │ │ • Rewards   │ │ • Portfolio │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────┐ ┌───────────────────────────────┐         │
│  │   PREDICT   │ │      UNIFIED PORTFOLIO        │         │
│  │             │ │                               │         │
│  │ • Markets   │ │ • Aggregated positions        │         │
│  │ • Events    │ │ • Total PnL                   │         │
│  │ • Positions │ │ • Cross-module analytics      │         │
│  │ • Leaderb.  │ │ • Transaction history         │         │
│  └─────────────┘ └───────────────────────────────┘         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│           SHARED INFRASTRUCTURE LAYER                       │
│  [Wallet]  [Theme]  [State]  [API]  [Analytics]            │
└─────────────────────────────────────────────────────────────┘
```

### Key Features

#### 4.1 Unified Navigation
- Single header with module tabs
- Consistent layout across all modules
- Quick module switching without page reloads
- Persistent wallet connection

#### 4.2 Unified Portfolio
- Aggregate view of all positions across modules
- Total PnL calculation
- Exposure breakdown by module and asset
- Cross-module transaction history

#### 4.3 Trade Module (from Perpdex)
- Perpetual futures with up to 50x leverage
- 8 order types: Market, Limit, Stop-Limit, Stop-Market, Take-Profit, Scale, TWAP
- Advanced TradingView charting
- Real-time order book and trade feed
- Vaults for passive yield
- Staking for protocol rewards
- Leaderboard and referrals

#### 4.4 Swap Module (from Jaine)
- Token swaps with best-route execution
- Concentrated liquidity pools (CLMM)
- LP position management with range selection
- AI-tomatic vs Manual position types
- Fee tier selection (0.01%, 0.05%, 0.3%, 1%)
- Rewards claiming
- Points system

#### 4.5 Lend Module (from Zerrow)
- Supply assets to earn yield
- Borrow against collateral
- Action Box UI (mobile-first)
- User Modes:
  - High Liquidity Mode
  - Risk Isolation Mode
  - Homologous Mode (correlated assets)
- Account health monitoring
- Looper for leveraged yield strategies

#### 4.6 Predict Module (from 0g-prediction-market)
- Browse prediction markets by category
- Binary outcome betting (Yes/No)
- Real-time price charts
- Order entry with odds display
- Portfolio of prediction positions
- Leaderboard rankings
- Live trade feed

---

## 5. User Personas

### Persona 1: Active Trader "Alex"

**Demographics:** 28yo, full-time crypto trader, $50k+ portfolio
**Goals:** Maximize returns through active trading across instruments
**Behaviors:**
- Trades 10-20x per day
- Uses leverage
- Monitors positions constantly
- Values speed and reliability

**Bond Value Prop:** Single dashboard for perps + swaps + lending collateral + prediction hedges

### Persona 2: DeFi Farmer "Diana"

**Demographics:** 35yo, part-time DeFi user, $10-50k portfolio
**Goals:** Optimize yield across protocols
**Behaviors:**
- Provides liquidity in multiple pools
- Lends idle assets
- Checks positions 2-3x per day
- Values APY and capital efficiency

**Bond Value Prop:** See all yield-generating positions in one place, easy rebalancing

### Persona 3: Casual User "Casey"

**Demographics:** 24yo, crypto curious, <$10k portfolio
**Goals:** Simple access to DeFi without complexity
**Behaviors:**
- Occasional swaps
- Wants to try lending
- Interested in prediction markets
- Values simplicity and guidance

**Bond Value Prop:** Easy onboarding, consistent UX, no need to learn multiple apps

### Persona 4: Institutional "Ivan"

**Demographics:** Crypto fund manager, $1M+ AUM
**Goals:** Professional-grade tooling with comprehensive analytics
**Behaviors:**
- Manages multiple sub-accounts
- Needs detailed reporting
- API access required
- Values security and reliability

**Bond Value Prop:** Sub-accounts, unified reporting, API access, audit trail

---

## 6. Feature Requirements

### 6.1 Core Features (MVP)

#### P0 - Must Have

| ID | Feature | Module | Description |
|----|---------|--------|-------------|
| F1 | Unified wallet connection | Core | Single RainbowKit connection for all modules |
| F2 | Module navigation | Core | Tab-based switching between Trade/Swap/Lend/Predict |
| F3 | Perpetual trading | Trade | Full Perpdex functionality |
| F4 | Token swaps | Swap | Swap any token with best route |
| F5 | Supply/Borrow | Lend | Basic lending and borrowing |
| F6 | Market browsing | Predict | View and filter prediction markets |
| F7 | Position entry | All | Place trades/positions in each module |
| F8 | Basic portfolio | Core | View positions across all modules |

#### P1 - Should Have

| ID | Feature | Module | Description |
|----|---------|--------|-------------|
| F9 | Liquidity provision | Swap | Create and manage LP positions |
| F10 | Advanced orders | Trade | Stop-loss, take-profit, TWAP |
| F11 | User modes | Lend | High Liquidity, Isolation, Homologous |
| F12 | Leaderboards | Trade/Predict | Rankings by PnL and volume |
| F13 | Unified PnL | Core | Aggregate profit/loss across modules |
| F14 | Transaction history | Core | Cross-module transaction log |
| F15 | Mobile responsive | Core | Full functionality on mobile |

#### P2 - Nice to Have

| ID | Feature | Module | Description |
|----|---------|--------|-------------|
| F16 | Looper | Lend | Automated leverage strategies |
| F17 | Vaults | Trade | Passive trading strategies |
| F18 | Staking | Trade | Token staking for rewards |
| F19 | Referrals | All | Cross-module referral system |
| F20 | Points system | All | Unified points across modules |
| F21 | Sub-accounts | Core | Multiple isolated accounts |
| F22 | API access | Core | Programmatic trading |

### 6.2 User Stories

#### Epic: Unified Experience

```
US-1: As a user, I want to connect my wallet once and access all modules
      so that I don't have to repeatedly authenticate.

US-2: As a user, I want to see all my positions in one portfolio view
      so that I can understand my total exposure.

US-3: As a user, I want consistent UI patterns across modules
      so that I can learn the app quickly.
```

#### Epic: Trade Module

```
US-4: As a trader, I want to place leveraged perpetual trades
      so that I can amplify my market exposure.

US-5: As a trader, I want to set stop-loss and take-profit orders
      so that I can manage risk automatically.

US-6: As a trader, I want to see real-time price charts
      so that I can make informed trading decisions.
```

#### Epic: Swap Module

```
US-7: As a user, I want to swap tokens with minimal slippage
      so that I get the best execution price.

US-8: As an LP, I want to provide concentrated liquidity
      so that I can earn higher fees on my capital.

US-9: As an LP, I want to see my pool positions and fees earned
      so that I can track my yield.
```

#### Epic: Lend Module

```
US-10: As a lender, I want to supply assets to earn yield
       so that my idle capital is productive.

US-11: As a borrower, I want to borrow against my collateral
       so that I can access liquidity without selling.

US-12: As a user, I want to see my account health clearly
       so that I can avoid liquidation.
```

#### Epic: Predict Module

```
US-13: As a user, I want to browse prediction markets by category
       so that I can find events I'm interested in.

US-14: As a user, I want to buy Yes/No positions on outcomes
       so that I can profit from my predictions.

US-15: As a user, I want to see the current odds and my potential payout
       so that I can make informed bets.
```

---

## 7. Technical Requirements

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 16 | SSR, App Router, industry standard |
| Language | TypeScript 5 | Type safety, developer experience |
| UI Library | Mantine 8 | Consistent with Perpdex/Jaine |
| Styling | Tailwind 4 | Utility-first, fast iteration |
| State | Zustand 5 | Already used, lightweight |
| Data | TanStack Query 5 | Caching, background refresh |
| Wallet | wagmi 2 + RainbowKit | Standard EVM wallet connection |
| Charts | TradingView Lightweight | Professional trading charts |
| Build | Turborepo | Monorepo optimization |

### 7.2 Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical architecture.

### 7.3 Non-Functional Requirements

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| Page Load | < 2s | Lighthouse FCP |
| Time to Interactive | < 3s | Lighthouse TTI |
| API Response | < 200ms | P95 latency |
| Uptime | 99.9% | Monthly availability |
| Mobile Score | > 90 | Lighthouse mobile |
| Bundle Size | < 500kb | Initial JS bundle |

### 7.4 Security Requirements

- [ ] Wallet connection via established libraries (RainbowKit)
- [ ] No private key handling in frontend
- [ ] CSP headers configured
- [ ] Rate limiting on API calls
- [ ] Input validation on all forms
- [ ] Transaction simulation before execution

### 7.5 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 15+ |
| Chrome Mobile | Android 10+ |

---

## 8. Success Metrics

### 8.1 Key Performance Indicators (KPIs)

#### User Acquisition
| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Monthly Active Users | 1,000 | 10,000 |
| Daily Active Users | 200 | 2,000 |
| Wallet Connections | 500 | 5,000 |

#### Engagement
| Metric | Target |
|--------|--------|
| Modules used per user | > 2.0 |
| Session duration | > 5 min |
| Sessions per week | > 3 |
| Portfolio views per session | > 1.5 |

#### Financial
| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Total Value Locked | $1M | $10M |
| Daily Trading Volume | $500K | $5M |
| Daily Swap Volume | $200K | $2M |

### 8.2 Success Criteria for Launch

- [ ] All P0 features functional
- [ ] < 5 critical bugs in production
- [ ] Mobile responsive on all pages
- [ ] Load time < 3s on 3G connection
- [ ] Successful audit of smart contract interactions
- [ ] Documentation complete

---

## 9. Timeline & Milestones

### Phase 1: Foundation (Days 1-2)

**Goal:** Establish monorepo and shared infrastructure

| Task | Owner | Duration |
|------|-------|----------|
| Create monorepo structure | Eng | 0.5 days |
| Setup Turborepo config | Eng | 0.25 days |
| Create UI package | Eng | 1 day |
| Create wallet package | Eng | 0.5 days |
| Setup CI/CD | Eng | 0.25 days |

**Deliverables:**
- [ ] Monorepo with packages/ui, packages/wallet
- [ ] Shared Mantine theme
- [ ] Unified wallet connection working
- [ ] CI pipeline running

### Phase 2: Module Extraction (Days 3-4)

**Goal:** Extract and modularize each frontend

| Task | Owner | Duration |
|------|-------|----------|
| Extract Trade module | Eng | 1 day |
| Extract Swap module | Eng | 1 day |
| Build Lend module | Eng | 1 day |
| Extract Predict module | Eng | 0.5 days |
| Module store isolation | Eng | 0.5 days |

**Deliverables:**
- [ ] packages/trade with all Perpdex components
- [ ] packages/swap with all Jaine components
- [ ] packages/lend with lending UI
- [ ] packages/predict with prediction market UI
- [ ] No Zustand store conflicts

### Phase 3: Integration (Days 5-6)

**Goal:** Combine modules into unified app

| Task | Owner | Duration |
|------|-------|----------|
| Create app shell | Eng | 0.5 days |
| Implement routing | Eng | 0.5 days |
| Build unified nav | Eng | 0.25 days |
| Build portfolio page | Eng | 0.5 days |
| Environment config | Eng | 0.25 days |

**Deliverables:**
- [ ] Single app with 4 module tabs
- [ ] Unified header and navigation
- [ ] Portfolio page aggregating all positions
- [ ] Environment variables configured

### Phase 4: Polish (Day 7)

**Goal:** Production-ready release

| Task | Owner | Duration |
|------|-------|----------|
| Visual consistency | Eng | 0.25 days |
| Mobile responsive | Eng | 0.25 days |
| Testing | QA | 0.25 days |
| Bug fixes | Eng | 0.25 days |
| Deployment | Eng | 0.25 days |

**Deliverables:**
- [ ] Consistent design across modules
- [ ] Mobile-friendly on all pages
- [ ] Deployed to Vercel
- [ ] Documentation updated

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Zustand store conflicts** | High | High | Namespace all stores with module prefix |
| **Wallet integration issues** | Medium | High | Build abstraction layer first, test early |
| **Missing Zerrow app code** | High | Medium | Build from AAVE comparison spec |
| **UI inconsistency** | Medium | Medium | Establish design tokens in Phase 1 |
| **Performance degradation** | Medium | Medium | Code splitting, lazy loading |
| **Scope creep** | Medium | High | Strict P0/P1/P2 prioritization |
| **Timeline slip** | Medium | Medium | Parallel agent execution |

---

## 11. Appendix

### A. Source Repositories

| Module | Repository | Status |
|--------|------------|--------|
| Trade | [0G-X/perpdex-frontend](https://github.com/0G-X/perpdex-frontend) | Production |
| Swap | [0G-X/jaine-amm-frontent](https://github.com/0G-X/jaine-amm-frontent) | Production |
| Lend | [0G-X/zerrow-homepage](https://github.com/0G-X/zerrow-homepage) | Homepage only |
| Predict | Desktop/0g-prediction-market | Development |

### B. Competitor Analysis

| Feature | Bond | Hyperliquid | Aave | Uniswap |
|---------|------|-------------|------|---------|
| Perps | Yes | Yes | No | No |
| Spot Swap | Yes | Yes | No | Yes |
| Lending | Yes | Yes | Yes | No |
| Predictions | Yes | No | No | No |
| Unified Portfolio | Yes | Partial | No | No |

### C. Reference Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture
- [AAVE_vs_ZERROW.pdf](../AAVE_vs_ZERROW.pdf) - Lending UI comparison
- [CETUS_vs_JAINE.pdf](../CETUS_vs_JAINE.pdf) - DEX UI comparison
- [HYPERLIQUID_vs_0GX.pdf](../HYPERLIQUID_vs_0GX.pdf) - Trading UI comparison

### D. Glossary

| Term | Definition |
|------|------------|
| **CLMM** | Concentrated Liquidity Market Maker |
| **TVL** | Total Value Locked |
| **PnL** | Profit and Loss |
| **LP** | Liquidity Provider |
| **AMM** | Automated Market Maker |
| **Perps** | Perpetual Futures |
| **TWAP** | Time-Weighted Average Price |

---

*Document History*

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-09 | 0G-X Product | Initial draft |
