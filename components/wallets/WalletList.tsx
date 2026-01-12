"use client";
import { Wallet } from "@/types/wallet";
import { Button } from "@/components/ui/button";

interface WalletListProps {
  wallets: Wallet[];
  selectedWalletId: string | null;
  onSelectWallet: (id: string) => void;
}

export const WalletList = ({ wallets, selectedWalletId, onSelectWallet }: WalletListProps) => {
  return (
    <div className="space-y-2">
      {wallets.map(wallet => (
        <Button
          key={wallet.id}
          variant={wallet.id === selectedWalletId ? "default" : "outline"}
          onClick={() => onSelectWallet(wallet.id)}
          className="w-full flex justify-between"
        >
          <span>{wallet.name}</span>
          <span>${wallet.balance}</span>
        </Button>
      ))}
    </div>
  );
};
