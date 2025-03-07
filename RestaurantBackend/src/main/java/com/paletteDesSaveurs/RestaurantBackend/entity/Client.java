package com.paletteDesSaveurs.RestaurantBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "client")  // Correspond au nom de ta table en BD
@Getter  // Genere automatiquement les getters
@Setter  // Genere automatiquement les setters
@NoArgsConstructor  // Genere un constructeur sans argument
@AllArgsConstructor // Genere un constructeur avec tous les arguments
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Integer clientId;

    @Column(name = "nom_client", nullable = false, length = 50)
    private String nomClient;

    @Column(name = "prenom_client", nullable = false, length = 50)
    private String prenomClient;

    @Column(name = "email_client", nullable = false, unique = true, length = 100)
    private String emailClient;

    @Column(name = "password_client", nullable = false, length = 255)
    private String passwordClient;

    @Column(name = "telephone_client", nullable = true, length = 20)
    private String telephoneClient;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Avant d'insérer un nouvel enregistrement
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    // Avant de mettre à jour un enregistrement existant
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Constructeur acceptant un Integer (clientId)
    public Client(Integer clientId) {
        this.clientId = clientId;
    }

}


/*
 * admin (    admin_id INT PRIMARY KEY AUTO_INCREMENT,    nom_admin VARCHAR(50),    prenom_admin VARCHAR(50),    email_admin VARCHAR(100) UNIQUE,    password_admin VARCHAR(255),    telephone_admin VARCHAR(20),    CIN_admin VARCHAR(20) UNIQUE,    etat_admin ENUM('actif', 'passe'),    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
 * categorie (    categorie_id INT PRIMARY KEY AUTO_INCREMENT,    nom_categorie VARCHAR(50) UNIQUE);
 * client (    client_id INT PRIMARY KEY AUTO_INCREMENT,    nom_client VARCHAR(50),    prenom_client VARCHAR(50),    email_client VARCHAR(100) UNIQUE,    password_client VARCHAR(255),    telephone_client VARCHAR(20),    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
 * commande (commande_id INT PRIMARY KEY AUTO_INCREMENT,client_id INT,livreur_id INT NULL,serveur_id INT NULL,prix_total_commande DECIMAL(10,2),status ENUM('en attente', 'en preparation', 'prete', 'en livraison', 'livree'),adresse TEXT,     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,FOREIGN KEY (client_id) REFERENCES client(client_id),FOREIGN KEY (livreur_id) REFERENCES livreur(livreur_id),FOREIGN KEY (serveur_id) REFERENCES serveur(serveur_id));
 * details_commande(details_commande_id INT PRIMARY KEY AUTO_INCREMENT,commande_id INT,menu_id INT, quantite INT,FOREIGN KEY (commande_id) REFERENCES commande(commande_id), FOREIGN KEY (menu_id) REFERENCES menu(menu_id) );
 * livreur (    livreur_id INT PRIMARY KEY AUTO_INCREMENT,    nom_livreur VARCHAR(50),    prenom_livreur VARCHAR(50),    email_livreur VARCHAR(100) UNIQUE,    password_livreur VARCHAR(255),    telephone_livreur VARCHAR(20),    CIN_livreur VARCHAR(20) UNIQUE,    etat_livreur ENUM('actif', 'passe'),    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
 * menu (menu_id INT PRIMARY KEY AUTO_INCREMENT,nom_menu VARCHAR(100),description_menu TEXT,prix_menu DECIMAL(10,2),categorie_id INT,FOREIGN KEY (categorie_id) REFERENCES categorie(categorie_id));
 * serveur (    serveur_id INT PRIMARY KEY AUTO_INCREMENT,    nom_serveur VARCHAR(50),    prenom_serveur VARCHAR(50),    email_serveur VARCHAR(100) UNIQUE,    password_serveur VARCHAR(255),    telephone_serveur VARCHAR(20),    CIN_serveur VARCHAR(20) UNIQUE,    etat_serveur ENUM('actif', 'passe'),    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
 * panier (panier_id INT PRIMARY KEY AUTO_INCREMENT,client_id INT NOT NULL,menu_id INT NOT NULL,quantite INT NOT NULL CHECK (quantite > 0),prix_unitaire DECIMAL(10,2) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE);
*/

