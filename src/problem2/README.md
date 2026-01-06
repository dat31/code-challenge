# Problem 2 - Token Swap Application

A modern React-based token swap interface built with TypeScript, featuring form validation, infinite scrolling, and a pixel-art inspired UI design.

## 🚀 Core Technologies

### Build Tools & Framework
- **Vite** (`^7.2.4`) - Next-generation frontend build tool providing fast HMR and optimized production builds
- **React** (`^19.2.0`) - Modern UI library with latest features including StrictMode
- **TypeScript** (`~5.9.3`) - Type-safe JavaScript with strict type checking
- **@vitejs/plugin-react** (`^5.1.1`) - Vite plugin for React with Fast Refresh support

### Styling
- **Tailwind CSS** (`^4.1.18`) - Utility-first CSS framework
- **@tailwindcss/vite** (`^4.1.18`) - Vite plugin for Tailwind CSS v4
- **tw-animate-css** (`^1.4.0`) - Additional Tailwind animation utilities
- **tailwind-merge** (`^3.4.0`) - Utility to merge Tailwind CSS classes intelligently
- **clsx** (`^2.1.1`) - Utility for constructing className strings conditionally

## 📦 Production Dependencies

### UI Component Libraries
- **@radix-ui/react-dialog** (`^1.1.15`) - Accessible dialog/modal component primitives
- **@radix-ui/react-label** (`^2.1.8`) - Accessible label component
- **@radix-ui/react-slot** (`^1.2.4`) - Flexible component composition utility
- **lucide-react** (`^0.562.0`) - Beautiful icon library with React components

### Form Management & Validation
- **react-hook-form** (`^7.70.0`) - Performant form library with minimal re-renders
- **@hookform/resolvers** (`^5.2.2`) - Validation resolver adapters for react-hook-form
- **zod** (`^4.3.4`) - TypeScript-first schema validation library

### State Management & Data Fetching
- **@tanstack/react-query** (`^5.90.16`) - Powerful data synchronization library for React
  - Used for server state management
  - Implements infinite queries for paginated token data
  - Provides caching, background updates, and error handling

### Performance Optimization
- **react-virtualized** (`^9.22.6`) - Efficient rendering of large lists using windowing/virtualization
  - Used in TokenSelector for rendering large token lists
  - Implements AutoSizer and List components for optimal performance

### Utility Libraries
- **lodash** (`^4.17.21`) - JavaScript utility library
  - Used for functions like `isEmpty`, `noop`, `chain` for data manipulation
- **class-variance-authority** (`^0.7.1`) - Utility for building component variants

### Error Handling
- **react-error-boundary** (`^6.0.1`) - React error boundary component for graceful error handling

## 🛠️ Development Dependencies

### Linting & Code Quality
- **ESLint** (`^9.39.1`) - JavaScript/TypeScript linter
- **@eslint/js** (`^9.39.1`) - ESLint JavaScript configuration
- **typescript-eslint** (`^8.46.4`) - TypeScript-specific ESLint rules
- **eslint-plugin-react-hooks** (`^7.0.1`) - ESLint rules for React Hooks
- **eslint-plugin-react-refresh** (`^0.4.24`) - ESLint plugin for React Fast Refresh
- **eslint-plugin-simple-import-sort** (`^12.1.1`) - Automatic import sorting

### Type Definitions
- **@types/react** (`^19.2.5`) - TypeScript definitions for React
- **@types/react-dom** (`^19.2.3`) - TypeScript definitions for React DOM
- **@types/lodash** (`^4.17.21`) - TypeScript definitions for Lodash
- **@types/react-virtualized** (`^9.22.3`) - TypeScript definitions for react-virtualized
- **@types/node** (`^24.10.1`) - TypeScript definitions for Node.js

### Configuration
- **globals** (`^16.5.0`) - Global variables for ESLint

## 🏗️ Architecture & Patterns

