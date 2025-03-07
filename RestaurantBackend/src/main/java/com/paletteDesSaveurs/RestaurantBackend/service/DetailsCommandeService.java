package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.DTO.DetailsCommandeDTO;
import com.paletteDesSaveurs.RestaurantBackend.entity.DetailsCommande;
import com.paletteDesSaveurs.RestaurantBackend.repository.DetailsCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetailsCommandeService {

    @Autowired
    private DetailsCommandeRepository detailsCommandeRepository;

    public List<DetailsCommandeDTO> getAllDetailsCommande() {
        List<DetailsCommande> detailsCommandes = detailsCommandeRepository.findAll();
        return detailsCommandes.stream()
                .map(detailsCommande -> new DetailsCommandeDTO(
                        detailsCommande.getDetailsCommandeId(),
                        detailsCommande.getCommande().getCommandeId(),
                        detailsCommande.getMenu().getMenuId(),
                        detailsCommande.getQuantite()
                ))
                .collect(Collectors.toList());
    }
}
