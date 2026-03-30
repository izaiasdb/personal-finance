import React from "react";
import { TotalsItem } from "../../../Models/Finance";

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export type SectionHeaderProps = {
  title: string;
  description: string;
};

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export type LabeledInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  maxLength?: number;
  min?: number;
  step?: string;
};

export const LabeledInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  min,
  step,
}: LabeledInputProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        step={step}
      />
    </label>
  );
};

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type LabeledSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export const LabeledSelect = ({ label, value, onChange, options }: LabeledSelectProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export type DataTableProps = {
  children: React.ReactNode;
  className?: string;
};

export const DataTable = ({ children, className = "" }: DataTableProps) => {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">{children}</table>
      </div>
    </div>
  );
};

type TableTextProps = {
  children: React.ReactNode;
  className?: string;
};

export const Th = ({ children, className = "" }: TableTextProps) => {
  return (
    <th className={`bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ${className}`}>
      {children}
    </th>
  );
};

export const Td = ({ children, className = "" }: TableTextProps) => {
  return <td className={`px-4 py-3 text-slate-700 ${className}`}>{children}</td>;
};

export type EmptyRowProps = {
  colSpan: number;
  label: string;
};

export const EmptyRow = ({ colSpan, label }: EmptyRowProps) => {
  return (
    <tr>
      <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={colSpan}>
        {label}
      </td>
    </tr>
  );
};

export type TotalsTableRow = {
  key: number;
  label: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type TotalsTableProps = {
  rows: TotalsTableRow[];
  grandTotal: TotalsItem;
  emptyLabel: string;
};

export const TotalsTable = ({ rows, grandTotal, emptyLabel }: TotalsTableProps) => {
  return (
    <DataTable className="mt-6">
      <thead>
        <tr>
          <Th>Descricao</Th>
          <Th className="text-right">Receitas</Th>
          <Th className="text-right">Despesas</Th>
          <Th className="text-right">Saldo</Th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <EmptyRow colSpan={4} label={emptyLabel} />
        ) : (
          rows.map((row) => (
            <tr key={row.key} className="border-t border-slate-100">
              <Td>{row.label}</Td>
              <Td className="text-right font-medium text-emerald-700">
                {currencyFormatter.format(row.totalIncome)}
              </Td>
              <Td className="text-right font-medium text-rose-700">
                {currencyFormatter.format(row.totalExpense)}
              </Td>
              <Td className="text-right font-semibold text-slate-900">
                {currencyFormatter.format(row.balance)}
              </Td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        <tr className="border-t border-slate-200 bg-slate-50">
          <Td className="font-semibold">Total geral</Td>
          <Td className="text-right font-semibold text-emerald-700">
            {currencyFormatter.format(grandTotal.totalIncome)}
          </Td>
          <Td className="text-right font-semibold text-rose-700">
            {currencyFormatter.format(grandTotal.totalExpense)}
          </Td>
          <Td className="text-right font-semibold text-slate-900">
            {currencyFormatter.format(grandTotal.balance)}
          </Td>
        </tr>
      </tfoot>
    </DataTable>
  );
};
