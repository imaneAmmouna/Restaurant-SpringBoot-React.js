import React, { useState, useEffect } from 'react';
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ConsulterAdministrateur.css";

const ConsulterCategorie = () => {
  const [categorieList, setCategorieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNom, setSelectedNom] = useState(""); // Nom de la catégorie à modifier
  const [categorieIdToUpdate, setCategorieIdToUpdate] = useState(null);
  const [originalNom, setOriginalNom] = useState(""); // Pour stocker le nom d'origine de la catégorie

  // Utilisation de useEffect pour charger les données des catégories
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/categories") // L'URL de votre API Spring Boot
      .then((response) => response.json())
      .then((data) => {
        setCategorieList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, []);

  // Fonction pour gérer le changement du nom de la catégorie
  const handleNomChange = (event) => {
    setSelectedNom(event.target.value);
  };

  // Fonction pour mettre à jour le nom de la catégorie
  const updateCategorie = (categorieId) => {
    fetch(`http://localhost:8080/api/restaurant/categorie/update/${categorieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nomCategorie: selectedNom }), // Envoi du nom de la catégorie modifié
    })
      .then((response) => {
        if (response.ok) {
          alert("Nom de la catégorie mis à jour avec succès");
        } else {
          alert("Erreur lors de la mise à jour de la catégorie");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  // Fonction pour annuler la modification du nom de la catégorie
  const handleCancel = () => {
    setSelectedNom(originalNom); // Restaure le nom original
    setCategorieIdToUpdate(null); // Cache le formulaire de modification
  };

  // Fonction pour initier l'édition du nom de la catégorie
  const handleEditNom = (categorie) => {
    setCategorieIdToUpdate(categorie.categorieId);
    setOriginalNom(categorie.nomCategorie); // Stocke le nom original
    setSelectedNom(categorie.nomCategorie); // Affiche le nom actuel pour modification
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>
      <div className="bodyConsulterAdmin">
        <h2>Liste des catégories :</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="categorie-table">
            <thead>
              <tr>
                <th>Nom de la catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorieList.map((categorie) => (
                <tr key={categorie.categorieId}>
                  <td>{categorie.nomCategorie}</td>
                  <td>
                    <button onClick={() => handleEditNom(categorie)}>
                      Modifier nom
                    </button>
                    {categorieIdToUpdate === categorie.categorieId && (
                      <div>
                        <input
                          type="text"
                          value={selectedNom}
                          onChange={handleNomChange}
                        />
                        <button onClick={() => updateCategorie(categorie.categorieId)}>
                          Sauvegarder
                        </button>
                        <button onClick={handleCancel}>
                          Annuler
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ConsulterCategorie;
