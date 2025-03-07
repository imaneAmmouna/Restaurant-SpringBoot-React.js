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



