import React, { useEffect, useState } from "react";
import HeaderLivreur from "./HeaderLivreur";

const DashboardLivreur = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/commandes/livreur/afficher")
      .then((response) => response.json())
      .then((data) => {
        const commandesFiltrees = data.filter((commande) => commande.status === "prete");
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

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderLivreur />
      </header>
      <div>
        <h2>Commandes prete</h2>
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
                    <button onClick={() => updateStatus(commande.commandeId, "livraison")}>
                      Livraison
                    </button>
                    <button onClick={() => updateStatus(commande.commandeId, "livree")}>
                      Livrée
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Aucune commande prete.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardLivreur;
