import React, { useState, useEffect } from "react";
import HeaderClient from "./HeaderClient";
import "../styles/PanierClient.css"; // Fichier CSS
import PanierService from "../services/PanierService"; // Import du service panier

const PanierClient = () => {
  const [cart, setCart] = useState([]);
  const clientId = localStorage.getItem('clientId');
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState({}); // Remplacer selectedItems par selectedItem
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false); // Initialiser l'état pour afficher l'input d'adresse
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // Ajouter un état pour gérer le statut du bouton

  // Charger les données du panier
  useEffect(() => {
    if (!clientId) return; // Empêche la requête si `clientId` est null

    fetch(`http://localhost:8080/api/panier/afficher/${clientId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Log avant de créer le tableau des items formatés
          console.log("Données reçues:", data);
          // Adaptation du format des données
          const formattedCart = data.map((item) => ({
            id: item.panierId, // Utilise l'ID du panier
            name: item.menu.nomMenu, // Accède au nom du menu via l'objet `menu`
            description: item.menu.descriptionMenu, // Accède à la description
            price: item.menu.prixMenu, // Accède au prix
            quantity: item.quantite, // Utilise la quantité directement
            menuId: item.menu.menuId,
            selected: item.selected,
          }));

          setCart(formattedCart);
          setTotalPrice(data.totalPrice || 0);
        } else {
          setCart([]);
          setTotalPrice(0);
        }
      })
      .catch((err) => console.error("Erreur lors du chargement du panier", err));
  }, [clientId]); // Ajout de `clientId` comme dépendance

  // Ajouter un article au panier
  const addToCart = (item) => {
    fetch("http://localhost:8080/api/panier/ajouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then(() => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((i) => i.id === item.id);
          if (existingItem) {
            return prevCart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          }
          return [...prevCart, { ...item, quantity: 1 }];
        });
      });
  };

  const updateCart = (panierId, newQuantity) => {
    fetch("http://localhost:8080/api/panier/modifier", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ panierId, quantite: newQuantity }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === panierId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((err) => console.error("Erreur lors de la mise à jour", err));
  };

  // Supprimer un article du panier
  const removeFromCart = (id) => {
    fetch(`http://localhost:8080/api/panier/supprimer/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));

      // Mettre à jour l'état des éléments sélectionnés
      setSelectedItem((prevSelectedItem) => {
        const newSelectedItem = { ...prevSelectedItem };
        delete newSelectedItem[id]; // Supprimer l'élément correspondant
        return newSelectedItem;
      });
    })
    .catch((err) => console.error(err));
};

useEffect(() => {
  const newTotalPrice = cart.reduce((acc, item) => {
    if (item.selected) {
      return acc + (item.price * item.quantity);
    }
    return acc;
  }, 0);
  setTotalPrice(newTotalPrice);
}, [cart]);


const handleItemSelect = async (panierId) => {
  // Trouver l'élément correspondant dans le panier
  const itemIndex = cart.findIndex((item) => item.id === panierId);
  if (itemIndex === -1) return;

  const updatedSelection = !cart[itemIndex].selected; // Inverser l'état actuel

  try {
    // Envoyer la requête PUT pour mettre à jour la sélection dans la BD
    const response = await fetch(`http://localhost:8080/api/panier/modifier-selection/${panierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected: updatedSelection }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de la sélection.");
    }

    // Mettre à jour l'état du panier côté frontend après le succès de la requête
    const updatedCart = [...cart];
    updatedCart[itemIndex].selected = updatedSelection;
    setCart(updatedCart); // Met à jour l'état du panier

  } catch (error) {
    console.error("Erreur:", error);
  }
};



const handlePlaceOrder = () => {
  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }

  if (!deliveryAddress.trim()) {
    alert("Veuillez entrer une adresse de livraison.");
    return;
  }

  // Filtrer uniquement les éléments sélectionnés
  const selectedItemsForOrder = cart.filter(item => item.selected);

  if (selectedItemsForOrder.length === 0) {
    alert("Veuillez sélectionner des articles à commander.");
    return;
  }

  // Préparer les données de la commande
  const commandeData = {
    clientId,
    menus: selectedItemsForOrder.map((item) => ({
      menuId: item.menuId, // Correction
      quantite: item.quantity,
    })),
    adresse: deliveryAddress,
  };

  console.log("Commande envoyée :", commandeData);

  // Envoi de la commande au backend
  fetch("http://localhost:8080/api/commandes/passer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commandeData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Commande passée avec succès !");
        setCart([]);
        setDeliveryAddress("");
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors du passage de la commande.");
    });
};


  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleShowAddressInput = () => {
    setShowAddressInput(true); // Afficher l'input de l'adresse
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderClient />
      </header>

      <div className="panier-container">
        <h2>Mon Panier :</h2>
        {cart.length === 0 ? <p>Votre panier est vide.</p> : null}

        {cart.map((item) => (
          <div
            key={`${item.id}`}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
        <input
          type="checkbox"
          checked={item.selected || false} // Utiliser l'état `isSelected` provenant de la BD
          onChange={() => handleItemSelect(item.id)} // Appeler la fonction pour mettre à jour
        />
              </div>
              <p>Prix Unitaire: {item.price} MAD</p>
              <p>Quantité: {item.quantity}</p>
              <div>
                <button className="button-panier" onClick={() => updateCart(item.id, item.quantity + 1)}>➕</button>
                <button className="button-panier" onClick={() => updateCart(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>➖</button>
                <button className="button-panier" onClick={() => removeFromCart(item.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}

        <div className="total-panier">
          <h3>Total: {totalPrice} MAD</h3>
        </div>

        {/* Bouton "Passer une commande" qui devient invisible après le clic */}
        {!showAddressInput && (
          <button
            className="button-panier"
            onClick={handleShowAddressInput}
            disabled={isOrderPlaced} // Désactiver le bouton après la commande
          >
            Passer une commande
          </button>
        )}

        {/* Input de l'adresse caché, visible après le clic sur "Passer une commande" */}
        {showAddressInput && (
          <div className="address-container">
            <label>
              Adresse de livraison:
              <input
                type="text"
                value={deliveryAddress}
                onChange={handleAddressChange}
                placeholder="Entrez l'adresse de livraison"
              />
            </label>
            <button
              className="button-panier-confirmer"
              onClick={handlePlaceOrder}
              disabled={isOrderPlaced} // Désactiver le bouton après la commande
            ><b>
              Confirmer la commande</b>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PanierClient;
