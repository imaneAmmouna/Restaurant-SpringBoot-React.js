import React, { useState, useEffect } from 'react';
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ConsulterAdministrateur.css"; // Style pour votre composant

const ConsulterPlat = () => {
  const [categories, setCategories] = useState([]);
  const [menusByCategorie, setMenusByCategorie] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingMenu, setEditingMenu] = useState(null);
  const [updatedMenu, setUpdatedMenu] = useState({
    nomMenu: '',
    descriptionMenu: '',
    prixMenu: ''
  });

  // Récupérer toutes les catégories
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, []);

  // Récupérer les menus par catégorie
  const fetchMenusByCategorie = (categorieId) => {
    fetch(`http://localhost:8080/api/restaurant/menus/${categorieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMenusByCategorie((prevState) => ({
          ...prevState,
          [categorieId]: data,
        }));
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  // Activer l'édition du menu
  const startEditingMenu = (menu) => {
    setEditingMenu(menu.menuId);
    setUpdatedMenu({
      nomMenu: menu.nomMenu,
      descriptionMenu: menu.descriptionMenu,
      prixMenu: menu.prixMenu
    });
  };

  // Gérer la mise à jour des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMenu((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Envoyer la mise à jour du menu au backend
const updateMenu = (menuId) => {
  const updatedData = { ...updatedMenu };

  fetch(`http://localhost:8080/api/restaurant/menu/update/${menuId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      setMenusByCategorie((prevState) => {
        // Trouver la catégorie qui contient ce menu
        const categorieId = Object.keys(prevState).find((catId) =>
          prevState[catId].some((menu) => menu.menuId === menuId)
        );

        if (!categorieId) return prevState;

        // Mettre à jour le menu dans la bonne catégorie
        const updatedMenus = prevState[categorieId].map((menu) =>
          menu.menuId === menuId ? data : menu
        );

        return { ...prevState, [categorieId]: updatedMenus };
      });

      setEditingMenu(null);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
};

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>
      <div className="bodyCategories">
        <h2>Catégories et Menus</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div>
            {categories.map((categorie) => (
              <div key={categorie.categorieId} className="categorie-section">
                <h3>{categorie.nomCategorie}</h3>
                <button onClick={() => fetchMenusByCategorie(categorie.categorieId)}>
                  Voir les menus
                </button>

                {menusByCategorie[categorie.categorieId] && (
                  <table className="menu-table">
                    <thead>
                      <tr>
                        <th>Nom du Menu</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menusByCategorie[categorie.categorieId].map((menu) => (
                        <tr key={menu.menuId}>
                          <td>{menu.nomMenu}</td>
                          <td>{menu.descriptionMenu}</td>
                          <td>{menu.prixMenu} MAD</td>
                          <td>
                            <button onClick={() => startEditingMenu(menu)}>
                              Modifier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}

            {/* Formulaire d'édition de menu */}
            {editingMenu && (
              <div className="edit-form">
                <h3>Modifier le menu</h3>
                <label>Nom du Menu</label>
                <input
                  type="text"
                  name="nomMenu"
                  value={updatedMenu.nomMenu}
                  onChange={handleChange}
                />
                <label>Description</label>
                <textarea
                  name="descriptionMenu"
                  value={updatedMenu.descriptionMenu}
                  onChange={handleChange}
                />
                <label>Prix</label>
                <input
                  type="number"
                  name="prixMenu"
                  value={updatedMenu.prixMenu}
                  onChange={handleChange}
                />
                <button onClick={() => updateMenu(editingMenu)}>Sauvegarder</button>
                <button onClick={() => setEditingMenu(null)}>Annuler</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ConsulterPlat;
