package com.paletteDesSaveurs.RestaurantBackend.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commande_id")
    private Integer commandeId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "livreur_id")
    private Livreur livreur;

    @ManyToOne
    @JoinColumn(name = "serveur_id")
    private Serveur serveur;

    @Column(name = "prix_total_commande", nullable = false, precision = 10, scale = 2)
    private BigDecimal prixTotalCommande;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusCommande status;

    @Column(name = "adresse", columnDefinition = "TEXT")
    private String adresse;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum StatusCommande {
        attente,
        preparation,
        prete,
        livraison,
        livree;

    }

    public Commande() {
        this.status = StatusCommande.attente; // Valeur par défaut
    }

}