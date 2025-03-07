package com.paletteDesSaveurs.RestaurantBackend.DTO;

import com.paletteDesSaveurs.RestaurantBackend.entity.Commande;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AffichageCommandeDTO {

    private Integer commandeId;
    private Integer clientId;
    private Integer livreurId; // Si vous souhaitez afficher le nom du livreur
    private Integer serveurId; // Si vous souhaitez afficher le nom du serveur
    private BigDecimal prixTotalCommande;
    private Commande.StatusCommande status;
    private String adresse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
