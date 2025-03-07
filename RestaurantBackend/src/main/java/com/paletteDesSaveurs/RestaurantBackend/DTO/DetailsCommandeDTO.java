package com.paletteDesSaveurs.RestaurantBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailsCommandeDTO {
    private Integer detailsCommandeId;
    private Integer commandeId;
    private Integer menuId;
    private Integer quantite;
}
