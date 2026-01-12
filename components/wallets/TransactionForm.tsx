"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionFormProps {
  onDeposit: (amount: number) => void;
}

export const TransactionForm = ({ onDeposit }: TransactionFormProps) => {
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    onDeposit(Number(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <Button type="submit">Deposit</Button>
    </form>
  );
};
