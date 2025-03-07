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
@Table(name = "serveur")
public class Serveur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serveur_id")
    private Integer serveurId;

    @Column(name = "nom_serveur", nullable = false, length = 50)
    private String nomServeur;

    @Column(name = "prenom_serveur", nullable = false, length = 50)
    private String prenomServeur;

    @Column(name = "email_serveur", nullable = false, unique = true, length = 100)
    private String emailServeur;

    @Column(name = "password_serveur", nullable = false, length = 255)
    private String passwordServeur;

    @Column(name = "telephone_serveur", length = 20)
    private String telephoneServeur;

    @Column(name = "CIN_serveur", unique = true, length = 20)
    private String cinServeur;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat_serveur", nullable = false)
    private EtatServeur etatServeur;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum EtatServeur {
        actif,
        passe
    }

}
