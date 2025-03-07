package com.paletteDesSaveurs.RestaurantBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Classe DTO (Data Transfer Object) pour recevoir les informations de la commande
 * depuis le frontend.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommandeRequest {
    private Integer clientId;      // ID du client qui passe la commande
    private String adresse;        // Adresse de livraison
    private List<MenuQuantite> menus; // Liste des IDs des menus sélectionnés

    // Classe interne pour stocker menuId et quantité
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MenuQuantite {
        private Integer menuId;   // ID du menu sélectionné
        private Integer quantite; // Quantité commandée
    }

}
