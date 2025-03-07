// RestaurantController.java
package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.entity.Categorie;
import com.paletteDesSaveurs.RestaurantBackend.entity.Menu;
import com.paletteDesSaveurs.RestaurantBackend.repository.CategorieRepository;
import com.paletteDesSaveurs.RestaurantBackend.repository.MenuRepository;
import com.paletteDesSaveurs.RestaurantBackend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
@CrossOrigin(origins = "http://localhost:3000") // CORS pour React
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private MenuRepository menuRepository;

    // Récupérer toutes les catégories
    @GetMapping("/categories")
    public List<Categorie> getAllCategories() {
        return restaurantService.getAllCategories();
    }

    // Récupérer les menus par catégorie
    @GetMapping("/menus/{categorieId}")
    public List<Menu> getMenusByCategorieId(@PathVariable Integer categorieId) {
        return restaurantService.getMenusByCategorieId(categorieId);
    }

    // Mettre à jour une catégorie
    @PutMapping("/categorie/update/{id}")
    public Categorie updateCategorie(@PathVariable Integer id, @RequestBody Categorie categorie) {
        Categorie existingCategorie = categorieRepository.findById(id).orElseThrow(() -> new RuntimeException("Categorie non trouvée"));
        existingCategorie.setNomCategorie(categorie.getNomCategorie());
        return categorieRepository.save(existingCategorie);
    }

    @PutMapping("/menu/update/{menuId}")
    public Menu updateMenu(@PathVariable Integer menuId, @RequestBody Menu updatedMenu) {
        Menu existingMenu = menuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menu non trouvé"));

        // Mettre à jour les propriétés du menu
        existingMenu.setNomMenu(updatedMenu.getNomMenu());
        existingMenu.setDescriptionMenu(updatedMenu.getDescriptionMenu());
        existingMenu.setPrixMenu(updatedMenu.getPrixMenu());

        // Sauvegarder le menu modifié dans la base de données
        return menuRepository.save(existingMenu);
    }

    @PostMapping("/categorie/add")
    public Categorie addCategorie(@RequestBody Categorie categorie) {
        return restaurantService.addCategorie(categorie);
    }

    // Ajouter un menu
    @PostMapping("/menu/add")
    public Menu addMenu(@RequestBody Menu menu) {
        return restaurantService.addMenu(menu);
    }
}
