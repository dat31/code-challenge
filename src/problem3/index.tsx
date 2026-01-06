import React, { PropsWithChildren, useMemo } from 'react';

type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter(b => b.amount > 0 && PRIORITY_MAP[b.blockchain] !== undefined)
      .map(b => ({
        ...b,
        priority: PRIORITY_MAP[b.blockchain],
        formatted: b.amount.toFixed(2),
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  const rows = useMemo(() => {
    return sortedBalances.map(balance => {
      const usdValue = prices[balance.currency] * balance.amount;

      return (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [sortedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

// mock
function useWalletBalances(): WalletBalance[] {
  return [];
}

function usePrices(): Record<string, number> {
  return {};
}

function WalletRow({ amount, usdValue, formattedAmount }: { amount: number, usdValue: number, formattedAmount: string }) {
  return (
    <div>
      <div>{amount}</div>
      <div>{usdValue}</div>
      <div>{formattedAmount}</div>
    </div>
  )
}

export default WalletPage;