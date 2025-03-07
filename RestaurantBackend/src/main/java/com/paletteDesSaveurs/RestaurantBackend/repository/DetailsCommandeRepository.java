package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.DetailsCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetailsCommandeRepository extends JpaRepository<DetailsCommande, Integer> {

    List<DetailsCommande> findByCommande_CommandeId(Integer commandeId);

    List<DetailsCommande> findAll();

}
