import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import {
  Category,
  CategoryPayload,
  CategoryTotals,
  FinancialTransaction,
  Person,
  PersonPayload,
  PersonTotals,
  ReportResponse,
  TransactionPayload,
} from "../Models/Finance";

const api = "http://localhost:5167/api/";

export const getPeopleAPI = async () => {
  try {
    return await axios.get<Person[]>(api + "person");
  } catch (error) {
    handleError(error);
  }
};

export const createPersonAPI = async (payload: PersonPayload) => {
  try {
    return await axios.post<Person>(api + "person", payload);
  } catch (error) {
    handleError(error);
  }
};

export const updatePersonAPI = async (id: number, payload: PersonPayload) => {
  try {
    return await axios.put<Person>(api + `person/${id}`, payload);
  } catch (error) {
    handleError(error);
  }
};

export const deletePersonAPI = async (id: number) => {
  try {
    return await axios.delete(api + `person/${id}`);
  } catch (error) {
    handleError(error);
  }
};

export const getCategoriesAPI = async () => {
  try {
    return await axios.get<Category[]>(api + "category");
  } catch (error) {
    handleError(error);
  }
};

export const createCategoryAPI = async (payload: CategoryPayload) => {
  try {
    return await axios.post<Category>(api + "category", payload);
  } catch (error) {
    handleError(error);
  }
};

export const getTransactionsAPI = async () => {
  try {
    return await axios.get<FinancialTransaction[]>(api + "transaction");
  } catch (error) {
    handleError(error);
  }
};

export const createTransactionAPI = async (payload: TransactionPayload) => {
  try {
    return await axios.post<FinancialTransaction>(api + "transaction", payload);
  } catch (error) {
    handleError(error);
  }
};

export const getPersonTotalsAPI = async () => {
  try {
    return await axios.get<ReportResponse<PersonTotals>>(api + "report/person-totals");
  } catch (error) {
    handleError(error);
  }
};

export const getCategoryTotalsAPI = async () => {
  try {
    return await axios.get<ReportResponse<CategoryTotals>>(api + "report/category-totals");
  } catch (error) {
    handleError(error);
  }
};