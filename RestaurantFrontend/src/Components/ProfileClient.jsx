import React, { useState, useEffect } from "react";
import HeaderClient from "./HeaderClient";
import "../styles/ProfileClient.css";

const ProfileClient = () => {
  const [client, setClient] = useState(null); // Store client data
  const [updatedClient, setUpdatedClient] = useState({}); // Store updated client data
  const [error, setError] = useState(""); // Store error messages
  const [loading, setLoading] = useState(true); // For loading state
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode

  useEffect(() => {
    document.body.classList.add("profile-body"); // Ajoute la classe au body
    return () => {
      document.body.classList.remove("profile-body"); // Retire la classe quand on quitte la page
    };
  }, []);

  useEffect(() => {
    // Function to fetch client profile data
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/clients/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil.");
        }

        const data = await response.json();
        setClient(data); // Store the client data in the state
        setUpdatedClient(data); // Initialize updatedClient with the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile(); // Fetch profile when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Utilisateur non connecté.");
      return;
    }
    try {
    const response = await fetch(`http://localhost:8080/api/clients/modifier-infos/${client.clientId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      }

      const data = await response.json();
      setClient(data); // Update the client data in the state
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo"/>
        <HeaderClient />
      </header>
      <div className="profile-container">
        <h2>Mon Profil</h2>
        {client && (
          <>
            <p><strong>Nom:</strong> {client.nomClient}</p>
            <p><strong>Prénom:</strong> {client.prenomClient}</p>
            <p><strong>Email:</strong> {client.emailClient}</p>
            <p><strong>Téléphone:</strong> {client.telephoneClient}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Modifier mes informations
            </button>
          </>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom:</label>
              <input
                type="text"
                name="nomClient"
                value={updatedClient.nomClient}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Prénom:</label>
              <input
                type="text"
                name="prenomClient"
                value={updatedClient.prenomClient}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="emailClient"
                value={updatedClient.emailClient}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Téléphone:</label>
              <input
                type="text"
                name="telephoneClient"
                value={updatedClient.telephoneClient}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="save-button">Sauvegarder</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)} // Cancel editing
              className="cancel-button"
            >
              Annuler
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProfileClient;
