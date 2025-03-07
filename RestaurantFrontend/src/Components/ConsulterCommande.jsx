import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ConsulterAdministrateur.css";

const ConsulterCommande = () => {
  // State pour stocker les commandes récupérées
  const [commandes, setCommandes] = useState([]);
  const [detailsCommande, setDetailsCommande] = useState([]);

  // Fonction pour récupérer les commandes
  const fetchCommandes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/commandes/afficher"); // Remplacer par l'URL de votre API
      if (response.ok) {
        const data = await response.json();
        setCommandes(data); // Stocker les commandes dans le state
      } else {
        console.error("Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur:", error);
    }
  };

  // Fonction pour récupérer les détails des commandes
  const fetchDetailsCommande = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/commandes/details/all"); // URL pour les détails des commandes
      if (response.ok) {
        const data = await response.json();
        setDetailsCommande(data); // Stocker les détails des commandes
      } else {
        console.error("Erreur lors de la récupération des détails des commandes");
      }
    } catch (error) {
      console.error("Erreur de réseau ou serveur:", error);
    }
  };

  // Utilisation de useEffect pour récupérer les données au chargement du composant
  useEffect(() => {
    fetchCommandes();
    fetchDetailsCommande();
  }, []);

  // Fonction pour trier les commandes par statut
  const filterByStatus = (status) => commandes.filter((cmd) => cmd.status === status);

  // Création des listes triées
  const commandesAttente = filterByStatus("attente");
  const commandesPreparation = filterByStatus("preparation");
  const commandesPrete = filterByStatus("prete");
  const commandesLivraison = filterByStatus("livraison");
  const commandesLivree = filterByStatus("livree");

  // Fonction pour afficher un tableau de commandes
  const renderTable = (commandes) => (
    <table className="commandesTable">
      <thead>
        <tr>
          <th>ID Commande</th>
          <th>ID Client</th>
          <th>Livreur</th>
          <th>Serveur</th>
          <th>Prix Total (MAD)</th>
          <th>Status</th>
          <th>Adresse</th>
          <th>Date de Création</th>
          <th>Date de Mise à Jour</th>
        </tr>
      </thead>
      <tbody>
        {commandes.length > 0 ? (
          commandes.map((commande) => (
            <tr key={commande.commandeId}>
              <td>{commande.commandeId}</td>
              <td>{commande.clientId}</td>
              <td>{commande.livreurId}</td>
              <td>{commande.serveurId}</td>
              <td>{commande.prixTotalCommande}</td>
              <td>{commande.status}</td>
              <td>{commande.adresse}</td>
              <td>{new Date(commande.createdAt).toLocaleString()}</td>
              <td>{new Date(commande.updatedAt).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">Aucune commande disponible</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  // Fonction pour afficher un tableau des détails des commandes
  const renderDetailsTable = () => (
    <table className="commandesTable">
      <thead>
        <tr>
          <th>ID Détail Commande</th>
          <th>ID Commande</th>
          <th>ID Menu</th>
          <th>Quantité</th>
        </tr>
      </thead>
      <tbody>
        {detailsCommande.length > 0 ? (
          detailsCommande.map((detail) => (
            <tr key={detail.detailsCommandeId}>
              <td>{detail.detailsCommandeId}</td>
              <td>{detail.commandeId}</td>
              <td>{detail.menuId}</td>
              <td>{detail.quantite}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Aucun détail de commande disponible</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>

      <div className="bodyConsulterAdmin">
        <h2>Liste des commandes :</h2>

        <h3>Les commandes en attente :</h3>
        {renderTable(commandesAttente)}

        <h3>Les commandes en cours de préparation :</h3>
        {renderTable(commandesPreparation)}

        <h3>Les commandes prêtes :</h3>
        {renderTable(commandesPrete)}

        <h3>Les commandes en livraison :</h3>
        {renderTable(commandesLivraison)}

        <h3>Les commandes livrées :</h3>
        {renderTable(commandesLivree)}

        <h2>Liste des commandes en détails :</h2>
        {renderDetailsTable()}
      </div>
    </>
  );
};

export default ConsulterCommande;
