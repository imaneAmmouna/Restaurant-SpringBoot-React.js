import { useNavigate } from "react-router-dom";
import MenuCarousel from "./MenuCarousel";


const PageDepart = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className="headerDepart">
        <img src="images/logo.png" alt="Logo"/>
        <div className="buttons">
          <button onClick={() => navigate("/se_connecter")}><b>Connexion</b></button>
          <button onClick={() => navigate("/creer-compte")}><b>Créer un compte</b></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="bodyDepart">

        <div className="descrip-one">
        <h1>Bienvenue au Restaurant <i>PALETTE DES SAVEURS</i></h1>
        <p>Un lieu où la passion de la cuisine rencontre une ambiance chaleureuse.Nous offrons une expérience culinaire unique, alliant des saveurs traditionnelles et modernes !</p>
        </div>

        {/* Ajout du carrousel ici */}
        <MenuCarousel />

        <div className="descrip-two">
            <p>Nous sommes fiers de servir des plats préparés avec les ingrédients les plus frais et les plus savoureux,sélectionnés avec soin par nos chefs talentueux.</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="footerDepart">
        <p>&copy; 2025 Restaurant Palette des Saveurs. Tous droits réservés.</p>
        <div className="footer-links">
          <p>Mentions légales</p>
          <p>Politique de confidentialité</p>
          <p>Contact</p>
        </div>
      </footer>
    </>
  );
};

export default PageDepart;
