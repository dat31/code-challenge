# WalletPage Code Review – Inefficiencies & Issues Analysis

This document reviews the provided React + TypeScript code and highlights:

- Logic bugs
- Computational inefficiencies
- React anti-patterns
- TypeScript issues **present in the sample code**
- Suggested modeling improvement (not originally present in the code)

---

## 1. Issues Found in the Provided Code

### 1.1 Missing Property on Interface

```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
```

Later usage:

```ts
getPriority(balance.blockchain)
```

❌ `blockchain` does not exist on `WalletBalance`  
✔ This is a **real TypeScript error in the sample code**

---

### 1.2 Usage of `any`

```ts
const getPriority = (blockchain: any): number => {}
```

❌ Disables type safety  
❌ Allows invalid values  
❌ Undermines TypeScript guarantees

---

### 1.3 Broken Filter Logic (Critical Bug)

```ts
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {
```

❌ `lhsPriority` is undefined  
❌ Filter logic is incorrect and will fail at runtime

---

### 1.4 Incorrect Filtering Condition

```ts
if (balance.amount <= 0) {
  return true;
}
```

❌ Keeps zero and negative balances  
✔ Typically wallet UIs only show positive balances

---

### 1.5 Repeated Computation Inside `sort`

```ts
getPriority(lhs.blockchain)
getPriority(rhs.blockchain)
```

❌ `Array.sort` is `O(n log n)`  
❌ Priority is recomputed multiple times  
✔ Priority should be computed once per item

---

### 1.6 Incorrect `useMemo` Dependency Array

```ts
useMemo(() => { ... }, [balances, prices])
```

❌ `prices` is not referenced inside the memo  
❌ Causes unnecessary recomputation

---

### 1.7 Unused Computation

```ts
const formattedBalances = sortedBalances.map(...)
```

❌ Variable is never used  
❌ Wasted CPU work  
❌ Reduces readability

---

### 1.8 Incorrect Type Annotation in `map`

```ts
sortedBalances.map((balance: FormattedWalletBalance) => ...)
```

❌ `sortedBalances` contains `WalletBalance`  
❌ `formatted` does not exist  
💥 Runtime error risk

---

### 1.9 Using Array Index as React Key

```tsx
key={index}
```

❌ Causes reconciliation bugs when list order changes

---

### 1.10 Unstable Function Definition

```ts
const getPriority = () => {}
```

❌ Function is recreated on every render  
❌ Can break memoization assumptions

---

## 2. Suggested Type Modeling Improvement

> ⚠️ This section describes a **recommended improvement**,  
> not an anti-pattern found in the original snippet.

The sample code does **not** incorrectly use `extends` between balance types.  
However, during refactoring, it is important **not to introduce** a common modeling mistake.

### ❌ Modeling to Avoid (example)

```ts
interface WalletBalance extends BaseBalance {
  blockchain: string;
}

interface FormattedBalance extends WalletBalance {
  formatted: string;
}
```

Why this is discouraged:

- `WalletBalance` is a domain model
- `formatted` is a UI concern
- Inheritance couples UI logic to business data

---

### ✅ Recommended Model

```ts
interface BaseBalance {
  currency: string;
  amount: number;
}

interface WalletBalance extends BaseBalance {
  blockchain: Blockchain;
}

interface FormattedBalance extends BaseBalance {
  formatted: string;
}
```

Benefits:

- Clear separation of concerns
- Cleaner architecture
- Safer refactors
- Easier testing

---

## 3. Refactored Example (Correct & Efficient)

### Types & Constants

```ts
type Blockchain =
  | 'Osmosis'
  | 'Ethereum'
  | 'Arbitrum'
  | 'Zilliqa'
  | 'Neo';

const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};
```

---

### Normalization, Filtering & Sorting

```ts
const sortedBalances = useMemo(() => {
  return balances
    .filter(
      (b) =>
        b.amount > 0 &&
        PRIORITY_MAP[b.blockchain] !== undefined
    )
    .map((b) => ({
      ...b,
      priority: PRIORITY_MAP[b.blockchain],
    }))
    .sort((a, b) => b.priority - a.priority);
}, [balances]);
```

---

### UI Formatting (Presentation Layer)

```ts
const rows = useMemo(() => {
  return sortedBalances.map((balance) => {
    const formatted: FormattedBalance = {
      currency: balance.currency,
      amount: balance.amount,
      formatted: balance.amount.toFixed(2),
    };

    const usdValue =
      prices[formatted.currency] * formatted.amount;

    return (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`}
        amount={formatted.amount}
        formattedAmount={formatted.formatted}
        usdValue={usdValue}
      />
    );
  });
}, [sortedBalances, prices]);
```

---

## 4. Key Takeaways

- Fix **actual bugs** before refactoring
- Avoid `any`
- Do not recompute inside `sort`
- Use stable React keys
- Keep formatting in the UI layer
- Avoid introducing UI fields into domain models

---

