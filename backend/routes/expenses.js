const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Connexion au pool PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER || "admin",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "postgres",
  password: process.env.PGPASSWORD || "admin",
  port: process.env.PGPORT || 5432,
});

// Récupérer toutes les dépenses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des dépenses");
  }
});

// Ajouter une nouvelle dépense
router.post("/", async (req, res) => {
  const { title, amount, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO expenses (title, amount, date) VALUES ($1, $2, $3) RETURNING *",
      [title, amount, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Erreur lors de l'ajout de la dépense");
  }
});

// Mettre à jour une dépense
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE expenses SET title = $1, amount = $2, date = $3 WHERE id = $4 RETURNING *",
      [title, amount, date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Dépense non trouvée");
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Erreur lors de la mise à jour de la dépense");
  }
});

// Supprimer une dépense
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Dépense non trouvée");
    }
    res.send("Dépense supprimée avec succès");
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression de la dépense");
  }
});

module.exports = router;
