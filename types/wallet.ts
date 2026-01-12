// A wallet entity
export type Wallet = {
  id: string;               // unique id
  name: string;             // wallet name
  balance: number;          // current balance
  transactions: Transaction[];
};

// A transaction entity (immutable)
export type Transaction = {
  id: string;
  amount: number;
  date: string;             // ISO string
};
