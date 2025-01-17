import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Register from "./components/Register";
import Login from "./components/Login";
import Profil from "./components/Profil";

function App() {
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleSave = () => {
    setEditingExpense(null);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/expenses">Gestion des Dépenses</Link>
          </li>
          <li>
            <Link to="/register">Inscription</Link>
          </li>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Route pour la gestion des dépenses */}
        <Route
          path="/expenses"
          element={
            <div>
              <h1>Gestion des Dépenses</h1>
              <ExpenseForm
                currentExpense={editingExpense}
                onSave={handleSave}
              />
              <ExpenseList onEdit={handleEdit} />
            </div>
          }
        />

        {/* Routes pour l'authentification */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />

        {/* Redirection par défaut */}
        <Route
          path="*"
          element={<h1>Bienvenue ! Veuillez choisir une option.</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
