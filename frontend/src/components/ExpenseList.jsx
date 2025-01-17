import React, { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../services/api";

function ExpenseList({ onEdit }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des dépenses", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la dépense", err);
    }
  };

  return (
    <div>
      <h2>Liste des Dépenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.amount}€ - {expense.date}
            <button onClick={() => onEdit(expense)}>Modifier</button>
            <button onClick={() => handleDelete(expense.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
