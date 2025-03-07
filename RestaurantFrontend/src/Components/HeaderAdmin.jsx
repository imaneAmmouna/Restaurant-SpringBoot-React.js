import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../styles/HeaderClient.css";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
    const location = useLocation();
      const navigate = useNavigate();

    const handleLogout = () => {
      // Supprimer les informations utilisateur du localStorage
      localStorage.removeItem("user");    // Si les informations utilisateur sont stockées sous la clé "user"
      localStorage.removeItem("token");   // Si vous stockez un token dans le localStorage

      // Optionnel : Supprimer les données liées à la session, si vous utilisez sessionStorage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");

      // Rediriger l'utilisateur vers la page de connexion ou l'accueil
      navigate("/"); // Par exemple, rediriger vers la page d'accueil
    };

    return (

        <Navbar className="px-4">
      <Nav className="navbar">
                <a href="/dashboard-admin" className={location.pathname === "/dashboard-admin" ? "active" : ""}><b>Dashboard</b></a>
                <div className="dropdown">
          <button className={`dropdown-btn ${location.pathname === "/ajouter" ? "active" : ""}`}><b>Ajouter</b></button>
          <div className="dropdown-content">
                <a href="/ajouter/employee" className={location.pathname === "/ajouter/employee" ? "active" : ""}><b>Employee</b></a>
                <a href="/ajouter/categorie" className={location.pathname === "/ajouter/categorie" ? "active" : ""}><b>Categorie</b></a>
                <a href="/ajouter/plat" className={location.pathname === "/ajouter/plat" ? "active" : ""}><b>Plat</b></a>
                </div>
                </div>
                <div className="dropdown">
          <button className={`dropdown-btn ${location.pathname === "/consulter" ? "active" : ""}`}><b>Consulter</b></button>
          <div className="dropdown-content">
                <a href="/consulter/livreur" className={location.pathname === "/consulter/livreur" ? "active" : ""}><b>Livreur</b></a>
                <a href="/consulter/serveur" className={location.pathname === "/consulter/serveur" ? "active" : ""}><b>Serveur</b></a>
                <a href="/consulter/administrateur" className={location.pathname === "/consulter/administrateur" ? "active" : ""}><b>Administrateur</b></a>
                <a href="/consulter/commande" className={location.pathname === "/consulter/commande" ? "active" : ""}><b>Commande</b></a>
                <a href="/consulter/categorie" className={location.pathname === "/consulter/categorie" ? "active" : ""}><b>Categorie</b></a>
                <a href="/consulter/plat" className={location.pathname === "/consulter/plat" ? "active" : ""}><b>Plat</b></a>
                </div>
                </div>
                <a href="/profile-admin" className={location.pathname === "/profile-admin" ? "active" : ""}><b>Profile</b></a>
                <a href="" onClick={handleLogout}><b>Se déconnecter</b></a>
            </Nav>
        </Navbar>
    );
};

export default HeaderAdmin;
