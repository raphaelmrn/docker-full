import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Les requêtes seront envoyées à Nginx qui redirige vers le backend
});
// Inscription
export const register = async (username, email, password) => {
  return axios.post(`${API_URL}/auth/register`, { username, email, password });
};

// Connexion
export const login = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

// Récupération du profil
export const getProfile = async (token) => {
  return axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Récupération des dépenses
export const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

// Ajout d'une dépense
export const addExpense = async (expense) => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

// Mise à jour d'une dépense
export const updateExpense = async (id, expense) => {
  const response = await API.put(`/expenses/${id}`, expense);
  return response.data;
};

// Suppression d'une dépense
export const deleteExpense = async (id) => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};
