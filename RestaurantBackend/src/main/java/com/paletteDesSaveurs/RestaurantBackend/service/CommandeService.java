package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.DTO.AffichageCommandeDTO;
import com.paletteDesSaveurs.RestaurantBackend.DTO.CommandeDTO;
import com.paletteDesSaveurs.RestaurantBackend.DTO.CommandeRequest;
import com.paletteDesSaveurs.RestaurantBackend.entity.*;
import com.paletteDesSaveurs.RestaurantBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private DetailsCommandeRepository detailsCommandeRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Transactional
    public Commande passerCommande(CommandeRequest request) {
        // Vérifier que le client existe
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        // Récupérer tous les menus commandés en une seule requête
        List<Integer> menuIds = request.getMenus().stream()
                .map(CommandeRequest.MenuQuantite::getMenuId)
                .collect(Collectors.toList());

        List<Menu> menus = menuRepository.findAllById(menuIds);

        // Vérifier si tous les menus existent
        if (menus.size() != menuIds.size()) {
            throw new RuntimeException("Un ou plusieurs menus sont introuvables");
        }

        // Créer une map pour un accès rapide aux prix des menus
        Map<Integer, BigDecimal> menuPrixMap = menus.stream()
                .collect(Collectors.toMap(Menu::getMenuId, Menu::getPrixMenu));

        // Calculer le prix total en multipliant quantité * prix unitaire
        BigDecimal prixTotal = request.getMenus().stream()
                .map(item -> menuPrixMap.get(item.getMenuId()).multiply(BigDecimal.valueOf(item.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Créer la commande
        Commande commande = new Commande();
        commande.setClient(client);
        commande.setAdresse(request.getAdresse());
        commande.setPrixTotalCommande(prixTotal);
        commande.setCreatedAt(LocalDateTime.now());
        commande.setUpdatedAt(LocalDateTime.now());

        // Sauvegarder la commande (obtenir un ID)
        commande = commandeRepository.save(commande);

        // Ajouter les détails de la commande
        for (CommandeRequest.MenuQuantite menuQuantite : request.getMenus()) {
            Menu menu = menus.stream()
                    .filter(m -> m.getMenuId().equals(menuQuantite.getMenuId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Menu non trouvé"));

            DetailsCommande detailsCommande = new DetailsCommande();
            detailsCommande.setCommande(commande);
            detailsCommande.setMenu(menu);
            detailsCommande.setQuantite(menuQuantite.getQuantite());

            // Sauvegarde des détails de commande
            detailsCommandeRepository.save(detailsCommande);
        }

        return commande;
    }

    public List<CommandeDTO> getCommandesByClientId(Integer clientId) {
        List<Commande> commandes = commandeRepository.findByClientClientId(clientId);
        List<CommandeDTO> commandeDTOs = new ArrayList<>();

        for (Commande commande : commandes) {
            CommandeDTO commandeDTO = new CommandeDTO(commande); // Utiliser le constructeur pour convertir
            List<DetailsCommande> detailsCommandes = detailsCommandeRepository.findByCommande_CommandeId(commande.getCommandeId());

            for (DetailsCommande details : detailsCommandes) {
                Menu menu = menuRepository.findById(details.getMenu().getMenuId()).orElse(null);
                if (menu != null) {
                    Categorie categorie = categorieRepository.findById(menu.getCategorie().getCategorieId()).orElse(null);
                    commandeDTO.addDetails(
                            categorie != null ? categorie.getNomCategorie() : "Inconnue",
                            menu.getNomMenu(),
                            details.getQuantite(),
                            menu.getPrixMenu()
                    );
                }
            }

            commandeDTOs.add(commandeDTO);
        }
        return commandeDTOs;
    }

    // Méthode pour récupérer toutes les commandes et les convertir en DTO
    public List<AffichageCommandeDTO> getAllCommandes() {
        List<Commande> commandes = commandeRepository.findAll(); // Récupérer toutes les commandes
        return commandes.stream()
                .map(commande -> new AffichageCommandeDTO(
                        commande.getCommandeId(),
                        commande.getClient().getClientId(),
                        commande.getLivreur() != null ? commande.getLivreur().getLivreurId() : null, // Si le livreur existe, récupérer son ID
                        commande.getServeur() != null ? commande.getServeur().getServeurId() : null, // Si le serveur existe, récupérer son ID
                        commande.getPrixTotalCommande(),
                        commande.getStatus(),
                        commande.getAdresse(),
                        commande.getCreatedAt(),
                        commande.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }

    public Commande updateStatus(Integer commandeId, Commande.StatusCommande newStatus) {
        Optional<Commande> commandeOpt = commandeRepository.findById(commandeId);

        if (commandeOpt.isPresent()) {
            Commande commande = commandeOpt.get();
            commande.setStatus(newStatus);
            return commandeRepository.save(commande);
        } else {
            throw new RuntimeException("Commande non trouvée avec l'ID: " + commandeId);
        }
    }
}
