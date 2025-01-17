import React, { useState, useEffect } from "react";
import { getProfile } from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Veuillez vous connecter.");
        return;
      }
      try {
        const response = await getProfile(token);
        setUser(response.data.user);
      } catch (err) {
        setMessage(
          err.response?.data?.message ||
            "Erreur lors de la récupération du profil."
        );
      }
    };

    fetchProfile();
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

export default Profile;
