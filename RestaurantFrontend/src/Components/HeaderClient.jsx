import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../styles/HeaderClient.css";
import { useNavigate } from "react-router-dom";

const HeaderClient = () => {
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
                <a href="/accueil-client" className={location.pathname === "/accueil-client" ? "active" : ""}><b>Menu</b></a>
                <a href="/cmd-client" className={location.pathname === "/cmd-client" ? "active" : ""}><b>Mes commandes</b></a>
                <a href="/passer-cmd-client" className={location.pathname === "/passer-cmd-client" ? "active" : ""}><b>Passer une commande</b></a>
                <a href="/panier-client" className={location.pathname === "/panier-client" ? "active" : ""}><b>Panier</b></a>
                <a href="/profile-client" className={location.pathname === "/profile-client" ? "active" : ""}><b>Profile</b></a>
                <a href="" onClick={handleLogout}><b>Se déconnecter</b></a>
            </Nav>
        </Navbar>
    );
};

export default HeaderClient;
