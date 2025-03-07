import React, { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";
import "../styles/CommandeClient.css";

const CommandeClient = () => {
  // État pour stocker les commandes récupérées
  const [commandes, setCommandes] = useState([]);
  // État pour gérer le chargement des données
  const [loading, setLoading] = useState(true);

  // Récupération du clientId depuis localStorage
  const clientId = localStorage.getItem("clientId");
  // Fonction pour récupérer les commandes du client
  const fetchCommandes = async () => {
    try {
      // Remplacer par l'URL de votre API backend
      const response = await fetch(`http://localhost:8080/api/commandes/historique/${clientId}`);
      const data = await response.json();
      if (response.ok) {
        setCommandes(data);
      } else {
        console.error("Erreur lors de la récupération des commandes.");
      }
    } catch (error) {
      console.error("Erreur réseau : ", error);
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour récupérer les données lors du chargement du composant
  useEffect(() => {
    if (clientId) {
      fetchCommandes();
    } else {
      console.log("Client ID introuvable dans localStorage.");
      setLoading(false);
    }
  }, [clientId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderClient />
      </header>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Mes Commandes</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">N° Cmd</th>
              <th className="border p-2">Nom de la catégorie</th>
              <th className="border p-2">Nom du plat</th>
              <th className="border p-2">Prix Unitaire (MAD)</th>
              <th className="border p-2">Quantité</th>
              <th className="border p-2">Adresse</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Prix Total(MAD)</th>
            </tr>
          </thead>
          <tbody>
            {commandes.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">Aucune commande trouvée.</td>
              </tr>
            ) : (
              commandes.map((commande, index) =>
                commande.details.map((detail, subIndex) => (
                  <tr key={`${commande.commande_id}-${subIndex}`} className="border">
                    {subIndex === 0 && (
                      <td className="border p-2 text-center" rowSpan={commande.details.length}>
                        {index +1 }
                      </td>
                    )}
                    <td className="border p-2">{detail.categorie}</td>
                    <td className="border p-2">{detail.menu}</td>
                    <td className="border p-2 text-center">{detail.prixMenu}</td>
                    <td className="border p-2 text-center">{detail.quantite}</td>
                    {subIndex === 0 && (
                      <>
                        <td className="border p-2" rowSpan={commande.details.length}>
                          {commande.adresse}
                        </td>
                        <td className="border p-2 text-center" rowSpan={commande.details.length}>
                          {commande.status}
                        </td>
                        <td className="border p-2 text-center" rowSpan={commande.details.length}>
                          {commande.prixTotal}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommandeClient;
