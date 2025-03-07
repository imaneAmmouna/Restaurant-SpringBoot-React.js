package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.DTO.LoginRequest;
import com.paletteDesSaveurs.RestaurantBackend.DTO.AdminDTO;
import com.paletteDesSaveurs.RestaurantBackend.config.JwtUtil;
import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import com.paletteDesSaveurs.RestaurantBackend.service.AdminService;
import com.paletteDesSaveurs.RestaurantBackend.repository.AdminRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Recherche de l'admin par email
        return adminService.getAdminByEmail(email)
                .map(admin -> {

                    // Vérification de l'état de l'administrateur
                    if (admin.getEtatAdmin() == Admin.EtatAdmin.passe) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("message", "Accès refusé. Votre compte est inactif."));
                    }

                    if (passwordEncoder.matches(password, admin.getPasswordAdmin())) {

                        // Génération du token JWT
                        String token = jwtUtil.generateToken(email);
                        System.out.println("Token est : " + token);
                        System.out.println("admin est : " + admin.getNomAdmin());

                        // Retourne un message de validation et le token dans l'en-tête Authorization
                        return ResponseEntity.ok()
                                .header("Authorization", "Bearer " + token)
                                .body(Map.of(
                                        "message", "Connexion réussie!!!",
                                        "adminId", admin.getAdminId()
                                ));
                    } else {
                        // Si le mot de passe est incorrect, retour de l'erreur 401
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Mot de passe incorrect."));
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Admin non trouvé.")));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // Retirer "Bearer " du token
        }

        if (jwtUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Session expirée. Veuillez vous reconnecter."));
        }

        String email = jwtUtil.extractEmail(token);

        // Cherche le admin par email
        return adminService.getAdminByEmail(email)
                .map(admin -> {
                    // Afficher les données du admin dans le terminal
                    System.out.println("Admin trouvé : " + admin);
                    // Si trouvé, renvoie le admin
                    return ResponseEntity.ok(admin);
                })
                .orElseGet(() -> {
                    Admin errorAdmin = new Admin();
                    errorAdmin.setNomAdmin("Utilisateur non trouvé.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(errorAdmin);
                });
    }

    @PutMapping("/modifier-infos/{adminId}")
    public ResponseEntity<?> updateAdmin(@PathVariable Integer adminId, @RequestBody AdminDTO adminDTO) {

        String email = adminDTO.getEmailAdmin();
        String password = adminDTO.getPasswordAdmin();

        // Vérification du pattern de l'email
        boolean isAdminEmail = email != null && email.matches(".*_admin@gmail\\.com$");

        // Vérification du pattern du mot de passe
        boolean isAdminPassword = password != null && password.matches("^Ad.*miN$");

        // Si les patterns sont invalides
        if (!isAdminEmail) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "L'email doit se terminer par '_admin@gmail.com'."));
        }
        if (!isAdminPassword) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Le mot de passe doit commencer par 'Ad' et se terminer par 'miN'."));
        }

        return adminService.getAdminById(adminId).map(admin -> {
            // Mise à jour des informations (hors mot de passe)
            admin.setNomAdmin(adminDTO.getNomAdmin());
            admin.setPrenomAdmin(adminDTO.getPrenomAdmin());
            admin.setEmailAdmin(adminDTO.getEmailAdmin());
            admin.setTelephoneAdmin(adminDTO.getTelephoneAdmin());

            // Vérification si le mot de passe est mis à jour
            if (adminDTO.getPasswordAdmin() != null && !adminDTO.getPasswordAdmin().isEmpty()) {
                // Hash du nouveau mot de passe avant de le sauvegarder
                admin.setPasswordAdmin(passwordEncoder.encode(adminDTO.getPasswordAdmin()));
            }

            // Sauvegarde des modifications
            adminService.saveAdmin(admin);
            return ResponseEntity.ok(Map.of("message", "Informations mises à jour avec succès !"));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Admin non trouvé.")));
    }

    // Endpoint pour récupérer tous les administrateurs
    @GetMapping("/administrateur")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PutMapping("/stat/{adminId}")
    public ResponseEntity<?> updateAdminState(@PathVariable Integer adminId, @RequestBody Admin.EtatAdmin etatAdmin) {
        try {
            adminService.updateAdminState(adminId, etatAdmin);
            return ResponseEntity.ok("État mis à jour avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour de l'état");
        }
    }

}
