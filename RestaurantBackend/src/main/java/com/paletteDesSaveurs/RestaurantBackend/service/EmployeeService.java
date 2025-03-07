package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.entity.Livreur;
import com.paletteDesSaveurs.RestaurantBackend.entity.Serveur;
import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import com.paletteDesSaveurs.RestaurantBackend.repository.LivreurRepository;
import com.paletteDesSaveurs.RestaurantBackend.repository.ServeurRepository;
import com.paletteDesSaveurs.RestaurantBackend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private ServeurRepository serveurRepository;

    @Autowired
    private LivreurRepository livreurRepository;

    @Autowired
    private AdminRepository adminRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Serveur addServeur(Serveur serveur) {
        if (serveurRepository.findByEmailServeur(serveur.getEmailServeur()).isPresent() ||
                livreurRepository.findByEmailLivreur(serveur.getEmailServeur()).isPresent() ||
                adminRepository.findByEmailAdmin(serveur.getEmailServeur()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }
        serveur.setPasswordServeur(passwordEncoder.encode(serveur.getPasswordServeur())); // Encrypting the password
        return serveurRepository.save(serveur);
    }

    public Livreur addLivreur(Livreur livreur) {
        if (serveurRepository.findByEmailServeur(livreur.getEmailLivreur()).isPresent() ||
                livreurRepository.findByEmailLivreur(livreur.getEmailLivreur()).isPresent() ||
                adminRepository.findByEmailAdmin(livreur.getEmailLivreur()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }
        livreur.setPasswordLivreur(passwordEncoder.encode(livreur.getPasswordLivreur())); // Encrypting the password
        return livreurRepository.save(livreur);
    }

    public Admin addAdmin(Admin admin) {
        if (serveurRepository.findByEmailServeur(admin.getEmailAdmin()).isPresent() ||
                livreurRepository.findByEmailLivreur(admin.getEmailAdmin()).isPresent() ||
                adminRepository.findByEmailAdmin(admin.getEmailAdmin()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }
        admin.setPasswordAdmin(passwordEncoder.encode(admin.getPasswordAdmin())); // Encrypting the password
        return adminRepository.save(admin);
    }

    public void updateLivreurState(Integer livreurId, Livreur.EtatLivreur etatLivreur) {
        livreurRepository.updateLivreurState(livreurId, etatLivreur);
    }

    public List<Livreur> getAllLivreur() {
        return livreurRepository.findAll();
    }

    public void updateServeurState(Integer serveurId, Serveur.EtatServeur etatServeur) {
        serveurRepository.updateServeurState(serveurId, etatServeur);
    }

    public List<Serveur> getAllServeur() {
        return serveurRepository.findAll();
    }

    public int getTotalLivreurs() {
        return (int) livreurRepository.count();  // Retourne le nombre total de serveurs
    }

    public int getActiveLivreurs() {
        return (int) livreurRepository.countByEtatLivreur(Livreur.EtatLivreur.actif);  // Retourne le nombre de serveurs actifs
    }

    public int getInactiveLivreurs() {
        return (int) livreurRepository.countByEtatLivreurInactif(Livreur.EtatLivreur.passe);  // Retourne le nombre de serveurs inactifs
    }

    public int getTotalServeurs() {
        return (int) serveurRepository.count();  // Retourne le nombre total de serveurs
    }

    public int getActiveServeurs() {
        return (int) serveurRepository.countByEtatServeur(Serveur.EtatServeur.actif);  // Retourne le nombre de serveurs actifs
    }

    public int getInactiveServeurs() {
        return (int) serveurRepository.countByEtatServeurInactif(Serveur.EtatServeur.passe);  // Retourne le nombre de serveurs inactifs
    }

    // Récupérer un admin par ID
    public Optional<Livreur> getLivreurById(Integer id) {
        return livreurRepository.findById(id);
    }

    // Récupérer un admin par email
    public Optional<Livreur> getLivreurByEmail(String email) {
        return livreurRepository.findByEmailLivreur(email);
    }

    // Récupérer un admin par email
    public Optional<Serveur> getServeurByEmail(String email) {
        return serveurRepository.findByEmailServeur(email);
    }

}
