// RestaurantService.java
package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.entity.Categorie;
import com.paletteDesSaveurs.RestaurantBackend.entity.Menu;
import com.paletteDesSaveurs.RestaurantBackend.repository.CategorieRepository;
import com.paletteDesSaveurs.RestaurantBackend.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private MenuRepository menuRepository;

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public List<Menu> getMenusByCategorieId(Integer categorieId) {
        return menuRepository.findByCategorie_CategorieId(categorieId);  // Modifié ici
    }

    public Categorie addCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    // Ajouter un menu
    public Menu addMenu(Menu menu) {
        return menuRepository.save(menu);
    }
}
