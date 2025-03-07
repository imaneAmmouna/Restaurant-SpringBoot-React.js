import React, { useState, useEffect } from "react";
import "../styles/PageDepart.css";
import "../styles/MenuCarouselClient.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import PanierService from "../services/PanierService"; // Import du service panier


const MenuCarouselClient = ({ clientId }) => {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState({});
  const [message, setMessage] = useState("");

  // Récupérer les catégories au chargement du composant
  useEffect(() => {
    fetch('http://localhost:8080/api/restaurant/categories')
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => setCategories(data)) // Sauvegarder les catégories dans l'état
      .catch(error => console.error("Erreur de récupération des catégories : ", error));
  }, []);

  // Récupérer les menus de chaque catégorie au besoin
  useEffect(() => {
    categories.forEach(categorie => {
      if (!menus[categorie.categorieId]) { // Vérifier si les menus de cette catégorie ont déjà été chargés
        fetch(`http://localhost:8080/api/restaurant/menus/${categorie.categorieId}`)
          .then(response => response.json()) // Convertir la réponse en JSON
          .then(data => {
            setMenus(prevMenus => ({ ...prevMenus, [categorie.categorieId]: data })); // Sauvegarder les menus dans l'état
          })
          .catch(error => console.error("Erreur de récupération des menus : ", error));
      }
    });
  }, [categories, menus]);

  // Fonction pour ajouter un menu au panier
  const ajouterAuPanier = async (menu) => {
    const clientId = localStorage.getItem("clientId");
      if (!clientId) {
          setMessage("Veuillez vous connecter pour ajouter au panier.");
          setTimeout(() => setMessage(""), 1000);
          return;
        }

    try {
      const panierItem = {
        client:clientId,
        menu: menu.menuId,
        quantite: 1,
      };
      // Ajouter au panier via l'API
      await PanierService.ajouterAuPanier(panierItem);
      setMessage(`${menu.nomMenu} a été ajouté au panier!`);
      setTimeout(() => setMessage(""), 1000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      setMessage("Erreur lors de l'ajout au panier.");
    }
  };

  return (
    <div className="container">
        {message && <div className="message-ajout">{message}</div>}
      {categories.map(categorie => (
        <div key={categorie.categorieId}>
          <h2 className="titre-categ">{categorie.nomCategorie}</h2>

          {/* Vérifier si les menus sont disponibles pour cette catégorie */}
          {menus[categorie.categorieId] && (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={4} // Affiche 4 cartes à la fois
              loop={true} // Permet de boucler les slides
            >
              {menus[categorie.categorieId].map((menu, index) => (
                <SwiperSlide key={index} className="card-item">
                  <div className="card-link">
                    <img src="images/restau7.jpg" alt="Plat" className="card-image" />
                    <h2 className="card-title">{menu.nomMenu} - {menu.prixMenu} MAD</h2>
                    <p>{menu.descriptionMenu}</p>
                    <button className="add-to-cart-btn" onClick={() => ajouterAuPanier(menu)}>
                      <FontAwesomeIcon icon={faCartShopping} /> {/* Icône panier */}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuCarouselClient;
