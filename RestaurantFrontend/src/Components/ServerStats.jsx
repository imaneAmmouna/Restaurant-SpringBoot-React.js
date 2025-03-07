import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const ServerAndLivreurStats = () => {
  // Serveur Stats
  const [activeServers, setActiveServers] = useState(0); // Nombre de serveurs actifs
  const [inactiveServers, setInactiveServers] = useState(0); // Nombre de serveurs inactifs
  const [totalServers, setTotalServers] = useState(0); // Nombre total de serveurs

  // Livreur Stats
  const [activeLivreurs, setActiveLivreurs] = useState(0); // Nombre de livreurs actifs
  const [inactiveLivreurs, setInactiveLivreurs] = useState(0); // Nombre de livreurs inactifs
  const [totalLivreurs, setTotalLivreurs] = useState(0); // Nombre total de livreurs

  useEffect(() => {
    // Cette partie récupère les données depuis le backend (Spring Boot + MySQL)
    const fetchData = async () => {
      try {
        // Effectuer une requête API vers ton backend pour obtenir les stats des serveurs
        const serverResponse = await fetch("http://localhost:8080/api/employees/serveur/stats");
        const serverData = await serverResponse.json();

        setActiveServers(serverData.activeServeurs); // Remplacer "active" par "activeServeurs"
        setInactiveServers(serverData.inactiveServeurs); // Remplacer "inactive" par "inactiveServeurs"
        setTotalServers(serverData.totalServeurs); // Remplacer "total" par "totalServeurs"

        // Effectuer une requête API pour obtenir les stats des livreurs
        const livreurResponse = await fetch("http://localhost:8080/api/employees/livreur/stats");
        const livreurData = await livreurResponse.json();

        setActiveLivreurs(livreurData.activeLivreurs); // Remplacer "active" par "activeLivreurs"
        setInactiveLivreurs(livreurData.inactiveLivreurs); // Remplacer "inactive" par "inactiveLivreurs"
        setTotalLivreurs(livreurData.totalLivreurs); // Remplacer "total" par "totalLivreurs"
      } catch (error) {
        console.error("Erreur lors de la récupération des données des serveurs et livreurs", error);
      }
    };

    fetchData();
  }, []); // Cette fonction se déclenche au premier rendu du composant

  // Calculer les pourcentages pour Serveur
  const activeServerPercentage = (activeServers / totalServers) * 100;
  const inactiveServerPercentage = 100 - activeServerPercentage;

  // Calculer les pourcentages pour Livreur
  const activeLivreurPercentage = (activeLivreurs / totalLivreurs) * 100;
  const inactiveLivreurPercentage = 100 - activeLivreurPercentage;

  // Données pour les graphiques circulaires
  const serverData = [
    { name: "Serveurs Actifs", value: activeServerPercentage },
    { name: "Serveurs Inactifs", value: inactiveServerPercentage },
  ];

  const livreurData = [
    { name: "Livreurs Actifs", value: activeLivreurPercentage },
    { name: "Livreurs Inactifs", value: inactiveLivreurPercentage },
  ];

  // Couleurs pour les graphiques
  const COLORS = ["#4caf50", "#f44336"]; // Vert pour actif, rouge pour inactif

  return (
    <div>
      <h3>Statistiques des Serveurs</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={serverData}
          cx={150} // Position X du centre
          cy={150} // Position Y du centre
          innerRadius={60} // Rayon interne pour faire un cercle
          outerRadius={90} // Rayon externe du graphique
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {serverData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <div>
        <p>Serveurs actifs: {activeServers} ({activeServerPercentage.toFixed(2)}%)</p>
        <p>Serveurs inactifs: {inactiveServers} ({inactiveServerPercentage.toFixed(2)}%)</p>
      </div>

      <h3>Statistiques des Livreurs</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={livreurData}
          cx={150} // Position X du centre
          cy={150} // Position Y du centre
          innerRadius={60} // Rayon interne pour faire un cercle
          outerRadius={90} // Rayon externe du graphique
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {livreurData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <div>
        <p>Livreurs actifs: {activeLivreurs} ({activeLivreurPercentage.toFixed(2)}%)</p>
        <p>Livreurs inactifs: {inactiveLivreurs} ({inactiveLivreurPercentage.toFixed(2)}%)</p>
      </div>
    </div>
  );
};

export default ServerAndLivreurStats;
