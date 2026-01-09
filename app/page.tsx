"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { CirclePlus } from "lucide-react";

type Wallet = {
  id: number;
  label: string;
  money: number;
  due_date: string;
};

export default function page() {
  const [wallets, setWallets] = useState<Wallet[]>([]); // start empty
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Handle Add Wallet
  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newWallet: Wallet = {
      id: Date.now(), // unique id
      label: formData.get("label") as string,
      money: Number(formData.get("money")),
      due_date: formData.get("due_date") as string,
    };

    setWallets((prev) => [...prev, newWallet]);
    setIsAddDialogOpen(false);
  };

  // Handle Edit Wallet
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedWallet) return;

    const formData = new FormData(e.currentTarget);
    const updatedWallet: Wallet = {
      ...selectedWallet,
      label: formData.get("label") as string,
      money: Number(formData.get("money")),
      due_date: formData.get("due_date") as string,
    };

    setWallets((prev) =>
      prev.map((w) => (w.id === updatedWallet.id ? updatedWallet : w))
    );

    setSelectedWallet(null);
  };

  return (
    <div>
      {/* Record Track */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl">Record Track</h2>
        <Skeleton className="w-6xl h-96" />
      </div>

      {/* Budgets */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl">My Wallet</h2>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <CirclePlus />
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {wallets.length === 0 ? (
            <p className="text-gray-500 italic">
              No wallets yet. Click the + button to add your first wallet!
            </p>
          ) : (
            wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex-shrink-0 w-60 h-40 border border-slate-200 rounded-2xl p-4 cursor-pointer"
                onClick={() => setSelectedWallet(wallet)}
              >
                <h3 className="text-xl font-semibold truncate">
                  {wallet.label}
                </h3>
                <span className="text-lg font-bold">{wallet.money}</span>
                <p className="text-sm">
                  Due Date: <br />
                  {wallet.due_date}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Wallet Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
              <DialogDescription>
                Fill out the form to add a wallet
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <input
                type="text"
                name="label"
                placeholder="Label"
                className="border rounded p-2"
                required
              />
              <input
                type="number"
                name="money"
                placeholder="Amount"
                className="border rounded p-2"
                required
              />
              <input
                type="date"
                name="due_date"
                className="border rounded p-2"
                required
              />
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Wallet Dialog */}
        <Dialog
          open={!!selectedWallet}
          onOpenChange={() => setSelectedWallet(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedWallet ? `Edit ${selectedWallet.label}` : "Wallet"}
              </DialogTitle>
              <DialogDescription>
                Update the wallet info below
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="label"
                defaultValue={selectedWallet?.label}
                placeholder="Label"
                className="border rounded p-2"
              />
              <input
                type="number"
                name="money"
                defaultValue={selectedWallet?.money}
                placeholder="Amount"
                className="border rounded p-2"
              />
              <input
                type="date"
                name="due_date"
                defaultValue={selectedWallet?.due_date}
                className="border rounded p-2"
              />
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Form Validation */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl">Receipt Form</h2>
        <div className="flex gap-12">
          <div className="flex-1">
            <Skeleton className="w-full min-h-[24rem]" />
          </div>
          <div className="w-80">
            <Skeleton className="w-full min-h-[24rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
