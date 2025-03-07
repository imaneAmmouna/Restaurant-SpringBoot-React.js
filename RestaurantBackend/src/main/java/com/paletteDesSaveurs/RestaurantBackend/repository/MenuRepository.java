// MenuRepository.java
package com.paletteDesSaveurs.RestaurantBackend.repository;

import com.paletteDesSaveurs.RestaurantBackend.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findByCategorie_CategorieId(Integer categorieId);

    List<Menu> findByNomMenuContainingIgnoreCase(String nomMenu);
}

