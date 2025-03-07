package com.paletteDesSaveurs.RestaurantBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Integer menuId;

    @Column(name = "nom_menu", nullable = false, length = 100)
    private String nomMenu;

    @Column(name = "description_menu", columnDefinition = "TEXT")
    private String descriptionMenu;

    @Column(name = "prix_menu", nullable = false, precision = 10, scale = 2)
    private BigDecimal prixMenu;

    @ManyToOne
    @JoinColumn(name = "categorie_id", nullable = false)
    private Categorie categorie;

    // Constructeur acceptant un Integer (menuIdId)
    public Menu(Integer menuIdId) {
        this.menuId = menuIdId;
    }
}

