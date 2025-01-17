const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3050;

// Middleware
app.use(express.json());

// Config PostgreSQL avec Pool pour les connexions
const pool = new Pool({
  user: process.env.PGUSER || "admin",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "postgres",
  password: process.env.PGPASSWORD || "admin",
  port: process.env.PGPORT || 5432,
});

// Test de la co PostgreSQL au start
pool
  .connect()
  .then((client) => {
    console.log("✅ Connecté à PostgreSQL");
    client.release(); // Relâche la co après le test
  })
  .catch((err) =>
    console.error("❌ Erreur de connexion à PostgreSQL", err.stack)
  );

// Route principale
app.get("/", (req, res) => {
  res.send("🚀 Bienvenue sur l'API de suivi des dépenses !");
});

// Route authentification
app.use("/auth", require("./routes/auth"));

// Route pour tester une requête PostgreSQL
app.get("/time", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`🕒 L'heure actuelle est : ${result.rows[0].now}`);
  } catch (err) {
    console.error("❌ Erreur lors de la requête PostgreSQL", err.stack);
    res.status(500).send("Erreur lors de la requête PostgreSQL");
  }
});

// Route pour les dépenses
app.use("/expenses", require("./routes/expenses"));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
