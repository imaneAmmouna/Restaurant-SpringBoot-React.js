import React, { useEffect, useState } from "react";
import HeaderServeur from "./HeaderServeur";

const ConsulterCommandeServeur = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/commandes/livreur/afficher")
      .then((response) => response.json())
      .then((data) => {
        const commandesFiltrees = data.filter(
          (commande) => commande.status === "preparation" || commande.status === "prete"
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
  const commandesEnpreparation = commandes.filter((commande) => commande.status === "preparation");
  const commandesPretes = commandes.filter((commande) => commande.status === "prete");

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
                  {showActions && commande.status === "preparation" && (
                    <>
                      <button onClick={() => updateStatus(commande.commandeId, "prete")}>
                        Marquer comme prete
                      </button>
                    </>
                  )}
                  {showActions && commande.status === "prete" && <span>-</span>}
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
        <HeaderServeur />
      </header>

      <br />
      <br />
      <br />
      <CommandesTable commandes={commandesEnpreparation} title="Commandes en cours de preparation" />

      {/* Table pour les commandes déjà livrées */}
      <CommandesTable commandes={commandesPretes} title="Commandes pretes" showActions={false} />
    </>
  );
};

export default ConsulterCommandeServeur;
