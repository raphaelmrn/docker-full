import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleSave = () => {
    setEditingExpense(null);
  };

  return (
    <div>
      <h1>Gestion des Dépenses</h1>
      <ExpenseForm currentExpense={editingExpense} onSave={handleSave} />
      <ExpenseList onEdit={handleEdit} />
    </div>
  );
}

export default App;
