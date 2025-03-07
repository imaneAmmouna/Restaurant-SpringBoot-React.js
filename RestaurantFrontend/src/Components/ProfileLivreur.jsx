import React, { useState, useEffect } from "react";
import HeaderLivreur from "./HeaderLivreur";
import "../styles/ProfileClient.css";

const ProfileLivreur = () => {
  const [livreur, setLivreur] = useState(null);
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
      const token = localStorage.getItem("jwtTokenLivreur");
      if (!token) {
        setError("Utilisateur non connecté.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/employees/livreur/profile", {
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
        setLivreur(data);
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
        <HeaderLivreur />
      </header>
      <div className="profile-container">
        <h2>Mon Profil</h2>
        {livreur && (
          <>
            <p><strong>Nom:</strong> {livreur.nomLivreur}</p>
            <p><strong>Prénom:</strong> {livreur.prenomLivreur}</p>
            <p><strong>Email:</strong> {livreur.emailLivreur}</p>
            <p><strong>Téléphone:</strong> {livreur.telephoneLivreur}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileLivreur;
