import React, { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import "../styles/ConsulterAdministrateur.css";
import "../styles/AjouterCategorie.css";

const AjouterEmployee = () => {
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cin, setCin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "livreur") {
      const isLivreurEmail = /_livreur@gmail\.com$/.test(email);
      const isLivreurPassword = /^Liv.*reuR$/.test(password);
      if (!isLivreurEmail) {
        setError("L'email du livreur doit correspondre au modèle: _livreur@gmail.com");
        return;
      }
      if (!isLivreurPassword) {
        setError("Le mot de passe du livreur doit correspondre au modèle: Liv...reuR");
        return;
      }
    }

    if (role === "serveur") {
      const isServeurEmail = /_serveur@gmail\.com$/.test(email);
      const isServeurPassword = /^Ser.*veuR$/.test(password);
      if (!isServeurEmail) {
        setError("L'email du livreur doit correspondre au modèle: _serveur@gmail.com");
        return;
      }
      if (!isServeurPassword) {
        setError("Le mot de passe du livreur doit correspondre au modèle: Ser...veuR");
        return;
      }
    }

    if (role === "admin") {
      const isAdminEmail = /_admin@gmail\.com$/.test(email);
      const isAdminPassword = /^Ad.*miN$/.test(password);
      if (!isAdminEmail) {
        setError("L'email du livreur doit correspondre au modèle: _admin@gmail.com");
        return;
      }
      if (!isAdminPassword) {
        setError("Le mot de passe du livreur doit correspondre au modèle: Ad...miN");
        return;
      }
    }

  let payload = {
    [`nom${role.charAt(0).toUpperCase() + role.slice(1)}`]: nom,
    [`prenom${role.charAt(0).toUpperCase() + role.slice(1)}`]: prenom,
    [`email${role.charAt(0).toUpperCase() + role.slice(1)}`]: email,
    [`password${role.charAt(0).toUpperCase() + role.slice(1)}`]: password,
    [`telephone${role.charAt(0).toUpperCase() + role.slice(1)}`]: telephone,
    [`cin${role.charAt(0).toUpperCase() + role.slice(1)}`]: cin,
    [`etat${role.charAt(0).toUpperCase() + role.slice(1)}`]: "actif",
  };

  console.log("Données envoyées :", payload);
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${role}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

    if (response.ok) {
      setSuccess("Employé ajouté avec succès!");
      setError("");
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Erreur lors de l'ajout de l'employé.");
      setSuccess("");
    }
  } catch (err) {
    setError("Erreur lors de l'ajout de l'employé.!");
    setSuccess("");
  }
  };

  return (
    <>
      <header className="headerClient">
        <img src="images/logo.png" alt="Logo" />
        <HeaderAdmin />
      </header>
      <div className="bodyCategories">
        <h1>Ajouter un Employé</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role">Sélectionner le rôle:</label>
            <div>
              <input
                type="radio"
                id="serveur"
                name="role"
                value="serveur"
                onChange={handleRoleChange}
                checked={role === "serveur"}
              />
              <label htmlFor="serveur">Serveur</label>
            </div>
            <div>
              <input
                type="radio"
                id="livreur"
                name="role"
                value="livreur"
                onChange={handleRoleChange}
                checked={role === "livreur"}
              />
              <label htmlFor="livreur">Livreur</label>
            </div>
            <div>
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                onChange={handleRoleChange}
                checked={role === "admin"}
              />
              <label htmlFor="admin">Admin</label>
            </div>
          </div>
          <div>
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="telephone">Téléphone:</label>
            <input
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cin">CIN:</label>
            <input
              type="text"
              id="cin"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <div>
            <button type="submit">Ajouter l'employé</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjouterEmployee;
