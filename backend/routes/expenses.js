const express = require("express");
const router = express.Router();
const pool = require("../db");

// Créer une dépense
router.post("/", async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const newExpense = await pool.query(
      "INSERT INTO expenses (title, amount, date) VALUES ($1, $2, $3) RETURNING *",
      [title, amount, date]
    );
    res.json(newExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

// Récupérer toutes les dépenses
router.get("/", async (req, res) => {
  try {
    const allExpenses = await pool.query("SELECT * FROM expenses");
    res.json(allExpenses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
