package com.paletteDesSaveurs.RestaurantBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter  // Genere automatiquement les getters
@Setter  // Genere automatiquement les setters
@NoArgsConstructor  // Genere un constructeur sans argument
@AllArgsConstructor
public class ClientLivreurDTO {

    private Integer commandeId;
    private String nomClient;
    private String prenomClient;
    private Integer livreurId;
    private Integer serveurId;
    private BigDecimal prixTotalCommande;
    private String status;
    private String adresse;
}
