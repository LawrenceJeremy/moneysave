import { useState } from "react";
import { Wallet, Transaction } from "@/types/wallet";
import { v4 as uuidv4 } from "uuid"; // for unique ids

export const useWallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  const addWallet = (name: string) => {
    const newWallet: Wallet = { id: uuidv4(), name, balance: 0, transactions: [] };
    setWallets([...wallets, newWallet]);
  };

  const selectWallet = (id: string) => setSelectedWalletId(id);

  const deposit = (amount: number) => {
    if (!selectedWalletId) return;

    setWallets(wallets.map((wallet) => {
      if (wallet.id === selectedWalletId) {
        const newTransaction: Transaction = { id: uuidv4(), amount, date: new Date().toISOString() };
        return {
          ...wallet,
          balance: wallet.balance + amount,
          transactions: [...wallet.transactions, newTransaction],
        };
      }
      return wallet;
    }));
  };

  const selectedWallet = wallets.find(w => w.id === selectedWalletId) || null;

  return {
    wallets,
    selectedWallet,
    selectedWalletId,
    addWallet,
    selectWallet,
    deposit,
  };
};
