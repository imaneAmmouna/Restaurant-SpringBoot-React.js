# Restaurant-SpringBoot-React.js

* Description

Cette application est un **système de gestion des commandes d'un restaurant en ligne**. Le backend utilisé **Spring Boot** et **MySQL** pour la gestion des données, tandis que le frontend est développé avec **React.js** et **Vite** pour offrir une expérience utilisateur fluide et rapide.

## Technologies utilisées

**Backend :**
  - **Spring Boot** : Framework Java pour créer des applications backend robustes.
  - **MySQL** : Base de données relationnelle pour stocker les informations relatives aux utilisateurs, aux menus, aux commandes, etc.
  - **JWT (JSON Web Tokens)** : Pour la gestion des sessions et des authentifications sécurisées.
  - **Lombok** : Pour la réduction de la verbosité du code Java (gestion des getters/setters, etc.).
  - **Spring Security** : Pour sécuriser l'application.

**Frontend :**:
  - **React.js** : Bibliothèque JavaScript pour construire des interfaces utilisateur interactives.
  - **Vite** : Un outil de build rapide et moderne pour React.js.

## Structure du projet

Le projet est divisé en deux parties principales :

### 1. Backend (`RestaurantBackend`)
- **Spring Boot** pour la logique côté serveur.
- **JPA/Hibernate** pour l'interaction avec la base de données MySQL.
- API RESTful pour la gestion des données du restaurant (menu, commandes, etc.).
- Sécurisation avec **Spring Security** et gestion de l'authentification via **JWT**.
  
**Dépendances principales** :
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- MySQL Connector
- JJWT pour l'authentification

### 2. Frontend (`RestaurantFrontend`)
- **React.js avec Vite** pour une interface utilisateur moderne et réactive.
- Utilisation de **fetch** pour interagir avec l'API backend.
- Mise en place de pages principales comme l'affichage du menu, la gestion des commandes, et le profil client ...

## Fonctionnalités de l'application

L'application de gestion des commandes d'un restaurant en ligne offre plusieurs fonctionnalités pour faciliter l'expérience des différents utilisateurs. Elle est structurée autour de quatre types d'acteurs principaux : **les clients**, **les administrateurs**, et les **gérants de restaurant**.

### 1. Page d'accueil

La page d'accueil est la première interface avec laquelle l'utilisateur interagit. Elle affiche :
- Le **menu** avec des catégories de plats et les plats disponibles dans chaque catégorie.
- Les utilisateurs peuvent naviguer entre les différentes catégories pour voir les plats.
- **Connexion / Création de compte** : L'utilisateur peut se connecter s'il possède déjà un compte ou en créer un nouveau s'il est un nouvel utilisateur.

### 2. Clients

Les **clients** ont les actions suivantes :

#### 2.1 **Création de compte et connexion**
- Un client peut **créer un compte** en fournissant des informations telles que son email, mot de passe, et d'autres informations personnelles.
- Après la création d'un compte, le client peut se **connecter** en utilisant son email et son mot de passe.

#### 2.2 **Page d'accueil après connexion**
- Une fois connecté, le client accède à une page d'accueil qui affiche **le menu** avec les prix des plats.
- Le client peut consulter chaque **catégorie de plats** et les plats associés à chaque catégorie.

#### 2.3 **Ajout au panier**
- Depuis la page d'accueil, le client peut **ajouter un plat au panier** en sélectionnant le plat souhaité.
- Le client peut **ajuster la quantité** d'un plat dans le panier ou le **supprimer** si nécessaire.

#### 2.4 **Passer une commande**
- Le client peut **passer une commande** de deux manières :
  1. En sélectionnant directement les plats depuis la **liste des plats**.
  2. En finalisant la commande avec les éléments déjà ajoutés dans le **panier**.
  
#### 2.5 **Suivi des commandes**
- Le client peut consulter et **suivre ses commandes** passées, voir le statut de chaque commande et les détails (plats, quantité, prix).

