# Bond Super App - Technical Architecture

**Version:** 1.0
**Date:** January 9, 2026
**Status:** Draft

---

## Table of Contents

1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Module Architecture](#4-module-architecture)
5. [Shared Packages](#5-shared-packages)
6. [State Management](#6-state-management)
7. [Routing Strategy](#7-routing-strategy)
8. [API & Data Layer](#8-api--data-layer)
9. [Wallet Integration](#9-wallet-integration)
10. [Build & Deployment](#10-build--deployment)
11. [Migration Guide](#11-migration-guide)

---

## 1. Overview

Bond Super App consolidates four DeFi frontends into a unified application using a **monorepo architecture** with shared packages for common functionality.

### Design Principles

1. **Module Isolation**: Each DeFi product is a self-contained package
2. **Shared Infrastructure**: Common UI, wallet, and state utilities
3. **Incremental Adoption**: Modules can be enabled/disabled independently
4. **Type Safety**: Full TypeScript coverage with strict mode
5. **Performance**: Code splitting, lazy loading, optimistic updates

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        apps/web (Next.js)                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     App Shell & Routing                   │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐  │  │
│  │  │  Trade  │ │  Swap   │ │  Lend   │ │     Predict     │  │  │
│  │  │ Routes  │ │ Routes  │ │ Routes  │ │     Routes      │  │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────────┬────────┘  │  │
│  └───────┼──────────┼──────────┼─────────────────┼───────────┘  │
│          │          │          │                 │               │
├──────────┼──────────┼──────────┼─────────────────┼───────────────┤
│          ▼          ▼          ▼                 ▼               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    packages/ (Shared)                       ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           ││
│  │  │packages/│ │packages/│ │packages/│ │packages/│           ││
│  │  │  trade  │ │  swap   │ │  lend   │ │ predict │           ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           ││
│  │                                                             ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           ││
│  │  │packages/│ │packages/│ │packages/│ │packages/│           ││
│  │  │   ui    │ │ wallet  │ │  state  │ │   api   │           ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Core Technologies

| Category | Technology | Version | Rationale |
|----------|------------|---------|-----------|
| **Framework** | Next.js | 16.x | App Router, SSR, industry standard |
| **Language** | TypeScript | 5.x | Type safety, DX |
| **UI Library** | Mantine | 8.x | Used by Perpdex/Jaine, comprehensive |
| **Styling** | Tailwind CSS | 4.x | Utility-first, fast iteration |
| **State** | Zustand | 5.x | Lightweight, already used |
| **Data Fetching** | TanStack Query | 5.x | Caching, background refresh |
| **Wallet** | Privy (Embedded) | 2.x | Embedded wallets, delegated signing |
| **Blockchain** | viem | 2.x | Type-safe EVM interactions |
| **Charts** | TradingView LW | 5.x | Professional trading charts |
| **Build** | Turborepo | 2.x | Monorepo caching |
| **Package Manager** | bun | 1.x | Fast installs, native TS |

### Development Tools

| Tool | Purpose |
|------|---------|
| Biome | Linting and formatting |
| Lefthook | Git hooks |
| Commitlint | Conventional commits |
| TypeScript | Type checking |

---

## 3. Monorepo Structure

```
bond-super-app/
├── apps/
│   └── web/                          # Main Next.js application
│       ├── src/
│       │   ├── app/                  # Next.js App Router
│       │   │   ├── (trade)/          # Trade module routes
│       │   │   │   ├── trade/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── portfolio/
│       │   │   │   ├── vaults/
│       │   │   │   ├── staking/
│       │   │   │   └── leaderboard/
│       │   │   ├── (swap)/           # Swap module routes
│       │   │   │   ├── swap/
│       │   │   │   ├── pools/
│       │   │   │   └── rewards/
│       │   │   ├── (lend)/           # Lend module routes
│       │   │   │   ├── lend/
│       │   │   │   └── portfolio/
│       │   │   ├── (predict)/        # Predict module routes
│       │   │   │   ├── markets/
│       │   │   │   ├── event/[ticker]/
│       │   │   │   └── profile/
│       │   │   ├── dashboard/        # Unified dashboard
│       │   │   ├── settings/         # App settings
│       │   │   ├── layout.tsx        # Root layout
│       │   │   └── page.tsx          # Landing page
│       │   ├── components/           # App-specific components
│       │   │   ├── Header/
│       │   │   ├── Navigation/
│       │   │   └── UnifiedPortfolio/
│       │   └── providers/            # Global providers
│       │       └── index.tsx
│       ├── public/
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── ui/                           # Shared UI components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Table/
│   │   │   │   ├── Input/
│   │   │   │   └── index.ts
│   │   │   ├── theme/
│   │   │   │   ├── tokens.ts
│   │   │   │   ├── mantine.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── wallet/                       # Wallet abstraction
│   │   ├── src/
│   │   │   ├── WalletProvider.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useWallet.ts
│   │   │   │   ├── useChain.ts
│   │   │   │   ├── useAccount.ts
│   │   │   │   └── useBalance.ts
│   │   │   ├── chains/
│   │   │   │   ├── 0g.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── state/                        # State utilities
│   │   ├── src/
│   │   │   ├── createModuleStore.ts
│   │   │   ├── persistMiddleware.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api/                          # API client
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── trade/                        # Trade module (from Perpdex)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── TradePanel/
│   │   │   │   ├── OrderBook/
│   │   │   │   ├── Chart/
│   │   │   │   ├── PositionsTable/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── swap/                         # Swap module (from Jaine)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── SwapPanel/
│   │   │   │   ├── PoolsList/
│   │   │   │   ├── LiquidityManager/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── lend/                         # Lend module (new, from Zerrow spec)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ActionBox/
│   │   │   │   ├── SupplyTable/
│   │   │   │   ├── BorrowTable/
│   │   │   │   ├── HealthIndicator/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── predict/                      # Predict module
│       ├── src/
│       │   ├── components/
│       │   │   ├── EventCard/
│       │   │   ├── OrderPanel/
│       │   │   ├── PriceChart/
│       │   │   ├── Leaderboard/
│       │   │   └── index.ts
│       │   ├── hooks/
│       │   ├── stores/
│       │   ├── types/
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── turbo.json                        # Turborepo config
├── package.json                      # Root package.json
├── tsconfig.json                     # Base TypeScript config
├── biome.json                        # Linting config
└── docs/                             # Documentation
    ├── PRD.md
    └── ARCHITECTURE.md
```

---

## 4. Module Architecture

### Module Structure Pattern

Each module package follows a consistent structure:

```
packages/{module}/
├── src/
│   ├── components/           # React components
│   │   ├── {Component}/
│   │   │   ├── index.tsx
│   │   │   ├── {Component}.tsx
│   │   │   └── {Component}.module.css
│   │   └── index.ts          # Re-exports
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── use{Hook}.ts
│   │   └── index.ts
│   │
│   ├── stores/               # Zustand stores
│   │   ├── {store}.ts
│   │   └── index.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── {util}.ts
│   │   └── index.ts
│   │
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   │
│   ├── config/               # Module configuration
│   │   └── index.ts
│   │
│   └── index.ts              # Public API
│
├── tsconfig.json
└── package.json
```

### Module Public API

Each module exports a clean public API:

```typescript
// packages/trade/src/index.ts
export { TradeProvider } from './providers/TradeProvider';
export { TradePanel } from './components/TradePanel';
export { OrderBook } from './components/OrderBook';
export { PositionsTable } from './components/PositionsTable';
export { useTradeStore } from './stores/trade';
export { usePositions } from './hooks/usePositions';
export type { Position, Order, Market } from './types';
```

### Module Provider Pattern

Each module provides a context provider for configuration:

```typescript
// packages/trade/src/providers/TradeProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { createTradeStore, TradeStore } from '../stores/trade';

interface TradeConfig {
  apiUrl: string;
  contracts: {
    deposit: `0x${string}`;
    // ...
  };
}

const TradeContext = createContext<TradeStore | null>(null);

export const TradeProvider = ({
  config,
  children
}: {
  config: TradeConfig;
  children: ReactNode;
}) => {
  const store = useMemo(() => createTradeStore(config), [config]);

  return (
    <TradeContext.Provider value={store}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) throw new Error('useTradeContext must be used within TradeProvider');
  return context;
};
```

---

## 5. Shared Packages

### 5.1 UI Package (`packages/ui`)

Shared UI components and theme configuration.

#### Theme Tokens

```typescript
// packages/ui/src/theme/tokens.ts
export const colors = {
  // Brand
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ...
    900: '#0c4a6e',
  },

  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',

  // Backgrounds
  background: {
    primary: '#0d0d0d',
    secondary: '#141414',
    tertiary: '#1f1f1f',
  },

  // Trading colors
  long: '#22c55e',
  short: '#ef4444',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
  },
};
```

#### Mantine Theme

```typescript
// packages/ui/src/theme/mantine.ts
import { createTheme, MantineColorsTuple } from '@mantine/core';
import { colors, spacing, typography } from './tokens';

export const bondTheme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: Object.values(colors.primary) as unknown as MantineColorsTuple,
  },
  fontFamily: typography.fontFamily.sans,
  fontFamilyMonospace: typography.fontFamily.mono,
  headings: {
    fontFamily: typography.fontFamily.sans,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        padding: 'lg',
      },
    },
  },
});
```

### 5.2 Wallet Package (`packages/wallet`)

Unified wallet connection with **Privy embedded wallets** and **delegated signing**.

#### Why Privy with Embedded Wallets?

- **No wallet popups**: Users sign in with email/social, Privy creates a wallet for them
- **Delegated signing**: App can sign transactions on behalf of users (no approval popups)
- **Session keys**: Users approve once, app handles subsequent transactions automatically
- **Better UX**: Trading feels like a Web2 app, not constant MetaMask popups

```typescript
// packages/wallet/src/WalletProvider.tsx
import { PrivyProvider } from '@privy-io/react-auth';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { zeroGMainnet, zeroGTestnet } from './chains';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [zeroGMainnet, zeroGTestnet],
  transports: {
    [zeroGMainnet.id]: http(),
    [zeroGTestnet.id]: http(),
  },
});

interface WalletProviderProps {
  children: React.ReactNode;
  appId: string; // Privy App ID
}

export const WalletProvider = ({ children, appId }: WalletProviderProps) => {
  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Embedded wallet config
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Auto-create for new users
          noPromptOnSignature: true, // Don't prompt for every signature
        },
        // Login methods
        loginMethods: ['email', 'google', 'twitter', 'wallet'],
        // Default chain
        defaultChain: zeroGMainnet,
        supportedChains: [zeroGMainnet, zeroGTestnet],
        // Appearance
        appearance: {
          theme: 'dark',
          accentColor: '#3b82f6',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
```

#### Delegated Signing (App as Signer)

The key feature: users approve a **session** once, and the app can sign transactions automatically.

```typescript
// packages/wallet/src/hooks/useDelegatedWallet.ts
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useMemo } from 'react';

export const useDelegatedWallet = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();

  // Get the embedded wallet (Privy-managed)
  const embeddedWallet = useMemo(
    () => wallets.find((w) => w.walletClientType === 'privy'),
    [wallets]
  );

  // Sign transaction WITHOUT user popup
  const signTransaction = async (tx: TransactionRequest) => {
    if (!embeddedWallet) throw new Error('No embedded wallet');

    // Get the provider - this is where the magic happens
    // Privy's embedded wallet signs automatically
    const provider = await embeddedWallet.getEthersProvider();
    const signer = provider.getSigner();

    // This signs WITHOUT showing a popup to the user
    return signer.sendTransaction(tx);
  };

  // Sign message WITHOUT user popup
  const signMessage = async (message: string) => {
    if (!embeddedWallet) throw new Error('No embedded wallet');
    const provider = await embeddedWallet.getEthersProvider();
    const signer = provider.getSigner();
    return signer.signMessage(message);
  };

  return {
    ready,
    authenticated,
    address: embeddedWallet?.address,
    user,
    login,
    logout,
    signTransaction,
    signMessage,
    embeddedWallet,
  };
};
```

#### Example: Auto-Signing Trade Orders

```typescript
// packages/trade/src/hooks/useSubmitOrder.ts
import { useDelegatedWallet } from '@bond/wallet';
import { encodeFunctionData } from 'viem';
import { orderAbi } from '../abis/order';

export const useSubmitOrder = () => {
  const { signTransaction, address } = useDelegatedWallet();

  const submitOrder = async (order: OrderParams) => {
    // Encode the contract call
    const data = encodeFunctionData({
      abi: orderAbi,
      functionName: 'placeOrder',
      args: [order.market, order.side, order.size, order.price],
    });

    // Sign and send - NO POPUP for user!
    const tx = await signTransaction({
      to: ORDER_CONTRACT_ADDRESS,
      data,
      value: 0n,
    });

    return tx.hash;
  };

  return { submitOrder };
};
```

#### Legacy Wallet Support

Users who prefer their own wallet (MetaMask, etc.) can still connect:

```typescript
// packages/wallet/src/hooks/useWallet.ts
import { usePrivy, useWallets } from '@privy-io/react-auth';

export const useWallet = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  // Prefer embedded, fallback to external
  const activeWallet = wallets.find(w => w.walletClientType === 'privy')
    ?? wallets[0];

  return {
    ready,
    authenticated,
    address: activeWallet?.address,
    isEmbedded: activeWallet?.walletClientType === 'privy',
    login,
    logout,
    user,
    wallets,
  };
};
```

### 5.3 State Package (`packages/state`)

Utilities for creating module-scoped Zustand stores.

```typescript
// packages/state/src/createModuleStore.ts
import { create, StateCreator, StoreApi } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ModuleStoreConfig<T> = {
  name: string;
  initialState: T;
  actions: (
    set: StoreApi<T>['setState'],
    get: StoreApi<T>['getState']
  ) => Record<string, (...args: any[]) => void>;
  persist?: boolean;
};

export const createModuleStore = <T extends object>({
  name,
  initialState,
  actions,
  persist: shouldPersist = false,
}: ModuleStoreConfig<T>) => {
  const storeCreator: StateCreator<T> = (set, get) => ({
    ...initialState,
    ...actions(set, get),
  });

  const withImmer = immer(storeCreator);

  if (shouldPersist) {
    return create(
      persist(withImmer, {
        name: `bond-${name}`,
        partialize: (state) => state,
      })
    );
  }

  return create(withImmer);
};
```

---

## 6. State Management

### Store Architecture

Each module has its own Zustand store, namespaced to avoid conflicts:

```
┌─────────────────────────────────────────────────────────────┐
│                      Bond State Tree                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ trade/      │ │ swap/       │ │ lend/       │           │
│  │ ├─ order    │ │ ├─ swap     │ │ ├─ supply   │           │
│  │ ├─ position │ │ ├─ pool     │ │ ├─ borrow   │           │
│  │ ├─ chart    │ │ └─ rewards  │ │ └─ health   │           │
│  │ └─ market   │ │             │ │             │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐                           │
│  │ predict/    │ │ global/     │                           │
│  │ ├─ markets  │ │ ├─ ui       │                           │
│  │ ├─ positions│ │ ├─ wallet   │                           │
│  │ └─ orders   │ │ └─ settings │                           │
│  └─────────────┘ └─────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Example Store Implementation

```typescript
// packages/trade/src/stores/order.ts
import { createModuleStore } from '@bond/state';

interface OrderState {
  // Form state
  side: 'long' | 'short';
  orderType: 'market' | 'limit' | 'stop';
  size: string;
  price: string;
  leverage: number;

  // Derived
  estimatedFee: number;
  estimatedPnL: number;

  // UI state
  isSubmitting: boolean;
  error: string | null;
}

const initialState: OrderState = {
  side: 'long',
  orderType: 'market',
  size: '',
  price: '',
  leverage: 1,
  estimatedFee: 0,
  estimatedPnL: 0,
  isSubmitting: false,
  error: null,
};

export const useOrderStore = createModuleStore({
  name: 'trade-order',
  initialState,
  actions: (set, get) => ({
    setSide: (side: 'long' | 'short') => set({ side }),
    setOrderType: (orderType: OrderState['orderType']) => set({ orderType }),
    setSize: (size: string) => set({ size }),
    setPrice: (price: string) => set({ price }),
    setLeverage: (leverage: number) => set({ leverage }),

    resetForm: () => set(initialState),

    submitOrder: async () => {
      set({ isSubmitting: true, error: null });
      try {
        // Submit order logic
      } catch (e) {
        set({ error: (e as Error).message });
      } finally {
        set({ isSubmitting: false });
      }
    },
  }),
  persist: false, // Don't persist order form
});
```

---

## 7. Routing Strategy

### Route Groups

Using Next.js route groups `(folder)` to organize modules:

```
app/
├── (trade)/              # Trade module group
│   ├── trade/
│   │   └── page.tsx      # /trade
│   ├── portfolio/
│   │   └── page.tsx      # /portfolio (trade context)
│   └── layout.tsx        # Trade-specific layout/providers
│
├── (swap)/               # Swap module group
│   ├── swap/
│   │   └── page.tsx      # /swap
│   ├── pools/
│   │   └── page.tsx      # /pools
│   └── layout.tsx
│
├── (lend)/               # Lend module group
│   ├── lend/
│   │   └── page.tsx      # /lend
│   └── layout.tsx
│
├── (predict)/            # Predict module group
│   ├── markets/
│   │   └── page.tsx      # /markets
│   ├── event/
│   │   └── [ticker]/
│   │       └── page.tsx  # /event/[ticker]
│   └── layout.tsx
│
├── dashboard/
│   └── page.tsx          # /dashboard (unified)
│
└── layout.tsx            # Root layout
```

### Route Group Layout Pattern

```typescript
// app/(trade)/layout.tsx
import { TradeProvider } from '@bond/trade';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = {
    apiUrl: process.env.NEXT_PUBLIC_TRADE_API_URL!,
    contracts: {
      deposit: process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT!,
    },
  };

  return (
    <TradeProvider config={config}>
      {children}
    </TradeProvider>
  );
}
```

### Navigation Configuration

```typescript
// apps/web/src/config/navigation.ts
export const navigation = [
  {
    label: 'Trade',
    href: '/trade',
    icon: 'chart-line',
    module: 'trade',
  },
  {
    label: 'Swap',
    href: '/swap',
    icon: 'arrows-exchange',
    module: 'swap',
  },
  {
    label: 'Lend',
    href: '/lend',
    icon: 'building-bank',
    module: 'lend',
  },
  {
    label: 'Predict',
    href: '/markets',
    icon: 'chart-pie',
    module: 'predict',
  },
  {
    label: 'Portfolio',
    href: '/dashboard',
    icon: 'wallet',
    module: null, // Global
  },
];
```

---

## 8. API & Data Layer

### API Client Architecture

```typescript
// packages/api/src/client.ts
import { QueryClient } from '@tanstack/react-query';

interface APIConfig {
  baseUrl: string;
  getAuthToken?: () => string | null;
}

export const createAPIClient = (config: APIConfig) => {
  const fetcher = async <T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> => {
    const token = config.getAuthToken?.();

    const response = await fetch(`${config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };

  return {
    get: <T>(endpoint: string) => fetcher<T>(endpoint),
    post: <T>(endpoint: string, data: unknown) =>
      fetcher<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    put: <T>(endpoint: string, data: unknown) =>
      fetcher<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: <T>(endpoint: string) =>
      fetcher<T>(endpoint, { method: 'DELETE' }),
  };
};
```

### Module-Specific API Integration

```typescript
// packages/trade/src/api/index.ts
import { createAPIClient } from '@bond/api';
import { useQuery, useMutation } from '@tanstack/react-query';

const api = createAPIClient({
  baseUrl: process.env.NEXT_PUBLIC_TRADE_API_URL!,
});

export const usePositions = (address: string) => {
  return useQuery({
    queryKey: ['positions', address],
    queryFn: () => api.get<Position[]>(`/positions/${address}`),
    enabled: !!address,
  });
};

export const useSubmitOrder = () => {
  return useMutation({
    mutationFn: (order: OrderParams) =>
      api.post<OrderResponse>('/orders', order),
  });
};
```

---

## 9. Wallet Integration

### Chain Configuration

```typescript
// packages/wallet/src/chains/0g.ts
import { defineChain } from 'viem';

export const zeroGMainnet = defineChain({
  id: 16600,
  name: '0G Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: '0G',
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc.0g.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: '0G Explorer',
      url: 'https://explorer.0g.ai',
    },
  },
});

export const zeroGTestnet = defineChain({
  id: 16601,
  name: '0G Galileo Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: '0G',
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
  },
  testnet: true,
});
```

### Contract Interactions

```typescript
// packages/trade/src/hooks/useDeposit.ts
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { depositAbi } from '../abis/deposit';

export const useDeposit = () => {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const deposit = async (amount: string, token: `0x${string}`) => {
    const value = parseUnits(amount, 6); // USDC decimals

    await writeContract({
      address: process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT as `0x${string}`,
      abi: depositAbi,
      functionName: 'depositCollateral',
      args: ['default', 0, value],
    });
  };

  return {
    deposit,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
};
```

---

## 10. Build & Deployment

### Turborepo Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Package.json Scripts

```json
// package.json (root)
{
  "name": "bond-super-app",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "format": "biome format --write .",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2.3.3",
    "@biomejs/biome": "^2.3.10",
    "typescript": "^5"
  }
}
```

### Environment Variables

```bash
# apps/web/.env.local

# Privy (Embedded Wallet)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Trade Module
NEXT_PUBLIC_TRADE_API_URL=https://api.trade.bond.app
NEXT_PUBLIC_DEPOSIT_CONTRACT=0x...
NEXT_PUBLIC_USDC_CONTRACT=0x...

# Swap Module
NEXT_PUBLIC_SWAP_API_URL=https://api.swap.bond.app
NEXT_PUBLIC_ROUTER_CONTRACT=0x...
NEXT_PUBLIC_FACTORY_CONTRACT=0x...

# Lend Module
NEXT_PUBLIC_LEND_API_URL=https://api.lend.bond.app
NEXT_PUBLIC_POOL_CONTRACT=0x...

# Predict Module
NEXT_PUBLIC_PREDICT_API_URL=https://api.predict.bond.app
```

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "turbo run build --filter=web",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs"
}
```

---

## 11. Migration Guide

### Migrating from Perpdex (Trade)

1. **Extract components** to `packages/trade/src/components/`
2. **Split global store** into module stores
3. **Replace chain config** with shared wallet package
4. **Update imports** to use `@bond/trade`

```typescript
// Before (Perpdex)
import { TradePanel } from '@/components/Trade';
import { useGlobalStore } from '@/stores/global';

// After (Bond)
import { TradePanel } from '@bond/trade';
import { useOrderStore } from '@bond/trade';
```

### Migrating from Jaine (Swap)

1. **Convert from Vite** to Next.js compatible
2. **Replace @phongjimmy/wallet** with Privy embedded wallet
3. **Keep @zer0dex/sdk** for AMM logic
4. **Modularize stores**

```typescript
// Before (Jaine)
import { useAccount } from '@phongjimmy/wallet';
import { SwapPanel } from './components/Swap';

// After (Bond)
import { useDelegatedWallet } from '@bond/wallet';
import { SwapPanel } from '@bond/swap';
```

### Building Lend (Zerrow)

Build from scratch based on AAVE comparison:

1. **Create ActionBox** component (mobile-first)
2. **Implement User Modes** (3 modes)
3. **Build Portfolio view**
4. **Add health monitoring**

### Migrating Prediction Market

1. **Keep Privy** - already using it, move config to shared wallet package
2. **Extract components** to package
3. **Connect to backend API** (currently mock)
4. **Integrate theme**

---

## Appendix: File Templates

### Package package.json

```json
{
  "name": "@bond/{module}",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "lint": "biome check src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@bond/ui": "workspace:*",
    "@bond/wallet": "workspace:*",
    "@bond/state": "workspace:*"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### Package tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

*This architecture document will be updated as the implementation progresses.*
