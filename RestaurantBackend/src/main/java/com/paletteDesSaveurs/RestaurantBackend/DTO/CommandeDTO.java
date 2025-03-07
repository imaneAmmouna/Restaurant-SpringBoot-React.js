package com.paletteDesSaveurs.RestaurantBackend.DTO;

import com.paletteDesSaveurs.RestaurantBackend.entity.Commande;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommandeDTO {

    private Integer commandeId;
    private BigDecimal prixTotal;
    private String status;
    private String adresse;
    private List<DetailsDTO> details = new ArrayList<>();

    // Constructeur qui prend une Commande en paramètre et convertit l'enum status en String
    public CommandeDTO(Commande commande) {
        this.commandeId = commande.getCommandeId();
        this.prixTotal = commande.getPrixTotalCommande();
        this.status = commande.getStatus() != null ? commande.getStatus().name() : null;
        this.adresse = commande.getAdresse();
    }

    public void addDetails(String categorie, String menu, int quantite, BigDecimal prixMenu) {
        this.details.add(new DetailsDTO(categorie, menu, quantite, prixMenu));
    }

}

