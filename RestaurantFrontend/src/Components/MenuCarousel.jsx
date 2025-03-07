import React, { useState, useEffect } from "react";
import "../styles/PageDepart.css"; // Utilisation des mêmes styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MenuCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState({});

  // Récupérer les catégories au chargement du composant
  useEffect(() => {
    fetch('http://localhost:8080/api/restaurant/categories')
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => setCategories(data)) // Sauvegarder les catégories dans l'état
      .catch(error => console.error("Erreur de récupération des catégories : ", error));
  }, []);

  // Récupérer les menus de chaque catégorie au besoin
  const loadMenus = (categorieId) => {
    if (!menus[categorieId]) { // Vérifier si les menus de cette catégorie ont déjà été chargés
      fetch(`http://localhost:8080/api/restaurant/menus/${categorieId}`)
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
          setMenus(prevMenus => ({ ...prevMenus, [categorieId]: data })); // Sauvegarder les menus dans l'état
        })
        .catch(error => console.error("Erreur de récupération des menus : ", error));
    }
  };

  return (
    <div className="container">
      {categories.map(categorie => (
        <div key={categorie.categorieId}>
          <h2 className="titre-categ">{categorie.nomCategorie}</h2>
          {/* Appeler la fonction pour charger les menus de cette catégorie */}
          {loadMenus(categorie.categorieId)}

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

export default MenuCarousel;
