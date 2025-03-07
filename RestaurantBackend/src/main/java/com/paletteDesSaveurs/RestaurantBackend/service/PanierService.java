package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.entity.Panier;
import com.paletteDesSaveurs.RestaurantBackend.repository.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanierService {

    @Autowired
    private PanierRepository panierRepository;

    public List<Panier> getPanierByClientId(Integer clientId) {
        return panierRepository.findByClient_ClientId(clientId);
    }

    public Panier ajouterAuPanier(Panier panier) {
        return panierRepository.save(panier);
    }

    public void supprimerDuPanier(Integer panierId) {
        panierRepository.deleteById(panierId);
    }

    public void viderPanier(Integer clientId) {
        List<Panier> paniers = panierRepository.findByClient_ClientId(clientId);
        panierRepository.deleteAll(paniers);
    }

    public Panier modifierQuantite(Integer panierId, int nouvelleQuantite) {
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Article non trouvé dans le panier"));

        // Mettre à jour la quantité uniquement si elle est valide
        if (nouvelleQuantite > 0) {
            panier.setQuantite(nouvelleQuantite);
            return panierRepository.save(panier);
        } else {
            throw new IllegalArgumentException("La quantité doit être supérieure à zéro.");
        }
    }
}
