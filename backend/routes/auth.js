const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client } = require("pg");

const router = express.Router();

// Configuration PostgreSQL
const client = new Client({
  user: "admin",
  host: "postgres-docker",
  database: "postgres",
  password: "admin",
  port: 5432,
});

client.connect();

// Clé secrète JWT (Utilisez une variable d'environnement en production)
const JWT_SECRET = process.env.JWT_SECRET || "ton_secret_super_securise";

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Récupère le token du header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }
    req.user = user; // Ajoute les données de l'utilisateur à l'objet req
    next();
  });
}

// Route d'inscription
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const result = await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès !",
      user: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ message: "Email ou username déjà utilisé." });
    } else {
      res.status(500).json({ message: "Erreur serveur." });
    }
  }
});

// Route de connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    // Vérifier si l'utilisateur existe
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = result.rows[0];

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "30d" } // Expire dans 30 jours
    );

    res.status(200).json({
      message: "Connexion réussie !",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Route protégée pour obtenir le profil de l'utilisateur
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({
      message: "Profil récupéré avec succès.",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
