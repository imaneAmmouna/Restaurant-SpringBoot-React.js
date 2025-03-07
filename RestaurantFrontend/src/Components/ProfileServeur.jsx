import React, { useState, useEffect } from "react";
import HeaderServeur from "./HeaderServeur";
import "../styles/ProfileClient.css";

const ProfileServeur = () => {
  const [serveur, setServeur] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("profile-body");
    return () => {
      document.body.classList.remove("profile-body");
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwtTokenServeur");
      if (!token) {
        setError("Utilisateur non connecté.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/employees/serveur/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil.");
        }

        const data = await response.json();
        setServeur(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderServeur />
      </header>
      <div className="profile-container">
        <h2>Mon Profil</h2>
        {serveur && (
          <>
            <p><strong>Nom:</strong> {serveur.nomServeur}</p>
            <p><strong>Prénom:</strong> {serveur.prenomServeur}</p>
            <p><strong>Email:</strong> {serveur.emailServeur}</p>
            <p><strong>Téléphone:</strong> {serveur.telephoneServeur}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileServeur;
