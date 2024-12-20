import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Les requêtes seront envoyées à Nginx qui redirige vers le backend
});

export const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await API.put(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};