### Project Structure
The project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── providers/      # Context providers (QueryClientProvider)
│   └── ui/             # shadcn/ui components (button, dialog, form, etc.)
├── features/           # Feature modules
│   └── swap/           # Swap feature
│       ├── components/ # Feature-specific components
│       └── validator/  # Feature-specific validation schemas
├── hooks/              # Custom React hooks
├── services/           # API/data services
├── models/             # TypeScript types and Zod schemas
├── configs/            # Configuration files (logger, env)
└── lib/                # Utility functions
```

### Design Patterns

#### 1. **Component Composition**
- Uses Radix UI primitives for accessible, composable components
- Implements shadcn/ui component pattern with `cn()` utility for class merging

#### 2. **Custom Hooks Pattern**
- `useTokenInfiniteQuery` - Encapsulates infinite query logic with custom query key factory
- Follows React Query best practices for data fetching

#### 3. **Form Management Pattern**
- Uses `react-hook-form` with `FormProvider` for form state management
- Integrates Zod validation via `@hookform/resolvers/zod`
- Implements controlled components with `useWatch` for reactive updates

#### 4. **Error Boundary Pattern**
- Implements React Error Boundary at the app level
- Provides fallback UI and error recovery mechanism

#### 5. **Service Layer Pattern**
- Separates data fetching logic into service modules
- Uses Zod schemas for runtime type validation of API responses

#### 6. **Virtualization Pattern**
- Implements windowing for large lists using `react-virtualized`
- Optimizes rendering performance for token selector with infinite scroll

### Key Techniques

#### Type Safety
- **Zod Schemas**: Runtime validation with TypeScript type inference
  - `TokenSchema` for token data validation
  - `SwapFormSchema` for form validation
- **Type Inference**: Uses `z.infer<>` to derive TypeScript types from Zod schemas

#### Performance Optimization
- **React.memo**: Memoizes TokenSelector component to prevent unnecessary re-renders
- **useCallback**: Memoizes event handlers and render functions
- **useMemo**: Memoizes computed values (flattened token pages)
- **Virtual Scrolling**: Renders only visible items in large lists
- **Infinite Queries**: Loads data incrementally as user scrolls

#### State Management
- **React Query**: Manages server state with automatic caching and refetching
- **React Hook Form**: Manages form state with minimal re-renders
- **Local State**: Uses `useState` for component-specific UI state

#### Path Aliases
- Configured `@/*` alias in `tsconfig.json` and `vite.config.ts`
- Enables clean imports: `@/components`, `@/hooks`, `@/services`

## 🎨 UI Component System

### shadcn/ui Integration
The project uses **shadcn/ui** component system:
- Configured via `components.json`
- Uses "new-york" style variant
- Components located in `src/components/ui/`
- Includes: Button, Dialog, Form, Input, Label, Textarea, InputGroup

### Styling Approach
- **Tailwind CSS**: Utility-first styling with custom pixel-art theme
- **CSS Variables**: Uses CSS variables for theming (configured in shadcn/ui)
- **Custom Classes**: Pixel-art inspired design with classes like `pixel-block`, `pixel-button`, `pixel-text`
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📝 Code Quality

### Linting Configuration
- **ESLint Flat Config**: Modern ESLint configuration format
- **TypeScript ESLint**: Type-aware linting rules
- **React Hooks Rules**: Enforces Rules of Hooks
- **Import Sorting**: Automatic import organization with `simple-import-sort`

### TypeScript Configuration
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: Configured for `@/*` imports
- **Project References**: Separate configs for app and node environments

## 🔧 Development Scripts

```bash
pnpm dev      # Start development server with HMR
pnpm build    # Build for production (TypeScript check + Vite build)
pnpm lint     # Run ESLint
pnpm preview  # Preview production build
```

## 📋 Package Manager

- **pnpm** (`10.11.0`) - Fast, disk space efficient package manager
- Lock file: `pnpm-lock.yaml`

## 🌟 Key Features

1. **Token Swap Interface**: Interactive form for swapping tokens
2. **Infinite Scroll**: Efficient loading of token lists
3. **Form Validation**: Real-time validation with Zod schemas
4. **Virtual Scrolling**: Performance optimization for large datasets
5. **Error Handling**: Graceful error boundaries
6. **Type Safety**: End-to-end TypeScript with runtime validation
7. **Responsive Design**: Mobile-friendly pixel-art UI

## 🔍 Notable Implementation Details

- **Auto-selection**: Automatically selects first token when list loads
- **Token Exclusion**: Prevents selecting the same token for both sides
- **Real-time Calculation**: Automatically calculates swap amounts based on token prices
- **Search Functionality**: Filters tokens as user types
- **Reverse Swap**: One-click button to swap from/to tokens
