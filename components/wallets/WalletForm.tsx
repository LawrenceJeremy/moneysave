"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WalletFormProps {
  onAddWallet: (name: string) => void;
}

export const WalletForm = ({ onAddWallet }: WalletFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddWallet(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input placeholder="Wallet Name" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit">Add Wallet</Button>
    </form>
  );
};
