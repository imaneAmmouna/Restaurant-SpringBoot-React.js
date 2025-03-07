import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import ServerStats from "./ServerStats"; // Importer le composant ServerStats

const DashboardAdmin = () => {
  return (
    <>
      {/* Header */}
      <header className="headerClient">
        <img src="public/images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>

      <h1>Bienvenue sur le Dashboard Admin</h1>

      {/* Affichage des statistiques des serveurs */}
      <ServerStats /> {/* Ajout du composant ServerStats */}

      {/* Tu peux ajouter d'autres éléments du tableau de bord ici */}
    </>
  );
};

export default DashboardAdmin;
