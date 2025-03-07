import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../styles/HeaderClient.css";
import { useNavigate } from "react-router-dom";

const HeaderLivreur = () => {
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
                <a href="/dashboard-livreur" className={location.pathname === "/dashboard-livreur" ? "active" : ""}><b>Dashboard</b></a>
                <a href="/consulter-commande-livreur" className={location.pathname === "/consulter-commande-livreur" ? "active" : ""}><b>Commande</b></a>
                <a href="/profile-livreur" className={location.pathname === "/profile-livreur" ? "active" : ""}><b>Profile</b></a>
                <a href="" onClick={handleLogout}><b>Se déconnecter</b></a>
            </Nav>
        </Navbar>
    );
};

export default HeaderLivreur;
