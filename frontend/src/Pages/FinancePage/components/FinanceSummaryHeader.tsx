import React from "react";

type FinanceSummaryHeaderProps = {
  peopleCount: number;
  categoriesCount: number;
  transactionsCount: number;
  totalBalance: string;
};

type SummaryCardProps = {
  label: string;
  value: string;
};

const SummaryCard = ({ label, value }: SummaryCardProps) => {
  return (
    <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-50">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
};

const FinanceSummaryHeader = ({
  peopleCount,
  categoriesCount,
  transactionsCount,
  totalBalance,
}: FinanceSummaryHeaderProps) => {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-emerald-100">Personal Finance</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Pessoas, categorias, transacoes e totais em uma unica visao.
          </h1>
          <p className="mt-3 text-sm text-emerald-50 sm:text-base">
            O frontend valida menor de idade, restringe categorias por finalidade e atualiza os totais apos cada operacao.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard label="Pessoas" value={String(peopleCount)} />
          <SummaryCard label="Categorias" value={String(categoriesCount)} />
          <SummaryCard label="Transacoes" value={String(transactionsCount)} />
          <SummaryCard label="Saldo geral" value={totalBalance} />
        </div>
      </div>
    </section>
  );
};

export default FinanceSummaryHeader;
