import React, { FormEvent } from "react";
import {
  Category,
  CategoryPurpose,
  FinancialTransaction,
  Person,
  TransactionPayload,
  TransactionType,
} from "../../../Models/Finance";
import {
  DataTable,
  EmptyRow,
  LabeledInput,
  LabeledSelect,
  SectionHeader,
  Td,
  Th,
} from "./FinanceUI";

type TransactionsSectionProps = {
  transactionForm: TransactionPayload;
  selectedPerson: Person | null;
  people: Person[];
  categories: Category[];
  allowedCategories: Category[];
  transactions: FinancialTransaction[];
  purposeLabels: Record<CategoryPurpose, string>;
  typeLabels: Record<TransactionType, string>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDescriptionChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onPersonChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  renderMoney: (value: number) => string;
};

const TransactionsSection = ({
  transactionForm,
  selectedPerson,
  people,
  allowedCategories,
  transactions,
  purposeLabels,
  typeLabels,
  onSubmit,
  onDescriptionChange,
  onValueChange,
  onPersonChange,
  onTypeChange,
  onCategoryChange,
  renderMoney,
}: TransactionsSectionProps) => {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title="Cadastro de transacoes"
        description="Criacao e listagem com validacao de menor de idade e compatibilidade entre tipo e categoria."
      />
      <form className="mt-6 grid gap-4 lg:grid-cols-5" onSubmit={onSubmit}>
        <LabeledInput
          label="Descricao"
          value={transactionForm.description}
          onChange={onDescriptionChange}
          placeholder="Ex.: Conta de luz"
          maxLength={400}
        />
        <LabeledInput
          label="Valor"
          type="number"
          step="0.01"
          min={0.01}
          value={transactionForm.value === 0 ? "" : String(transactionForm.value)}
          onChange={onValueChange}
          placeholder="0,00"
        />
        <LabeledSelect
          label="Pessoa"
          value={String(transactionForm.personId)}
          onChange={onPersonChange}
          options={[
            { value: "0", label: "Selecione" },
            ...people.map((person) => ({
              value: String(person.id),
              label: `${person.name} (${person.age} anos)`,
            })),
          ]}
        />
        <LabeledSelect
          label="Tipo"
          value={String(transactionForm.type)}
          onChange={onTypeChange}
          options={[
            { value: String(TransactionType.Expense), label: "Despesa" },
            {
              value: String(TransactionType.Income),
              label:
                selectedPerson && selectedPerson.age < 18
                  ? "Receita indisponivel para menor"
                  : "Receita",
              disabled: !!selectedPerson && selectedPerson.age < 18,
            },
          ]}
        />
        <LabeledSelect
          label="Categoria"
          value={String(transactionForm.categoryId)}
          onChange={onCategoryChange}
          options={[
            { value: "0", label: "Selecione" },
            ...allowedCategories.map((category) => ({
              value: String(category.id),
              label: `${category.description} (${purposeLabels[category.purpose]})`,
            })),
          ]}
        />
        <div className="lg:col-span-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {selectedPerson && selectedPerson.age < 18
              ? "Pessoa selecionada e menor de idade: apenas despesas sao permitidas."
              : "Categorias disponiveis sao filtradas automaticamente pela finalidade."}
          </p>
          <button className="h-11 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-500" type="submit">
            Cadastrar transacao
          </button>
        </div>
      </form>

      <DataTable className="mt-6">
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Descricao</Th>
            <Th>Pessoa</Th>
            <Th>Categoria</Th>
            <Th>Tipo</Th>
            <Th className="text-right">Valor</Th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <EmptyRow colSpan={6} label="Nenhuma transacao cadastrada." />
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-slate-100">
                <Td>#{transaction.id}</Td>
                <Td>{transaction.description}</Td>
                <Td>{transaction.personName}</Td>
                <Td>{transaction.categoryDescription}</Td>
                <Td>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      transaction.type === TransactionType.Income
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {typeLabels[transaction.type]}
                  </span>
                </Td>
                <Td className="text-right font-medium">{renderMoney(transaction.value)}</Td>
              </tr>
            ))
          )}
        </tbody>
      </DataTable>
    </section>
  );
};

export default TransactionsSection;
