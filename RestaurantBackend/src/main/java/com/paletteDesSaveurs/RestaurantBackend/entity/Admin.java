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
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "nom_admin", nullable = false, length = 50)
    private String nomAdmin;

    @Column(name = "prenom_admin", nullable = false, length = 50)
    private String prenomAdmin;

    @Column(name = "email_admin", nullable = false, unique = true, length = 100)
    private String emailAdmin;

    @Column(name = "password_admin", nullable = false, length = 255)
    private String passwordAdmin;

    @Column(name = "telephone_admin", length = 20)
    private String telephoneAdmin;

    @Column(name = "CIN_admin", unique = true, length = 20)
    private String cinAdmin;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat_admin", nullable = false)
    private EtatAdmin etatAdmin;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum EtatAdmin {
        actif,
        passe
    }

}