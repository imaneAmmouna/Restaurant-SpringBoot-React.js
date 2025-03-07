import React, { useState, useEffect } from "react";
import HeaderClient from "./HeaderClient";
import "../styles/PasserCommandeClient.css";

const PasserCommandeClient = ({ clientId }) => {
  const [categories, setCategories] = useState([]);  // Stocke les catégories récupérées
  const [menus, setMenus] = useState({});  // Stocke les menus pour chaque catégorie
  const [menuSelections, setMenuSelections] = useState({});  // Stocke les quantités sélectionnées pour chaque menu
  const [adresse, setAdresse] = useState("");  // Adresse de livraison
  const [message, setMessage] = useState("");  // Message d'état pour afficher une confirmation ou une erreur
  const [activeCategory, setActiveCategory] = useState(null);  // Catégorie active pour l'affichage des menus

  // Récupérer les catégories lors du chargement initial du composant
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur de récupération des catégories : ", error)
      );
  }, []);

  // Récupérer les menus lorsque les catégories sont disponibles
  useEffect(() => {
    categories.forEach((categorie) => {
      // Vérifie si les menus de cette catégorie ont déjà été récupérés
      if (!menus[categorie.categorieId]) {
        fetch(`http://localhost:8080/api/restaurant/menus/${categorie.categorieId}`)
          .then((response) => response.json())
          .then((data) => {
            // Mise à jour de l'état des menus
            setMenus((prevMenus) => ({ ...prevMenus, [categorie.categorieId]: data }));
          })
          .catch((error) => console.error("Erreur de récupération des menus : ", error));
      }
    });
  }, [categories]);

  // Gérer la sélection des menus avec la quantité
  const handleMenuSelection = (menuId, quantity) => {
    setMenuSelections((prevSelections) => ({
      ...prevSelections,
      [menuId]: quantity,
    }));
  };

  // Gérer le clic sur une catégorie pour afficher/masquer les menus de cette catégorie
  const handleCategoryClick = (categorieId) => {
    setActiveCategory((prev) => (prev === categorieId ? null : categorieId));
  };

  // Gérer l'envoi de la commande
  const handleSubmit = (event) => {
    event.preventDefault();
    const clientId = localStorage.getItem("clientId");

    // Filtrer les menus sélectionnés avec une quantité > 0
    const selectedMenus = Object.keys(menuSelections)
      .filter((menuId) => menuSelections[menuId] > 0)
      .map((menuId) => ({
        menuId: parseInt(menuId),
        quantite: menuSelections[menuId],
      }));

    // Préparer les données de la commande à envoyer au backend
    const commandeData = {
      clientId,
      menus: selectedMenus,  // Utilise "menus" au lieu de "selectedMenus" pour correspondre à ce qui est attendu dans le backend
      adresse,
    };
console.log("Commande:", commandeData);
    // Envoi de la commande au backend
    fetch("http://localhost:8080/api/commandes/passer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandeData),
    })
      .then((response) => response.json())  // Traiter la réponse JSON
      .then((data) => {
        setMessage("Commande passée avec succès !");
        console.log("Commande:", data);
      })
      .catch((error) => {
        setMessage("Erreur lors du passage de la commande");
        console.error("Erreur:", error);
      });
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderClient />
      </header>

      <main>
        <h1>Passer une commande</h1>

        <form onSubmit={handleSubmit}>
          {/* Afficher les catégories */}
          {categories.map((categorie) => (
            <div key={categorie.categorieId} className="category-container">
              <p
                className="category-title"
                onClick={() => handleCategoryClick(categorie.categorieId)}  // Afficher/Masquer les menus de cette catégorie
              >
                {categorie.nomCategorie}
              </p>

              <div
                className={`menu-items ${activeCategory === categorie.categorieId ? "show" : ""}`}
              >
                {/* Afficher les menus de la catégorie active */}
                {menus[categorie.categorieId]?.map((menu) => (
                  <div key={menu.menuId}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleMenuSelection(menu.menuId, e.target.checked ? 1 : 0)  // Mettre à jour la sélection
                        }
                      />
                      {menu.nomMenu} - {menu.prixMenu} MAD
                    </label>

                    {/* Afficher un champ de saisie de la quantité si le menu est sélectionné */}
                    {menuSelections[menu.menuId] > 0 && (
                      <input
                        type="number"
                        value={menuSelections[menu.menuId]}
                        min="1"
                        onChange={(e) =>
                          handleMenuSelection(menu.menuId, parseInt(e.target.value))  // Changer la quantité
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Champ pour entrer l'adresse de livraison */}
          <div className="address-container">
            <label htmlFor="adresse">Adresse de livraison :</label>
            <input
              type="text"
              name="adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>

          {/* Bouton pour soumettre la commande */}
          <div className="button-container">
            <button type="submit">Commander</button>
          </div>
        </form>

        {/* Affichage des messages de succès ou d'erreur */}
        {message && <p className="p-container">{message}</p>}
      </main>
    </>
  );
};

export default PasserCommandeClient;
