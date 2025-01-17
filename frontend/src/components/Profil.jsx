import React, { useState, useEffect } from "react";
import { getProfil } from "../services/api";

function Profil() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Veuillez vous connecter.");
        return;
      }
      try {
        const response = await getProfil(token);
        setUser(response.data.user);
      } catch (err) {
        setMessage(
          err.response?.data?.message ||
            "Erreur lors de la récupération du profil."
        );
      }
    };

    fetchProfil();
  }, []);

  return (
    <div>
      <h2>Profil</h2>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>Nom d'utilisateur : {user.username}</p>
          <p>Email : {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profil;
