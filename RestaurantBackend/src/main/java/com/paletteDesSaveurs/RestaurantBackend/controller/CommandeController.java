package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.DTO.*;
import com.paletteDesSaveurs.RestaurantBackend.entity.Commande;
import com.paletteDesSaveurs.RestaurantBackend.repository.CommandeRepository;
import com.paletteDesSaveurs.RestaurantBackend.service.CommandeService;
import com.paletteDesSaveurs.RestaurantBackend.service.DetailsCommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private DetailsCommandeService detailsCommandeService;

    @PostMapping("/passer")
    public ResponseEntity<?> passerCommande(@RequestBody CommandeRequest request) {
        try {
            Commande commande = commandeService.passerCommande(request);
            return ResponseEntity.ok(commande);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de la commande.");
        }
    }

    // Méthode pour récupérer les commandes d'un client
    @GetMapping("/historique/{clientId}")
    public List<CommandeDTO> getCommandesByClient(@PathVariable Integer clientId) {
        return commandeService.getCommandesByClientId(clientId);
    }

    // Nouvelle méthode pour récupérer toutes les commandes
    @GetMapping("/afficher")
    public ResponseEntity<List<AffichageCommandeDTO>> getAllCommandes() {
        try {
            List<AffichageCommandeDTO> commandes = commandeService.getAllCommandes();
            return ResponseEntity.ok(commandes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/details/all")
    public ResponseEntity<List<DetailsCommandeDTO>> getAllDetailsCommande() {
        List<DetailsCommandeDTO> detailsCommandes = detailsCommandeService.getAllDetailsCommande();
        return ResponseEntity.ok(detailsCommandes);
    }

    @PutMapping("/update-status/{commandeId}")
    public ResponseEntity<?> updateStatus(@PathVariable Integer commandeId, @RequestBody Commande updatedCommande) {
        try {
            Commande updated = commandeService.updateStatus(commandeId, updatedCommande.getStatus());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/livreur/afficher")
    public List<ClientLivreurDTO> getCommandes() {
        List<Commande> commandes = commandeRepository.findAll();

        return commandes.stream().map(commande -> new ClientLivreurDTO(
                commande.getCommandeId(),
                commande.getClient().getNomClient(),
                commande.getClient().getPrenomClient(),
                commande.getLivreur() != null ? commande.getLivreur().getLivreurId() : null,
                commande.getServeur() != null ? commande.getServeur().getServeurId() : null,
                commande.getPrixTotalCommande(),
                commande.getStatus().name(),
                commande.getAdresse()
        )).collect(Collectors.toList());
    }

}
