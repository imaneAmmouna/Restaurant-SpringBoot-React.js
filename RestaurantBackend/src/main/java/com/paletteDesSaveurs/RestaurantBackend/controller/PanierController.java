package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.entity.Panier;
import com.paletteDesSaveurs.RestaurantBackend.service.PanierService;
import com.paletteDesSaveurs.RestaurantBackend.repository.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/panier")
@CrossOrigin(origins = "http://localhost:3000")
public class PanierController {

    @Autowired
    private PanierService panierService;

    @Autowired
    private PanierRepository panierRepository;


    // Récupère le panier d'un client spécifique.
    @GetMapping("/afficher/{clientId}")
    public List<Panier> getPanier(@PathVariable Integer clientId) {
        return panierService.getPanierByClientId(clientId);
    }

    // Ajoute un élément au panier.
    @PostMapping("/ajouter")
    public Panier ajouterAuPanier(@RequestBody Panier panier) {
        return panierService.ajouterAuPanier(panier);
    }

    // Met à jour la quantité d'un article dans le panier
    @PutMapping("/modifier")
    public Panier modifierQuantite(@RequestBody Panier panier) {
        return panierService.modifierQuantite(panier.getPanierId(), panier.getQuantite());
    }

    // Supprime un élément spécifique du panier à partir de son ID.
    @DeleteMapping("/supprimer/{panierId}")
    public void supprimerDuPanier(@PathVariable Integer panierId) {
        panierService.supprimerDuPanier(panierId);
    }

    // Exemple en utilisant Spring Boot pour mettre à jour la sélection
    @PutMapping("/modifier-selection/{panierId}")
    public ResponseEntity<?> updateSelection(@PathVariable Integer panierId, @RequestBody Map<String, Boolean> requestBody) {
        Boolean isSelected = requestBody.get("selected");

        // Rechercher l'élément dans le panier
        Optional<Panier> panierOpt = panierRepository.findById(panierId);
        if (panierOpt.isPresent()) {
            Panier panier = panierOpt.get();
            panier.setSelected(isSelected);  // Mettre à jour le champ selected
            panierRepository.save(panier);  // Sauvegarder l'élément mis à jour
            return ResponseEntity.ok().body("Sélection mise à jour avec succès");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Élément du panier non trouvé");
        }
    }


}
