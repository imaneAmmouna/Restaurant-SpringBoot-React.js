import React, { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import "../styles/AjouterCategorie.css";

const AjouterCategorie = () => {
  const [nomCategorie, setNomCategorie] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!nomCategorie.trim()) {
      setMessage("Le nom de la catégorie est requis.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/restaurant/categorie/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomCategorie }),
      });

      if (response.ok) {
        setMessage("Catégorie ajoutée avec succès !");
        setNomCategorie(""); // Réinitialiser le champ
      } else {
        setMessage("Erreur lors de l'ajout de la catégorie.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>

      <div className="bodyCategories">
        <h1>Ajouter une catégorie</h1>
        <form onSubmit={handleSubmit} className="formCategorie">
          <label>Nom de la catégorie :</label>
          <input
            type="text"
            value={nomCategorie}
            onChange={(e) => setNomCategorie(e.target.value)}
            placeholder="Ex: Desserts"
            required
          />
          <button type="submit">Ajouter</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default AjouterCategorie;
