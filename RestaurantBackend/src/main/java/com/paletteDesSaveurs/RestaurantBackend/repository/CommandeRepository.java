package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.DTO.CommandeDTO;
import com.paletteDesSaveurs.RestaurantBackend.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer> {

    // Récupérer toutes les commandes d'un client donné
    List<Commande> findByClientClientId(Integer clientId);

    // Récupérer les commandes par statut (ex: "EN_ATTENTE", "EN_LIVRAISON")
    List<Commande> findByStatus(Commande.StatusCommande status);

    @Query("SELECT c FROM Commande c JOIN FETCH c.client")
    List<Commande> findAll();

}
