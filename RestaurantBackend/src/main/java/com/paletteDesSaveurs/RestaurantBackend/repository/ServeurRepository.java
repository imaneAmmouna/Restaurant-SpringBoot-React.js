package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.Serveur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ServeurRepository extends JpaRepository<Serveur, Integer> {

    // Trouver un serveur par son email
    Optional<Serveur> findByEmailServeur(String emailServeur);

    // Mettre à jour l'état du serveur
    @Modifying
    @Transactional
    @Query("UPDATE Serveur s SET s.etatServeur = :etatServeur WHERE s.serveurId = :serveurId")
    void updateServeurState(@Param("serveurId") Integer serveurId, @Param("etatServeur") Serveur.EtatServeur etatServeur);

    // Compter le nombre total de serveurs
    long count();

    // Compter le nombre de serveurs actifs
    @Query("SELECT COUNT(s) FROM Serveur s WHERE s.etatServeur = :etatServeur")
    long countByEtatServeur(@Param("etatServeur") Serveur.EtatServeur etatServeur);

    // Compter le nombre de serveurs inactifs
    @Query("SELECT COUNT(s) FROM Serveur s WHERE s.etatServeur = :etatServeur")
    long countByEtatServeurInactif(@Param("etatServeur") Serveur.EtatServeur etatServeur);
}
