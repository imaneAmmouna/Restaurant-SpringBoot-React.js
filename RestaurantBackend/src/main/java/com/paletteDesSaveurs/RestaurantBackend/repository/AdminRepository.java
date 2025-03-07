package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmailAdmin(String emailAdmin);

    // Méthode pour mettre à jour l'état d'un administrateur
    @Modifying
    @Transactional
    @Query("UPDATE Admin a SET a.etatAdmin = :etatAdmin WHERE a.adminId = :adminId")
    void updateAdminState(Integer adminId, Admin.EtatAdmin etatAdmin);
}

