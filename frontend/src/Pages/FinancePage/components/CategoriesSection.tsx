import React, { FormEvent } from "react";
import { Category, CategoryPayload, CategoryPurpose } from "../../../Models/Finance";
import {
  DataTable,
  EmptyRow,
  LabeledInput,
  LabeledSelect,
  SectionHeader,
  Td,
  Th,
} from "./FinanceUI";

type CategoriesSectionProps = {
  categories: Category[];
  categoryForm: CategoryPayload;
  purposeLabels: Record<CategoryPurpose, string>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDescriptionChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
};

const CategoriesSection = ({
  categories,
  categoryForm,
  purposeLabels,
  onSubmit,
  onDescriptionChange,
  onPurposeChange,
}: CategoriesSectionProps) => {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title="Cadastro de categorias"
        description="Criacao e listagem com finalidade de despesa, receita ou ambas."
      />
      <form className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr_auto]" onSubmit={onSubmit}>
        <LabeledInput
          label="Descricao"
          value={categoryForm.description}
          onChange={onDescriptionChange}
          placeholder="Ex.: Alimentacao, Transporte, Lazer"
          maxLength={400}
        />
        <LabeledSelect
          label="Finalidade"
          value={String(categoryForm.purpose)}
          onChange={onPurposeChange}
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
            <Th>Descricao</Th>
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
  );
};

export default CategoriesSection;
