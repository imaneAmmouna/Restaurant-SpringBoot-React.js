import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageDepart from './Components/PageDepart'; // Page d'accueil
import SeConnecter from './Components/SeConnecter'; // Page "Se connecter"
import CreerCompte from './Components/CreerCompte'; // Page "Créer un compte"
import AccueilClient from './Components/AccueilClient';
import CommandeClient from './Components/CommandeClient';
import PasserCommandeClient from './Components/PasserCommandeClient';
import PanierClient from './Components/PanierClient';
import ProfileClient from './Components/ProfileClient';

import DashboardAdmin from './Components/DashboardAdmin'; // Page Dashboard Admin
import AjouterEmployee from './Components/AjouterEmployee'; // Page Ajouter Employee
import AjouterCategorie from './Components/AjouterCategorie'; // Page Ajouter Categorie
import AjouterPlat from './Components/AjouterPlat'; // Page Ajouter Plat
import ConsulterLivreur from './Components/ConsulterLivreur'; // Page Consulter Employee
import ConsulterServeur from './Components/ConsulterServeur';
import ConsulterAdministrateur from './Components/ConsulterAdministrateur';
import ConsulterCommande from './Components/ConsulterCommande';
import ConsulterCategorie from './Components/ConsulterCategorie'; // Page Consulter Categorie
import ConsulterPlat from './Components/ConsulterPlat'; // Page Consulter Plat
import ProfileAdmin from './Components/ProfileAdmin'; // Page Profile Admin

import DashboardLivreur from './Components/DashboardLivreur';
import ConsulterCommandeLivreur from './Components/ConsulterCommandeLivreur';
import ProfileLivreur from './Components/ProfileLivreur';

import DashboardServeur from './Components/DashboardServeur';
import ConsulterCommandeServeur from './Components/ConsulterCommandeServeur';
import ProfileServeur from './Components/ProfileServeur';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageDepart />} />
        <Route path="/se_connecter" element={<SeConnecter />} />
        <Route path="/creer-compte" element={<CreerCompte />} />
        <Route path="/accueil-client" element={<AccueilClient />} />
        <Route path="/cmd-client" element={<CommandeClient />} />
        <Route path="/passer-cmd-client" element={<PasserCommandeClient />} />
        <Route path="/panier-client" element={<PanierClient />} />
        <Route path="/profile-client" element={<ProfileClient />} />

        {/* Routes Admin */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/ajouter/employee" element={<AjouterEmployee />} />
        <Route path="/ajouter/categorie" element={<AjouterCategorie />} />
        <Route path="/ajouter/plat" element={<AjouterPlat />} />
        <Route path="/consulter/livreur" element={<ConsulterLivreur />} />
        <Route path="/consulter/serveur" element={<ConsulterServeur />} />
        <Route path="/consulter/administrateur" element={<ConsulterAdministrateur />} />
        <Route path="/consulter/commande" element={<ConsulterCommande />} />
        <Route path="/consulter/categorie" element={<ConsulterCategorie />} />
        <Route path="/consulter/plat" element={<ConsulterPlat />} />
        <Route path="/profile-admin" element={<ProfileAdmin />} />

        {/* Routes Livreur */}
        <Route path="/dashboard-livreur" element={<DashboardLivreur />} />
        <Route path="/consulter-commande-livreur" element={<ConsulterCommandeLivreur />} />
        <Route path="/profile-livreur" element={<ProfileLivreur />} />

        {/* Routes Serveur */}
        <Route path="/dashboard-serveur" element={<DashboardServeur />} />
        <Route path="/consulter-commande-serveur" element={<ConsulterCommandeServeur />} />
        <Route path="/profile-serveur" element={<ProfileServeur />} />
      </Routes>
    </Router>
  );
}

export default App;
