import React, { useEffect, useState } from "react";
import HeaderLivreur from "./HeaderLivreur";

const ConsulterCommandeLivreur = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/commandes/livreur/afficher")
      .then((response) => response.json())
      .then((data) => {
        const commandesFiltrees = data.filter(
          (commande) => commande.status === "livraison" || commande.status === "livree"
        );
        setCommandes(commandesFiltrees);
      })
      .catch((error) => console.error("Erreur lors de la récupération des commandes :", error));
  }, []);

  const updateStatus = (commandeId, newStatus) => {
    fetch(`http://localhost:8080/api/commandes/update-status/${commandeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          setCommandes((prevCommandes) =>
            prevCommandes.map((cmd) =>
              cmd.commandeId === commandeId ? { ...cmd, status: newStatus } : cmd
            )
          );
        } else {
          console.error("Erreur lors de la mise à jour du statut");
        }
      })
      .catch((error) => console.error("Erreur serveur :", error));
  };

  // Séparer les commandes en deux groupes : "Livraison" et "Livrées"
  const commandesEnlivraison = commandes.filter((commande) => commande.status === "livraison");
  const commandesLivrees = commandes.filter((commande) => commande.status === "livree");

  const CommandesTable = ({ commandes, title, showActions = true }) => (
    <div>
      <h2>{title}</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Nom Client</th>
            <th>Prénom Client</th>
            <th>Livreur</th>
            <th>Serveur</th>
            <th>Prix Total (MAD)</th>
            <th>Status</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.length > 0 ? (
            commandes.map((commande) => (
              <tr key={commande.commandeId}>
                <td>{commande.commandeId}</td>
                <td>{commande.nomClient}</td>
                <td>{commande.prenomClient}</td>
                <td>{commande.livreurId || "Non assigné"}</td>
                <td>{commande.serveurId || "Non assigné"}</td>
                <td>{commande.prixTotalCommande}</td>
                <td>{commande.status}</td>
                <td>{commande.adresse}</td>
                <td>
                  {showActions && commande.status === "livraison" && (
                    <>
                      <button onClick={() => updateStatus(commande.commandeId, "livree")}>
                        Marquer comme livrée
                      </button>
                    </>
                  )}
                  {showActions && commande.status === "livree" && <span>-</span>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Aucune commande {title.toLowerCase()}.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderLivreur />
      </header>

      {/* Table pour les commandes en attente de livraison */}
      <br />
      <br />
      <br />
      <CommandesTable commandes={commandesEnlivraison} title="Commandes en attente de livraison" />

      {/* Table pour les commandes déjà livrées */}
      <CommandesTable commandes={commandesLivrees} title="Commandes livrées" showActions={false} />
    </>
  );
};

export default ConsulterCommandeLivreur;
