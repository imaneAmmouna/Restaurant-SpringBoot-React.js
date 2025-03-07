import React, { useState, useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import "../styles/AjouterCategorie.css";

const AjouterPlat = () => {
  const [nomMenu, setNomMenu] = useState("");
  const [descriptionMenu, setDescriptionMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8080/api/restaurant/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!nomMenu.trim() || !descriptionMenu.trim() || !prixMenu || !categorieId) {
      setMessage("Tous les champs sont requis.");
      return;
    }

    const menuData = {
      nomMenu,
      descriptionMenu,
      prixMenu: parseFloat(prixMenu),
      categorie: { categorieId: parseInt(categorieId) }
    };

    try {
      const response = await fetch("http://localhost:8080/api/restaurant/menu/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        setMessage("Menu ajouté avec succès !");
        setNomMenu("");
        setDescriptionMenu("");
        setPrixMenu("");
        setCategorieId("");
      } else {
        setMessage("Erreur lors de l'ajout du menu.");
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
        <h1>Ajouter un menu</h1>
        <form onSubmit={handleSubmit} className="formCategorie">
          <label>Nom du menu :</label>
          <input
            type="text"
            value={nomMenu}
            onChange={(e) => setNomMenu(e.target.value)}
            placeholder="Ex: Pizza Margherita"
            required
          />

          <label>Description du menu :</label>
          <textarea
            value={descriptionMenu}
            onChange={(e) => setDescriptionMenu(e.target.value)}
            placeholder="Description détaillée du plat"
            required
          />

          <label>Prix du menu :</label>
          <input
            type="number"
            value={prixMenu}
            onChange={(e) => setPrixMenu(e.target.value)}
            placeholder="Ex: 12.99"
            required
          />

          <label>Catégorie :</label>
          <select
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.categorieId} value={categorie.categorieId}>
                {categorie.nomCategorie}
              </option>
            ))}
          </select>

          <button type="submit">Ajouter</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default AjouterPlat;
