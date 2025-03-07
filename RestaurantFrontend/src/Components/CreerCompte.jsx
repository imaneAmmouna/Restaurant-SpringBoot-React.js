import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/CreerCompte.css";


const CreerCompte = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  // Empêche le rechargement de la page lors de la soumission

    // Validation de l'email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Veuillez entrer un email valide.");
        return;
      }

 // Vérifier si l'email se termine par _serveur@gmail.com, _livreur@gmail.com ou _admin@gmail.com
  const invalidEmails = /(_serveur|_livreur|_admin)@gmail\.com$/;
  if (invalidEmails.test(email)) {
    alert("L'email fourni n'est pas valide.");
    return;
  }

    // Préparer les données du client sous forme d'objet
    const clientData = {
      nomClient: nom,
      prenomClient: prenom,
      emailClient: email,
      passwordClient: password,
      telephoneClient: telephone,
    };


    // Envoi des données au backend via une requête POST
    fetch('http://localhost:8080/api/clients/save', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'Basic ' + btoa('admin:admin'), // Utilise le format "Basic base64(username:password)"
                  },
      body: JSON.stringify(clientData), // Transforme l'objet en JSON
    })
      .then(response => response.json())  // Récupère la réponse sous forme d'objet JSON
      .then(data => {
        console.log('Client ajouté:', data); // Affiche la réponse de l'API dans la console
        // Ici, tu peux rediriger l'utilisateur ou afficher un message de confirmation
        setMessage("Votre compte est ajouté avec succès !");
        // Redirection après 2 secondes
        setTimeout(() => {
          navigate('/se_connecter');
        }, 2000);
      })
      .catch((error) => {
        console.error('Erreur lors de la création du compte:', error); // Si une erreur survient
        setMessage("Une erreur est survenue, veuillez réessayer.");
      });
  };

  return (
      <div className="creer-compte-page">
         <div className="form-content">
          <div className="message-affichee">
          {message && <p style={{ color: message.includes("succès") ? 'green' : 'red' }}><b>{message}</b></p>}
          </div>
<div className="registerContent">
    <form onSubmit={handleSubmit}>
        <div className="registerTitre">
           <h1>Créer un compte</h1>
        </div>
        <div className="input-group mb-3">
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="form-control form-control-lg bg-light fs-6"
        placeholder="Nom"
        required
      />
      </div>
      <div className="input-group mb-3">
      <input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        className="form-control form-control-lg bg-light fs-6"
        placeholder="Prénom"
        required
      />
      </div>
      <div className="input-group mb-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control form-control-lg bg-light fs-6"
        placeholder="Email"
        required
      />
      </div>
      <div className="input-group mb-3">
      <input
        type="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="form-control form-control-lg bg-light fs-6"
        placeholder="Téléphone"
        required
        />
        </div>
        <div className="input-group mb-3">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control form-control-lg bg-light fs-6"
        placeholder="Mot de passe"
        required
      />
</div>
<div className="input-group mb-3">
      <button type="submit">Créer un compte</button>
      </div>
      <div className="text-center mt-2">
                    <span>J'ai deja un compte : </span>
                    <a href="/creer-compte" className="text-decoration-none">Connexion</a>
                  </div>
    </form>
    </div>
    </div>
    </div>
  );
};

export default CreerCompte;
