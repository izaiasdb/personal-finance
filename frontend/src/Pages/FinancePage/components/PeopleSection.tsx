import React, { FormEvent } from "react";
import { Person, PersonPayload } from "../../../Models/Finance";
import {
  DataTable,
  EmptyRow,
  LabeledInput,
  SectionHeader,
  Td,
  Th,
} from "./FinanceUI";

type PeopleSectionProps = {
  people: Person[];
  personForm: PersonPayload;
  editingPersonId: number | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
  onEditPerson: (person: Person) => void;
  onDeletePerson: (person: Person) => void;
  onNameChange: (value: string) => void;
  onAgeChange: (value: string) => void;
};

const PeopleSection = ({
  people,
  personForm,
  editingPersonId,
  onSubmit,
  onCancelEdit,
  onEditPerson,
  onDeletePerson,
  onNameChange,
  onAgeChange,
}: PeopleSectionProps) => {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <SectionHeader
        title={editingPersonId ? "Editar pessoa" : "Cadastro de pessoas"}
        description="Criacao, edicao, exclusao e listagem. Ao excluir, as transacoes da pessoa sao removidas no backend."
      />
      <form className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr_auto]" onSubmit={onSubmit}>
        <LabeledInput
          label="Nome"
          value={personForm.name}
          onChange={onNameChange}
          placeholder="Nome da pessoa"
          maxLength={200}
        />
        <LabeledInput
          label="Idade"
          type="number"
          value={String(personForm.age)}
          onChange={onAgeChange}
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
              onClick={onCancelEdit}
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
                      onClick={() => onEditPerson(person)}
                    >
                      Editar
                    </button>
                    <button
                      className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      type="button"
                      onClick={() => onDeletePerson(person)}
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
  );
};

export default PeopleSection;
