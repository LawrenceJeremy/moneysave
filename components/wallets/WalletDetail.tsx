"use client";
import { Wallet } from "@/types/wallet";

interface WalletDetailProps {
  wallet: Wallet | null;
}

export const WalletDetail = ({ wallet }: WalletDetailProps) => {
  if (!wallet) return <p>Select a wallet to see details</p>;

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">{wallet.name}</h2>
      <p>Balance: ${wallet.balance}</p>
      <h3 className="font-semibold">Transactions:</h3>
      <ul className="space-y-1">
        {wallet.transactions.map(t => (
          <li key={t.id}>
            {new Date(t.date).toLocaleString()} — ${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