#### 2.6 **Profil utilisateur**
- Le client peut consulter son **profil ** contenant ses informations personnelles.
- Il peut également **modifier** ses informations (comme l'email, le mot de passe, etc.).

### 2.7 **Panier**

Le **panier** est une fonctionnalité essentielle où le client peut gérer les plats qu'il a l'intention de commander. Il permet de :
- **Voir** tous les plats ajoutés.
- **Ajuster la quantité** des plats dans le panier.
- **Sélectionner les éléments spécifiques** pour les commander ou les supprimer.
- Passer une commande directement depuis le panier.

### Les employés

- Les employés ne peuvent pas créer de compte. Ils doivent se **connecter** en utilisant un email et un mot de passe prédéfinis.
- Chaque employé possède un **mot de passe et email** spécifiques, qui sont ignorés pour les clients.

### 1. Administrateur

L'**administrateur** possède des privilèges étendus pour gérer l'ensemble du système :

#### 1.1 **Dashboard (Tableau de bord)**
- L'administrateur dispose d'un **tableau de bord** où il peut suivre :
  - Le **pourcentage des employés** en travail et ceux qui sont partis.
  - Le suivi des **commandes**, y compris les détails des commandes passées et en cours.

#### 1.2 **Gestion du profil**
- L'administrateur peut consulter et **modifier ses informations personnelles** dans la section **profil**.

#### 1.3 **Ajout et gestion des employés**
- L'administrateur peut **ajouter des employés** (serveurs, livreurs, ou même d'autres administrateurs).
- Il peut activer ou désactiver les comptes des employés, ce qui détermine s'ils peuvent accéder ou non à l'application.

#### 1.4 **Ajout des catégories et des plats**
- L'administrateur peut **ajouter des catégories** et des plats à la carte du restaurant.

#### 1.5 **Consultation des informations**
- L'administrateur peut **consulter** toutes les **catégories**, **plats**, **commandes**, et les **détails des commandes** passées.
- Il peut également consulter la liste des **employés** (serveurs, livreurs, administrateurs).

#### 1.6 **Modification des informations des employés**
- Seuls les administrateurs peuvent **modifier les informations des serveurs et livreurs**, telles que l'activation/désactivation de leur compte, la modification de leurs données personnelles, etc.

### 2. Serveurs

Les **serveurs** jouent un rôle essentiel dans la gestion des commandes une fois qu'elles sont passées. Ils ont les actions suivantes :

#### 2.1 **Commandes en attente**
- Les serveurs reçoivent les **commandes en attente** dès qu'un client passe une commande.
- Ils peuvent voir une liste des **commandes en attente** dans leur tableau de bord et en gérer le statut.

#### 2.2 **Changement de statut des commandes**
- Le serveur peut **changer le statut** des commandes en attente en **"En cours de préparation"** ou **"Prête"** une fois que la préparation a commencé ou que la commande est prête à être livrée.

#### 2.3 **Page de consultation des commandes**
- Le serveur peut consulter toutes les **commandes en préparation** et **prêtes**.
- Cela lui permet de suivre l'état des commandes et de gérer les tâches de préparation.

#### 2.4 **Profil du serveur**
- Le serveur peut accéder à son **profil** pour consulter ses informations personnelles.

### 3. Livreurs

Les **livreurs** sont responsables de la livraison des commandes aux clients. Leur rôle et actions sont les suivants :

#### 3.1 **Commandes prêtes à livrer**
- Le livreur peut consulter une liste des **commandes prêtes** à être livrées.
- Il peut voir les détails des commandes prêtes et organiser les livraisons en fonction de leur statut.

#### 3.2 **Changement de statut des commandes**
- Une fois qu'une commande est prête, le livreur peut **changer son statut** en **"En cours de livraison"** ou **"Livrée"** pour indiquer si la commande est en cours de livraison ou a été livrée au client.

#### 3.3 **Page de consultation des commandes en cours**
- Le livreur peut consulter toutes les **commandes en cours de livraison** et celles qui ont été **livrées**.
- Cela lui permet de suivre le processus de livraison et de gérer les commandes livrées avec succès.

#### 5.4 **Profil du livreur**
- Le livreur peut accéder à son **profil** pour consulter ses informations personnelles.


