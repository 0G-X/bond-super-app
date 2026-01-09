# Bond Super App - Technical Architecture

**Version:** 1.0
**Date:** January 9, 2026

---

## Overview

Bond combines 4 separate DeFi frontends into one unified app. Users visit one website and can trade, swap, lend, and predict - all with one login and one wallet.

---

## What We're Building

```
bond.app/
├── /trade      → Perpetual trading (from Perpdex)
├── /swap       → Token swaps & liquidity pools (from Jaine)
├── /lend       → Lending & borrowing (new, based on Zerrow spec)
├── /markets    → Prediction markets (from 0g-prediction-market)
└── /dashboard  → Unified portfolio view (new)
```

---

## Technology Choices

| What | Technology | Why |
|------|------------|-----|
| Framework | Next.js 16 | Industry standard, great for SEO and performance |
| UI Components | Mantine 8 | Already used by Perpdex and Jaine |
| Styling | Tailwind CSS 4 | Fast to build with, consistent look |
| State | Zustand 5 | Simple, already used in existing apps |
| Wallet | Privy (Embedded) | Users login with email, no MetaMask popups |
| Blockchain | viem 2 | Type-safe contract interactions |
| Charts | TradingView | Professional trading charts |
| Build Tool | Turborepo | Fast builds for monorepo |

---

## Folder Structure (Simplified)

```
bond-super-app/
│
├── apps/web/                    ← The actual website
│   └── src/app/
│       ├── trade/               ← Trading pages
│       ├── swap/                ← Swap pages
│       ├── lend/                ← Lending pages
│       ├── markets/             ← Prediction market pages
│       └── dashboard/           ← Portfolio page
│
├── packages/                    ← Reusable code libraries
│   │
│   │  # Product modules (one per DeFi product)
│   ├── trade/                   ← Trading components, hooks, logic
│   ├── swap/                    ← Swap components, hooks, logic
│   ├── lend/                    ← Lending components, hooks, logic
│   ├── predict/                 ← Prediction market components
│   │
│   │  # Shared infrastructure (used by ALL modules)
│   ├── ui/                      ← Buttons, cards, modals, tables
│   ├── wallet/                  ← Privy setup, wallet hooks
│   ├── state/                   ← Zustand store utilities
│   └── api/                     ← API client helpers
│
└── docs/                        ← Documentation
```

---

## How Packages Work

**Packages are folders of reusable code that any part of the app can import.**

### Shared Packages (used everywhere)

| Package | What's Inside | Used For |
|---------|---------------|----------|
| `@bond/ui` | Button, Card, Modal, Table, Input, theme config | Consistent design across all pages |
| `@bond/wallet` | Privy provider, wallet hooks, chain config | One wallet connection for entire app |
| `@bond/state` | Store creation utilities | Consistent state management |
| `@bond/api` | Fetch helpers, error handling | Talking to backend APIs |

### Product Packages (one per DeFi product)

| Package | Source | Contains |
|---------|--------|----------|
| `@bond/trade` | Perpdex | Order panel, orderbook, chart, positions table |
| `@bond/swap` | Jaine | Swap panel, pool list, liquidity manager |
| `@bond/lend` | New (Zerrow spec) | Action box, supply/borrow tables, health indicator |
| `@bond/predict` | Prediction Market | Event cards, order panel, leaderboard |

---

## Wallet Strategy: Privy Embedded Wallets

### The Problem with Traditional Wallets
- User clicks "Trade" → MetaMask popup → "Approve" → Another popup → "Confirm"
- Terrible UX, users abandon

### Our Solution: Privy Embedded Wallets
- User logs in with **email or Google** (no MetaMask needed)
- Privy creates a wallet **for them** automatically
- App signs transactions **on their behalf** (no popups!)
- Feels like a normal Web2 app

### How It Works
1. User clicks "Login" → enters email → verifies
2. Privy creates an embedded wallet (user never sees seed phrase)
3. User clicks "Place Order" → transaction happens instantly
4. No approval popups, no MetaMask, no friction

### For Power Users
Users who want to use their own MetaMask/Rabby can still connect externally.

---

## Multi-Chain Support

Bond is chain-agnostic. Users can switch between supported chains, and all modules adapt.

### How It Works

