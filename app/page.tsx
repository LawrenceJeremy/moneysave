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
import { Label } from "@/components/ui/label";

type Wallet = {
  id: number;
  label: string;
  money: number;
  due_date: string;
};

type MyWallet = {
  id: number;
  name: string;
  amount: number;
  due_date: string;
};

export default function page() {
  const [formWallet, setFormWallet] = useState<MyWallet[]>([]); // create
  const [selectwallet, setSelectWallet] = useState<MyWallet | null>(null); // read
  const [toggle, setToggle] = useState(false); // toggle
  const [walletToggle, setWalletToggle] = useState(false); // toggle

  // Create
  const newWallet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formWallet) return;

    const formData = new FormData(e.currentTarget);
    const myWallet: MyWallet = {
      id: Date.now(),
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      due_date: formData.get("due_date") as string,
    };

    setFormWallet((prev) => [...prev, myWallet]);
    setWalletToggle(false);
  };

  // Update
  const updateWallet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectwallet) return;

    const formData = new FormData(e.currentTarget);
    const updateForm: MyWallet = {
      ...selectwallet,
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      due_date: formData.get("due_date") as string,
    };

    setFormWallet((prev) =>
      prev.map((w) => (w.id === updateForm.id ? updateForm : w))
    );
    setSelectWallet(null);
  };

  return (
    <div>
      {/* Record Track */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl">Track Record</h2>
        <div className="w-6xl h-96 space-y-8">
          {formWallet.map((wallet) => (
            <div key={wallet.id} className="w-64 h-32 border rounded-2xl p-4">
              <h3>{wallet.name}</h3>
              <span>{wallet.amount}</span>
              <p>{wallet.due_date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={toggle} onOpenChange={setToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Wallet</DialogTitle>
            <DialogDescription>
              Fill out the form to add a wallet
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={newWallet}>
            <Label>Name</Label>
            <input
              type="text"
              name="name"
              placeholder="Untitled"
              className="border rounded p-2"
              required
            />
            <Label>Amount</Label>
            <input
              type="number"
              name="amount"
              placeholder="Untitled"
              className="border rounded p-2"
              required
            />
            <Label>Due Date</Label>
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

      {/* Budgets */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl">My Wallet</h2>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => setWalletToggle(true)}
          >
            <CirclePlus />
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {formWallet.length === 0 ? (
            <p className="text-gray-500 italic">
              No wallets yet. Click the + button to add your first wallet!
            </p>
          ) : (
            formWallet.map((wallet) => (
              <div
                key={wallet.id}
                className="flex-shrink-0 w-60 h-40 border border-slate-200 rounded-2xl p-4 cursor-pointer"
                onClick={() => setSelectWallet(wallet)}
              >
                <h3 className="text-xl font-semibold truncate">
                  {wallet.name}
                </h3>
                <span className="text-lg font-bold">{wallet.amount}</span>
                <p className="text-sm">
                  Due Date: <br />
                  {wallet.due_date}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Wallet Dialog */}
        <Dialog open={walletToggle} onOpenChange={setWalletToggle}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
              <DialogDescription>
                Fill out the form to add a wallet
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-4" onSubmit={newWallet}>
              <Label>Name</Label>
              <input
                type="text"
                name="name"
                placeholder="Untitled"
                className="border rounded p-2"
                required
              />
              <Label>Amount</Label>
              <input
                type="number"
                name="amount"
                placeholder="Untitled"
                className="border rounded p-2"
                required
              />
              <Label>Due Date</Label>
              <input
                type="date"
                name="due_date"
                className="border rounded p-2"
                required
              />
              <DialogFooter>
                <Button type="submit" className="w-full">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Wallet Dialog */}
        <Dialog
          open={!!selectwallet}
          onOpenChange={() => setSelectWallet(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectwallet ? `Edit ${selectwallet.name}` : "Wallet"}
              </DialogTitle>
              <DialogDescription>
                Update the wallet info below
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-4" onSubmit={updateWallet}>
              <input
                type="text"
                name="name"
                defaultValue={selectwallet?.name}
                placeholder="Label"
                className="border rounded p-2"
              />
              <input
                type="number"
                name="amount"
                defaultValue={selectwallet?.amount}
                placeholder="Amount"
                className="border rounded p-2"
              />
              <input
                type="date"
                name="due_date"
                defaultValue={selectwallet?.due_date}
                className="border rounded p-2"
              />
              <DialogFooter>
                <Button type="submit" className="w-full">Save</Button>
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
