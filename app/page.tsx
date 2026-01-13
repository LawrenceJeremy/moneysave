"use client";
import { WalletForm } from "@/components/wallets/WalletForm";
import { TransactionForm } from "@/components/wallets/TransactionForm";
import { WalletList } from "@/components/wallets/WalletList";
import { WalletDetail } from "@/components/wallets/WalletDetail";
import { useWallets } from "@/hooks/useWallets";

export default function WalletPage() {
  const {
    wallets,
    selectedWallet,
    selectedWalletId,
    addWallet,
    selectWallet,
    deposit,
  } = useWallets();

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <WalletForm onAddWallet={addWallet} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-1">
          <WalletList
            wallets={wallets}
            selectedWalletId={selectedWalletId}
            onSelectWallet={selectWallet}
          />
        </div>

        <div className="w-full lg:flex-1 space-y-4">
          <TransactionForm onDeposit={deposit} />
          <WalletDetail wallet={selectedWallet} />
        </div>
      </div>
    </div>
  );
}