1. **Chain Registry**: Central list of supported chains with their config
2. **Chain Switcher**: UI component in header to switch chains
3. **Chain-Aware Contracts**: Each module stores contract addresses per chain
4. **Auto-Reload**: When chain switches, positions/balances reload for new chain

### Supported Chains (Initial)

| Chain | Type | Status |
|-------|------|--------|
| 0G Mainnet | Production | Primary |
| 0G Testnet | Testing | Development |
| (More TBD) | - | Future |

### Adding a New Chain

To add a new chain, update the chain registry in `@bond/wallet`:
1. Add chain config (ID, name, RPC, explorer)
2. Add contract addresses for each module
3. Chain automatically appears in switcher

### Contract Address Structure

Each module has contracts per chain:
```
Trade Module:
  - 0G Mainnet: 0x123...
  - 0G Testnet: 0x456...

Swap Module:
  - 0G Mainnet: 0xabc...
  - 0G Testnet: 0xdef...
```

---

## Page Routing

Each product module has its own section of the app:

| URL | Module | Layout |
|-----|--------|--------|
| `/trade` | Trade | Trading layout with chart |
| `/portfolio` | Trade | Positions and history |
| `/swap` | Swap | Swap interface |
| `/pools` | Swap | Liquidity pools |
| `/lend` | Lend | Supply/borrow interface |
| `/markets` | Predict | Event listings |
| `/event/[ticker]` | Predict | Individual event page |
| `/dashboard` | Global | Unified portfolio across all products |

---

## State Management

Each product module has its own isolated state that doesn't conflict with others.

| Module | Stores | Persisted? |
|--------|--------|------------|
| Trade | Order form, positions, chart settings | Chart settings only |
| Swap | Swap form, selected tokens, slippage | Token preferences |
| Lend | Supply amounts, borrow amounts | None |
| Predict | Selected markets, order form | Market favorites |
| Global | UI preferences, theme, notifications | All |

---

## Migration Plan

### From Perpdex → `@bond/trade`
1. Copy components to `packages/trade/`
2. Replace wallet code with `@bond/wallet`
3. Split global store into focused stores
4. Update imports

### From Jaine → `@bond/swap`
1. Copy components to `packages/swap/`
2. Convert from Vite to Next.js compatible
3. Replace `@phongjimmy/wallet` with `@bond/wallet`
4. Keep `@zer0dex/sdk` for AMM logic

### Building `@bond/lend` (New)
1. Build from scratch based on AAVE comparison doc
2. Implement Action Box component
3. Build supply/borrow tables
4. Add health factor monitoring

### From Prediction Market → `@bond/predict`
1. Copy components to `packages/predict/`
2. Already uses Privy - move config to shared wallet
3. Connect to real backend (currently mock data)
4. Integrate with Bond theme

---

## Design System

### Colors
- **Background**: Dark theme (#0d0d0d, #141414, #1f1f1f)
- **Primary**: Blue accent (#3b82f6)
- **Success/Long**: Green (#22c55e)
- **Error/Short**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)

### Typography
- **Sans**: Inter
- **Mono**: JetBrains Mono (for numbers/prices)

### Component Style
- Rounded corners (medium radius)
- Subtle borders
- Consistent padding/spacing from Mantine

---

## Environment Variables

```
NEXT_PUBLIC_PRIVY_APP_ID        → Privy app ID for wallet
NEXT_PUBLIC_TRADE_API_URL       → Trading backend URL
NEXT_PUBLIC_SWAP_API_URL        → Swap backend URL
NEXT_PUBLIC_LEND_API_URL        → Lending backend URL
NEXT_PUBLIC_PREDICT_API_URL     → Prediction market backend URL
```

Plus contract addresses for each module.

---

## Deployment

- **Platform**: Vercel
- **Build**: Turborepo builds all packages, then the web app
- **Preview**: Each PR gets a preview deployment
- **Production**: Merges to main auto-deploy

---

## Summary

1. **One app, four products** - users visit bond.app and access everything
2. **Shared components** - buttons, modals, wallet work the same everywhere
3. **Privy for auth** - email login, no MetaMask popups
4. **Multi-chain** - switch chains, everything adapts
5. **Isolated modules** - each product's code is separate but shares infrastructure
6. **Monorepo** - all code in one repo, easy to make cross-cutting changes

---

*This document will be updated as implementation progresses.*
