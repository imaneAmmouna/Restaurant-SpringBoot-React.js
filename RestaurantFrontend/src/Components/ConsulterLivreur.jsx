
import React, { useState, useEffect } from 'react';
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ConsulterAdministrateur.css";

const ConsulterLivreur = () => {
  const [livreurList, setLivreurList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEtat, setSelectedEtat] = useState("actif"); // "actif" ou "passe"
  const [livreurIdToUpdate, setLivreurIdToUpdate] = useState(null);
  const [originalEtat, setOriginalEtat] = useState("actif"); // Pour stocker l'état d'origine

  // Utilisation de useEffect pour charger les données des administrateurs
  useEffect(() => {
    fetch("http://localhost:8080/api/employees/livreur/show") // L'URL de votre API Spring Boot
      .then((response) => response.json())
      .then((data) => {
        setLivreurList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, []);

  // Fonction pour gérer le changement d'état
  const handleEtatChange = (event) => {
    setSelectedEtat(event.target.value);
  };

  // Fonction pour mettre à jour l'état d'un administrateur
  const updateLivreurState = (livreurId) => {
    fetch(`http://localhost:8080/api/employees/livreur/stat/${livreurId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedEtat), // Envoi de l'état comme "actif" ou "passe"
    })
      .then((response) => {
        if (response.ok) {
          alert("État mis à jour avec succès");
          // Réactualiser la liste des livreur si nécessaire
        } else {
          alert("Erreur lors de la mise à jour de l'état");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  // Fonction pour annuler la modification de l'état
  const handleCancel = () => {
    setSelectedEtat(originalEtat); // Restaure l'état original
    setLivreurIdToUpdate(null); // Cache le formulaire de modification
  };

  // Fonction pour initier l'édition de l'état d'un livreur
  const handleEditEtat = (livreur) => {
    setLivreurIdToUpdate(livreur.livreurId);
    setOriginalEtat(livreur.etatLivreur); // Stocke l'état original
    setSelectedEtat(livreur.etatLivreur); // Affiche l'état actuel pour modification
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>
      <div className="bodyConsulterAdmin">
        <h2>Liste des livreurs :</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>CIN</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {livreurList.map((livreur) => (
                <tr key={livreur.livreurId}>
                  <td>{livreur.nomLivreur}</td>
                  <td>{livreur.prenomLivreur}</td>
                  <td>{livreur.emailLivreur}</td>
                  <td>{livreur.telephoneLivreur}</td>
                  <td>{livreur.cinLivreur}</td>
                  <td>
                    {livreur.etatLivreur}
                    <button onClick={() => handleEditEtat(livreur)}>
                      Modifier état
                    </button>
                    {livreurIdToUpdate === livreur.livreurId && (
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="actif"
                            checked={selectedEtat === "actif"}
                            onChange={handleEtatChange}
                          />
                          Actif
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="passe"
                            checked={selectedEtat === "passe"}
                            onChange={handleEtatChange}
                          />
                          Passe
                        </label>
                        <button onClick={() => updateLivreurState(livreur.livreurId)}>
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

export default ConsulterLivreur;

