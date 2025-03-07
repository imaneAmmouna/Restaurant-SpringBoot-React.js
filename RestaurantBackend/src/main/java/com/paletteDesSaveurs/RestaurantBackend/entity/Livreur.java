package com.paletteDesSaveurs.RestaurantBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "livreur")
public class Livreur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "livreur_id")
    private Integer livreurId;

    @Column(name = "nom_livreur", nullable = false, length = 50)
    private String nomLivreur;

    @Column(name = "prenom_livreur", nullable = false, length = 50)
    private String prenomLivreur;

    @Column(name = "email_livreur", nullable = false, unique = true, length = 100)
    private String emailLivreur;

    @Column(name = "password_livreur", nullable = false, length = 255)
    private String passwordLivreur;

    @Column(name = "telephone_livreur", length = 20)
    private String telephoneLivreur;

    @Column(name = "CIN_livreur", unique = true, length = 20)
    private String cinLivreur;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat_livreur", nullable = false)
    private EtatLivreur etatLivreur;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum EtatLivreur {
        actif,
        passe
    }

}

