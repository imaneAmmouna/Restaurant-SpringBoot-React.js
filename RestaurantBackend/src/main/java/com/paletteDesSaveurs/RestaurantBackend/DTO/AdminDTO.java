package com.paletteDesSaveurs.RestaurantBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {

    private Integer adminId;
    private String nomAdmin;
    private String prenomAdmin;
    private String emailAdmin;
    private String telephoneAdmin;
    private String passwordAdmin;
}
