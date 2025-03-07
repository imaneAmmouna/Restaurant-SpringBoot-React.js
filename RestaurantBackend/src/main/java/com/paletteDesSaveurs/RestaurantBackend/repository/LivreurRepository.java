package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import com.paletteDesSaveurs.RestaurantBackend.entity.Livreur;
import com.paletteDesSaveurs.RestaurantBackend.entity.Serveur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface LivreurRepository extends JpaRepository<Livreur, Integer> {
    Optional<Livreur> findByEmailLivreur(String emailLivreur);

    @Modifying
    @Transactional
    @Query("UPDATE Livreur l SET l.etatLivreur = :etatLivreur WHERE l.livreurId = :livreurId")
    void updateLivreurState(Integer livreurId, Livreur.EtatLivreur etatLivreur);


    // Compter le nombre total de serveurs
    long count();

    // Compter le nombre de serveurs actifs
    @Query("SELECT COUNT(l) FROM Livreur l WHERE l.etatLivreur = :etatLivreur")
    long countByEtatLivreur(@Param("etatLivreur") Livreur.EtatLivreur etatLivreur);

    // Compter le nombre de serveurs inactifs
    @Query("SELECT COUNT(l) FROM Livreur l WHERE l.etatLivreur = :etatLivreur")
    long countByEtatLivreurInactif(@Param("etatLivreur") Livreur.EtatLivreur etatLivreur);
}
