export enum CategoryPurpose {
  Expense = 1,
  Income = 2,
  Both = 3,
}

export enum TransactionType {
  Expense = 1,
  Income = 2,
}

export type Person = {
  id: number;
  name: string;
  age: number;
};

export type Category = {
  id: number;
  description: string;
  purpose: CategoryPurpose;
};

export type FinancialTransaction = {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  categoryId: number;
  categoryDescription: string;
  personId: number;
  personName: string;
};

export type TotalsItem = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type PersonTotals = TotalsItem & {
  personId: number;
  personName: string;
};

export type CategoryTotals = TotalsItem & {
  categoryId: number;
  categoryDescription: string;
};

export type ReportResponse<T> = {
  items: T[];
  grandTotal: TotalsItem;
};

export type PersonPayload = {
  name: string;
  age: number;
};

export type CategoryPayload = {
  description: string;
  purpose: CategoryPurpose;
};

export type TransactionPayload = {
  description: string;
  value: number;
  type: TransactionType;
  categoryId: number;
  personId: number;
};