const { Pool } = require("pg");

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on("connect", () => {
  console.log("🟢 Connecté à la base de données PostgreSQL !");
});

module.exports = pool;
