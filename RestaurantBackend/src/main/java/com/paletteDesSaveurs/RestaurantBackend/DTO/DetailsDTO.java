package com.paletteDesSaveurs.RestaurantBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailsDTO {
    private String categorie;
    private String menu;
    private int quantite;
    private BigDecimal prixMenu;
}