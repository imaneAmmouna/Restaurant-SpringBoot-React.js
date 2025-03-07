import React, { useState, useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ProfileClient.css";

const ProfileAdmin = () => {
  const [admin, setAdmin] = useState(null); // Store admin data
  const [updatedAdmin, setUpdatedAdmin] = useState({}); // Store updated admin data
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
    // Function to fetch admin profile data
    const fetchProfile = async () => {
      const tokenAdmin = localStorage.getItem("jwtTokenAdmin");
      if (!tokenAdmin) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/admin/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${tokenAdmin}`,
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil de l'admin.");
        }

        const data = await response.json();
        localStorage.setItem("adminId", data.adminId);
        console.log("data",data);
        setAdmin(data); // Store the admin data in the state
        setUpdatedAdmin(data); // Initialize updatedAdmin with the fetched data
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
    setUpdatedAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenAdmin = localStorage.getItem("jwtTokenAdmin");
    const adminId = localStorage.getItem("adminId");
    if (!tokenAdmin) {
      setError("Utilisateur non connecté.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin/modifier-infos/${adminId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${tokenAdmin}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdmin),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      }

      const data = await response.json();
      setAdmin(data); // Update the admin data in the state
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      {/* Header */}
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>

      <div className="profile-container">
        <h2>Mon Profil</h2>
        {admin && (
          <>
            <p><strong>Nom:</strong> {admin.nomAdmin}</p>
            <p><strong>Prénom:</strong> {admin.prenomAdmin}</p>
            <p><strong>Email:</strong> {admin.emailAdmin}</p>
            <p><strong>Téléphone:</strong> {admin.telephoneAdmin}</p>
            <p><strong>CIN:</strong> {admin.cinAdmin}</p>
            <p><strong>Mot de passe:</strong> ********</p>
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
                name="nomAdmin"
                value={updatedAdmin.nomAdmin || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Prénom:</label>
              <input
                type="text"
                name="prenomAdmin"
                value={updatedAdmin.prenomAdmin || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="emailAdmin"
                value={updatedAdmin.emailAdmin || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Téléphone:</label>
              <input
                type="text"
                name="telephoneAdmin"
                value={updatedAdmin.telephoneAdmin || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Mot de passe:</label>
              <input
                type="text"
                name="passwordAdmin"
                value={updatedAdmin.passwordAdmin || ""}
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

export default ProfileAdmin;
