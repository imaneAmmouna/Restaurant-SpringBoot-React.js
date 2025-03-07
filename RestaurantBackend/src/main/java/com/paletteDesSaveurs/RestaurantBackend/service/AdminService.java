package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import com.paletteDesSaveurs.RestaurantBackend.repository.AdminRepository;
import com.paletteDesSaveurs.RestaurantBackend.DTO.AdminDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Injection des dépendances via le constructeur
    @Autowired
    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Récupérer tous les admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Récupérer un admin par ID
    public Optional<Admin> getAdminById(Integer id) {
        return adminRepository.findById(id);
    }

    // Récupérer un admin par email
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmailAdmin(email);
    }

    @Transactional
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void updateAdminState(Integer adminId, Admin.EtatAdmin etatAdmin) {
        adminRepository.updateAdminState(adminId, etatAdmin);
    }
}
