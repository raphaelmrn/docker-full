import React, { useState } from "react";
import { addExpense, updateExpense } from "../services/api";

function ExpenseForm({ currentExpense, onSave }) {
  const [title, setTitle] = useState(currentExpense?.title || "");
  const [amount, setAmount] = useState(currentExpense?.amount || "");
  const [date, setDate] = useState(currentExpense?.date || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = { title, amount, date };
    try {
      if (currentExpense) {
        await updateExpense(currentExpense.id, expense);
      } else {
        await addExpense(expense);
      }
      onSave();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la dépense", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentExpense ? "Modifier" : "Ajouter"} une dépense</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default ExpenseForm;
