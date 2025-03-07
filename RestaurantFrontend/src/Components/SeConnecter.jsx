import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/SeConnecter.css";

const SeConnecter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si l'email se termine par _serveur@gmail.com (serveur)
    const isServeurEmail = /_serveur@gmail\.com$/.test(email);
    const isServeurPassword = /^Ser.*veuR$/.test(password);

    // Vérifier si l'email se termine par _serveur@gmail.com (livreur)
    const isLivreurEmail = /_livreur@gmail\.com$/.test(email);
    const isLivreurPassword = /^Liv.*reuR$/.test(password);

    // Vérifier si l'email se termine par _serveur@gmail.com (admin)
    const isAdminEmail = /_admin@gmail\.com$/.test(email);
    const isAdminPassword = /^Ad.*miN$/.test(password);

    // Vérification des emails et des mots de passe en fonction du rôle
    if (isServeurEmail && isServeurPassword) {
      const data = { email, password };
      fetch("http://localhost:8080/api/employees/serveur/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion serveur');
          }
          const token = response.headers.get("Authorization");
          return response.json().then(data => ({ data, token }));
        })
        .then(({ data, token }) => {
          if (token) {
            localStorage.setItem('jwtTokenServeur', token.split(' ')[1]); // Stocker le token
            setMessage("Connexion serveur réussie !");
            setTimeout(() => {
              navigate('/dashboard-serveur');
            }, 1000);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion serveur:', error);
          setMessage("Une erreur est survenue, veuillez réessayer.");
        });
    } else if (isLivreurEmail && isLivreurPassword) {
      const data = { email, password };
      fetch("http://localhost:8080/api/employees/livreur/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion livreur');
          }
          const token = response.headers.get("Authorization");
          return response.json().then(data => ({ data, token }));
        })
        .then(({ data, token }) => {
          if (token) {
            localStorage.setItem('jwtTokenLivreur', token.split(' ')[1]);
            localStorage.setItem('livreurId', data.livreurId);
            setMessage("Connexion livreur réussie !");
            setTimeout(() => {
              navigate('/dashboard-livreur');
            }, 1000);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion livreur:', error);
          setMessage("Une erreur est survenue, veuillez réessayer.");
        });
    } else if (isAdminEmail && isAdminPassword) {
      const data = { email, password };
      fetch("http://localhost:8080/api/admin/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion administrateur');
          }
          const token = response.headers.get("Authorization");
          return response.json().then(data => ({ data, token }));
        })
        .then(({ data, token }) => {
          if (token) {
            localStorage.setItem('jwtTokenAdmin', token.split(' ')[1]);
            setMessage("Connexion administrateur réussie !");
            setTimeout(() => {
              navigate('/dashboard-admin');
            }, 1000);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion administrateur:', error);
          setMessage("Une erreur est survenue, veuillez réessayer.");
        });
    } else {
      // Connexion pour les clients (cas par défaut)
      const data = { email, password };
      fetch("http://localhost:8080/api/clients/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion client');
          }
          const token = response.headers.get("Authorization");
          return response.json().then(data => ({ data, token }));
        })
        .then(({ data, token }) => {
          if (token) {
            localStorage.setItem('jwtToken', token.split(' ')[1]); // Stocker le token
            localStorage.setItem('clientId', data.clientId); // Stocker l'ID du client
            console.log("data:", data);
            setMessage("Connexion client réussie !");
            setTimeout(() => {
              navigate('/accueil-client');
            }, 1000);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion client:', error);
          setMessage("Une erreur est survenue, veuillez réessayer.");
        });
    }
  };

  return (
    <div className="se-connecter-page">
      <div className="form-content">
        <div className="message-affichee">
          {message && <p style={{ color: message.includes("réussie") ? 'green' : 'red' }}><b>{message}</b></p>}
        </div>
        <div className="loginContent">
          <form onSubmit={handleSubmit}>
            <div className="loginTitre">
              <h1>Se Connecter</h1>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="input-group mb-3">
              <button type="submit">Connexion</button>
            </div>
            <div className="text-center mt-3">
              <a href="/mot-de-passe-oublie" className="text-decoration-none">Mot de passe oublié ?</a>
            </div>
              <div className="text-center mt-2">
              <span>Je n'ai pas de compte ? </span>
              <a href="/creer-compte" className="text-decoration-none">Créer un compte</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeConnecter;
