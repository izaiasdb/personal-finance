import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Category,
  CategoryPayload,
  CategoryPurpose,
  CategoryTotals,
  FinancialTransaction,
  Person,
  PersonPayload,
  PersonTotals,
  TotalsItem,
  TransactionPayload,
  TransactionType,
} from "../../Models/Finance";
import {
  createCategoryAPI,
  createPersonAPI,
  createTransactionAPI,
  deletePersonAPI,
  getCategoriesAPI,
  getCategoryTotalsAPI,
  getPeopleAPI,
  getPersonTotalsAPI,
  getTransactionsAPI,
  updatePersonAPI,
} from "../../Services/FinanceService";

const defaultPersonForm: PersonPayload = {
  name: "",
  age: 18,
};

const defaultCategoryForm: CategoryPayload = {
  description: "",
  purpose: CategoryPurpose.Expense,
};

const defaultTransactionForm: TransactionPayload = {
  description: "",
  value: 0,
  type: TransactionType.Expense,
  categoryId: 0,
  personId: 0,
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const purposeLabels: Record<CategoryPurpose, string> = {
  [CategoryPurpose.Expense]: "Despesa",
  [CategoryPurpose.Income]: "Receita",
  [CategoryPurpose.Both]: "Ambas",
};

const typeLabels: Record<TransactionType, string> = {
  [TransactionType.Expense]: "Despesa",
  [TransactionType.Income]: "Receita",
};

const FinancePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [personTotals, setPersonTotals] = useState<PersonTotals[]>([]);
  const [personGrandTotal, setPersonGrandTotal] = useState<TotalsItem>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotals[]>([]);
  const [categoryGrandTotal, setCategoryGrandTotal] = useState<TotalsItem>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [personForm, setPersonForm] = useState<PersonPayload>(defaultPersonForm);
  const [categoryForm, setCategoryForm] = useState<CategoryPayload>(defaultCategoryForm);
  const [transactionForm, setTransactionForm] = useState<TransactionPayload>(
    defaultTransactionForm
  );
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedPerson = useMemo(
    () => people.find((person) => person.id === transactionForm.personId) ?? null,
    [people, transactionForm.personId]
  );

  const allowedCategories = useMemo(() => {
    return categories.filter((category) => {
      if (category.purpose === CategoryPurpose.Both) {
        return true;
      }

      if (transactionForm.type === TransactionType.Expense) {
        return category.purpose === CategoryPurpose.Expense;
      }

      return category.purpose === CategoryPurpose.Income;
    });
  }, [categories, transactionForm.type]);

  const loadFinanceData = async (showBackgroundState = false) => {
    if (showBackgroundState) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const [
        peopleResponse,
        categoriesResponse,
        transactionsResponse,
        personTotalsResponse,
        categoryTotalsResponse,
      ] = await Promise.all([
        getPeopleAPI(),
        getCategoriesAPI(),
        getTransactionsAPI(),
        getPersonTotalsAPI(),
        getCategoryTotalsAPI(),
      ]);

      setPeople(peopleResponse?.data ?? []);
      setCategories(categoriesResponse?.data ?? []);
      setTransactions(transactionsResponse?.data ?? []);
      setPersonTotals(personTotalsResponse?.data.items ?? []);
      setPersonGrandTotal(
        personTotalsResponse?.data.grandTotal ?? {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        }
      );
      setCategoryTotals(categoryTotalsResponse?.data.items ?? []);
      setCategoryGrandTotal(
        categoryTotalsResponse?.data.grandTotal ?? {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        }
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadFinanceData();
  }, []);

  useEffect(() => {
    if (selectedPerson && selectedPerson.age < 18 && transactionForm.type === TransactionType.Income) {
      setTransactionForm((current) => ({
        ...current,
        type: TransactionType.Expense,
        categoryId: 0,
      }));
      toast.info("Menores de idade podem registrar apenas despesas.");
    }
  }, [selectedPerson, transactionForm.type]);

  useEffect(() => {
    if (
      transactionForm.categoryId > 0 &&
      !allowedCategories.some((category) => category.id === transactionForm.categoryId)
    ) {
      setTransactionForm((current) => ({
        ...current,
        categoryId: 0,
      }));
    }
  }, [allowedCategories, transactionForm.categoryId]);

  const resetPersonForm = () => {
    setPersonForm(defaultPersonForm);
    setEditingPersonId(null);
  };

  const handlePersonSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = personForm.name.trim();
    if (!trimmedName || trimmedName.length > 200) {
      toast.warning("Informe um nome com ate 200 caracteres.");
      return;
    }

    if (personForm.age < 0) {
      toast.warning("Idade deve ser zero ou maior.");
      return;
    }

    const payload = { ...personForm, name: trimmedName };

    if (editingPersonId) {
      const response = await updatePersonAPI(editingPersonId, payload);
      if (response?.status === 200) {
        toast.success("Pessoa atualizada.");
      }
    } else {
      const response = await createPersonAPI(payload);
      if (response?.status === 201) {
        toast.success("Pessoa cadastrada.");
      }
    }

    resetPersonForm();
    await loadFinanceData(true);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPersonId(person.id);
    setPersonForm({
      name: person.name,
      age: person.age,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePerson = async (person: Person) => {
    const confirmed = window.confirm(
      `Excluir ${person.name}? Todas as transações dessa pessoa também serão removidas.`
    );
    if (!confirmed) {
      return;
    }

    const response = await deletePersonAPI(person.id);
    if (response?.status === 204) {
      toast.success("Pessoa excluída.");
      if (transactionForm.personId === person.id) {
        setTransactionForm(defaultTransactionForm);
      }
      await loadFinanceData(true);
    }
  };

  const handleCategorySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDescription = categoryForm.description.trim();
    if (!trimmedDescription || trimmedDescription.length > 400) {
      toast.warning("Informe uma descrição com até 400 caracteres.");
      return;
    }

    const response = await createCategoryAPI({
      ...categoryForm,
      description: trimmedDescription,
    });

    if (response?.status === 201) {
      toast.success("Categoria cadastrada.");
      setCategoryForm(defaultCategoryForm);
      await loadFinanceData(true);
    }
  };

  const handleTransactionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDescription = transactionForm.description.trim();
    if (!trimmedDescription || trimmedDescription.length > 400) {
      toast.warning("Informe uma descrição com até 400 caracteres.");
      return;
    }

    if (transactionForm.value <= 0) {
      toast.warning("O valor deve ser positivo.");
      return;
    }

    if (transactionForm.personId <= 0) {
      toast.warning("Selecione uma pessoa.");
      return;
    }

    if (transactionForm.categoryId <= 0) {
      toast.warning("Selecione uma categoria.");
      return;
    }

    if (selectedPerson && selectedPerson.age < 18 && transactionForm.type === TransactionType.Income) {
      toast.warning("Para menores de idade, apenas despesas são aceitas.");
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === transactionForm.categoryId
    );
    if (!selectedCategory || !allowedCategories.some((category) => category.id === selectedCategory.id)) {
      toast.warning("A categoria escolhida não é compatível com o tipo da transação.");
      return;
    }

    const response = await createTransactionAPI({
      ...transactionForm,
      description: trimmedDescription,
    });

    if (response?.status === 201) {
      toast.success("Transação cadastrada.");
      setTransactionForm(defaultTransactionForm);
      await loadFinanceData(true);
    }
  };

  const renderMoney = (value: number) => currencyFormatter.format(value ?? 0);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 text-lg font-medium text-slate-600">
        Carregando módulo financeiro...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm uppercase tracking-[0.35em] text-emerald-100">
                Personal Finance
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Pessoas, categorias, transações e totais em uma única visão.
              </h1>
              <p className="mt-3 text-sm text-emerald-50 sm:text-base">
                O frontend valida menor de idade, restringe categorias por finalidade e atualiza os totais após cada operação.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <SummaryCard label="Pessoas" value={String(people.length)} />
              <SummaryCard label="Categorias" value={String(categories.length)} />
              <SummaryCard label="Transações" value={String(transactions.length)} />
              <SummaryCard
                label="Saldo geral"
                value={renderMoney(personGrandTotal.balance)}
              />
            </div>
          </div>
        </section>

        {isRefreshing ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            Atualizando dados...
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <SectionHeader
              title={editingPersonId ? "Editar pessoa" : "Cadastro de pessoas"}
              description="Criação, edição, exclusão e listagem. Ao excluir, as transações da pessoa são removidas no backend."
            />
            <form className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr_auto]" onSubmit={handlePersonSubmit}>
              <LabeledInput
                label="Nome"
                value={personForm.name}
                onChange={(value) => setPersonForm((current) => ({ ...current, name: value }))}
                placeholder="Nome da pessoa"
                maxLength={200}
              />
              <LabeledInput
                label="Idade"
                type="number"
                value={String(personForm.age)}
                onChange={(value) =>
                  setPersonForm((current) => ({ ...current, age: Number(value || 0) }))
                }
                min={0}
              />
              <div className="flex items-end gap-3">
                <button className="h-11 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500" type="submit">
                  {editingPersonId ? "Salvar" : "Cadastrar"}
                </button>
                {editingPersonId ? (
                  <button
                    className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    type="button"
                    onClick={resetPersonForm}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>
            <DataTable className="mt-6">
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Idade</Th>
                  <Th>Acoes</Th>
                </tr>
              </thead>
              <tbody>
                {people.length === 0 ? (
                  <EmptyRow colSpan={4} label="Nenhuma pessoa cadastrada." />
                ) : (
                  people.map((person) => (
                    <tr key={person.id} className="border-t border-slate-100">
                      <Td>#{person.id}</Td>
                      <Td>{person.name}</Td>
                      <Td>{person.age}</Td>
                      <Td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                            type="button"
                            onClick={() => handleEditPerson(person)}
                          >
                            Editar
                          </button>
                          <button
                            className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                            type="button"
                            onClick={() => handleDeletePerson(person)}
                          >
                            Excluir
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </DataTable>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <SectionHeader
              title="Cadastro de categorias"
              description="Criacao e listagem com finalidade de despesa, receita ou ambas."
            />
            <form className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr_auto]" onSubmit={handleCategorySubmit}>
              <LabeledInput
                label="Descrição"
                value={categoryForm.description}
                onChange={(value) =>
                  setCategoryForm((current) => ({ ...current, description: value }))
                }
                placeholder="Ex.: Alimentação, Transporte, Lazer"
                maxLength={400}
              />
              <LabeledSelect
                label="Finalidade"
                value={String(categoryForm.purpose)}
                onChange={(value) =>
                  setCategoryForm((current) => ({
                    ...current,
                    purpose: Number(value) as CategoryPurpose,
                  }))
                }
                options={[
                  { value: String(CategoryPurpose.Expense), label: "Despesa" },
                  { value: String(CategoryPurpose.Income), label: "Receita" },
                  { value: String(CategoryPurpose.Both), label: "Ambas" },
                ]}
              />
              <div className="flex items-end">
                <button className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700" type="submit">
                  Cadastrar
                </button>
              </div>
            </form>
            <DataTable className="mt-6">
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Descrição</Th>
                  <Th>Finalidade</Th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <EmptyRow colSpan={3} label="Nenhuma categoria cadastrada." />
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="border-t border-slate-100">
                      <Td>#{category.id}</Td>
                      <Td>{category.description}</Td>
                      <Td>{purposeLabels[category.purpose]}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </DataTable>
          </section>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <SectionHeader
            title="Cadastro de transações"
            description="Criação e listagem com validação de menor de idade e compatibilidade entre tipo e categoria."
          />
          <form className="mt-6 grid gap-4 lg:grid-cols-5" onSubmit={handleTransactionSubmit}>
            <LabeledInput
              label="Descrição"
              value={transactionForm.description}
              onChange={(value) =>
                setTransactionForm((current) => ({ ...current, description: value }))
              }
              placeholder="Ex.: Conta de luz"
              maxLength={400}
            />
            <LabeledInput
              label="Valor"
              type="number"
              step="0.01"
              min={0.01}
              value={transactionForm.value === 0 ? "" : String(transactionForm.value)}
              onChange={(value) =>
                setTransactionForm((current) => ({
                  ...current,
                  value: Number(value || 0),
                }))
              }
              placeholder="0,00"
            />
            <LabeledSelect
              label="Pessoa"
              value={String(transactionForm.personId)}
              onChange={(value) =>
                setTransactionForm((current) => ({
                  ...current,
                  personId: Number(value),
                }))
              }
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
              onChange={(value) =>
                setTransactionForm((current) => ({
                  ...current,
                  type: Number(value) as TransactionType,
                }))
              }
              options={[
                { value: String(TransactionType.Expense), label: "Despesa" },
                {
                  value: String(TransactionType.Income),
                  label: selectedPerson && selectedPerson.age < 18 ? "Receita indisponível para menor" : "Receita",
                  disabled: !!selectedPerson && selectedPerson.age < 18,
                },
              ]}
            />
            <LabeledSelect
              label="Categoria"
              value={String(transactionForm.categoryId)}
              onChange={(value) =>
                setTransactionForm((current) => ({
                  ...current,
                  categoryId: Number(value),
                }))
              }
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
                  ? "Pessoa selecionada e menor de idade: apenas despesas são permitidas."
                  : "Categorias disponíveis são filtradas automaticamente pela finalidade."}
              </p>
              <button className="h-11 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-500" type="submit">
                Cadastrar transação
              </button>
            </div>
          </form>

          <DataTable className="mt-6">
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Descrição</Th>
                <Th>Pessoa</Th>
                <Th>Categoria</Th>
                <Th>Tipo</Th>
                <Th className="text-right">Valor</Th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <EmptyRow colSpan={6} label="Nenhuma transação cadastrada." />
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

        <div className="grid gap-8 xl:grid-cols-2">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <SectionHeader
              title="Totais por pessoa"
              description="Receitas, despesas e saldo por pessoa, com total geral no rodape."
            />
            <TotalsTable
              rows={personTotals.map((item) => ({
                key: item.personId,
                label: item.personName,
                totalIncome: item.totalIncome,
                totalExpense: item.totalExpense,
                balance: item.balance,
              }))}
              grandTotal={personGrandTotal}
              emptyLabel="Nenhum total por pessoa disponível."
            />
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <SectionHeader
              title="Totais por categoria"
              description="Consulta opcional implementada no frontend com total geral no rodape."
            />
            <TotalsTable
              rows={categoryTotals.map((item) => ({
                key: item.categoryId,
                label: item.categoryDescription,
                totalIncome: item.totalIncome,
                totalExpense: item.totalExpense,
                balance: item.balance,
              }))}
              grandTotal={categoryGrandTotal}
              emptyLabel="Nenhum total por categoria disponível."
            />
          </section>
        </div>
      </div>
    </div>
  );
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

type SectionHeaderProps = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
};

type LabeledInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  maxLength?: number;
  min?: number;
  step?: string;
};

const LabeledInput = ({
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

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type LabeledSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

const LabeledSelect = ({ label, value, onChange, options }: LabeledSelectProps) => {
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

type DataTableProps = {
  children: React.ReactNode;
  className?: string;
};

const DataTable = ({ children, className = "" }: DataTableProps) => {
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

const Th = ({ children, className = "" }: TableTextProps) => {
  return (
    <th className={`bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ${className}`}>
      {children}
    </th>
  );
};

const Td = ({ children, className = "" }: TableTextProps) => {
  return <td className={`px-4 py-3 text-slate-700 ${className}`}>{children}</td>;
};

type EmptyRowProps = {
  colSpan: number;
  label: string;
};

const EmptyRow = ({ colSpan, label }: EmptyRowProps) => {
  return (
    <tr>
      <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={colSpan}>
        {label}
      </td>
    </tr>
  );
};

type TotalsTableRow = {
  key: number;
  label: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type TotalsTableProps = {
  rows: TotalsTableRow[];
  grandTotal: TotalsItem;
  emptyLabel: string;
};

const TotalsTable = ({ rows, grandTotal, emptyLabel }: TotalsTableProps) => {
  return (
    <DataTable className="mt-6">
      <thead>
        <tr>
          <Th>Descrição</Th>
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

export default FinancePage;