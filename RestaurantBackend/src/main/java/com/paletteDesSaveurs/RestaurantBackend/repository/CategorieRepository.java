// CategorieRepository.java
package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
}
