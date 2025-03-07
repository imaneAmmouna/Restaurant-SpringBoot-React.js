package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.DTO.AdminDTO;
import com.paletteDesSaveurs.RestaurantBackend.DTO.LoginRequest;
import com.paletteDesSaveurs.RestaurantBackend.config.JwtUtil;
import com.paletteDesSaveurs.RestaurantBackend.entity.Livreur;
import com.paletteDesSaveurs.RestaurantBackend.entity.Serveur;
import com.paletteDesSaveurs.RestaurantBackend.entity.Admin;
import com.paletteDesSaveurs.RestaurantBackend.service.EmployeeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000") // CORS pour React
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Ajouter un serveur
    @PostMapping("/serveur/add")
    public ResponseEntity<?> addServeur(@RequestBody Serveur serveur) {
        System.out.println("Données reçues : " + serveur);
        if (serveur.getNomServeur() == null || serveur.getNomServeur().trim().isEmpty() ||
                serveur.getPrenomServeur() == null || serveur.getPrenomServeur().trim().isEmpty() ||
                serveur.getEmailServeur() == null || serveur.getEmailServeur().trim().isEmpty() ||
                serveur.getPasswordServeur() == null || serveur.getPasswordServeur().length() < 6) {
            return new ResponseEntity<>("Données invalides pour le serveur", HttpStatus.BAD_REQUEST);
        }

        try {
            Serveur addedServeur = employeeService.addServeur(serveur);
            return new ResponseEntity<>(addedServeur, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Ajouter un livreur
    @PostMapping("/livreur/add")
    public ResponseEntity<?> addLivreur(@RequestBody Livreur livreur) {
        System.out.println("Données reçues : " + livreur);
        if (livreur.getNomLivreur() == null || livreur.getNomLivreur().trim().isEmpty() ||
                livreur.getPrenomLivreur() == null || livreur.getPrenomLivreur().trim().isEmpty() ||
                livreur.getEmailLivreur() == null || livreur.getEmailLivreur().trim().isEmpty() ||
                livreur.getPasswordLivreur() == null || livreur.getPasswordLivreur().length() < 6) {
            return new ResponseEntity<>("Données invalides pour le livreur", HttpStatus.BAD_REQUEST);
        }

        try {
            Livreur addedLivreur = employeeService.addLivreur(livreur);
            return new ResponseEntity<>(addedLivreur, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Ajouter un administrateur
    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        System.out.println("Données reçues : " + admin);
        if (admin.getNomAdmin() == null || admin.getNomAdmin().trim().isEmpty() ||
                admin.getPrenomAdmin() == null || admin.getPrenomAdmin().trim().isEmpty() ||
                admin.getEmailAdmin() == null || admin.getEmailAdmin().trim().isEmpty() ||
                admin.getPasswordAdmin() == null || admin.getPasswordAdmin().length() < 6) {
            return new ResponseEntity<>("Données invalides pour l'administrateur", HttpStatus.BAD_REQUEST);
        }

        try {
            Admin addedAdmin = employeeService.addAdmin(admin);
            return new ResponseEntity<>(addedAdmin, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/livreur/show")
    public List<Livreur> getAllLivreur() {
        return employeeService.getAllLivreur();
    }

    @PutMapping("/livreur/stat/{livreurId}")
    public ResponseEntity<?> updateAdminState(@PathVariable Integer livreurId, @RequestBody Livreur.EtatLivreur etatLivreur) {
        try {
            employeeService.updateLivreurState(livreurId, etatLivreur);
            return ResponseEntity.ok("État mis à jour avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour de l'état");
        }
    }

    @GetMapping("/serveur/show")
    public List<Serveur> getAllServeur() {
        return employeeService.getAllServeur();
    }

    @PutMapping("/serveur/stat/{serveurId}")
    public ResponseEntity<?> updateServeurState(@PathVariable Integer serveurId, @RequestBody Serveur.EtatServeur etatServeur) {
        try {
            employeeService.updateServeurState(serveurId, etatServeur);
            return ResponseEntity.ok("État mis à jour avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour de l'état");
        }
    }

    @GetMapping("/livreur/stats")
    public ResponseEntity<?> getLivreurStats() {
        try {
            // Récupérer les statistiques des livreurs depuis le service
            int totalLivreurs = employeeService.getTotalLivreurs();
            int activeLivreurs = employeeService.getActiveLivreurs();
            int inactiveLivreurs = totalLivreurs - activeLivreurs;

            // Créer un objet de réponse contenant ces statistiques
            Map<String, Integer> stats = new HashMap<>();
            stats.put("totalLivreurs", totalLivreurs);
            stats.put("activeLivreurs", activeLivreurs);
            stats.put("inactiveLivreurs", inactiveLivreurs);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la récupération des statistiques des livreurs");
        }
    }

    @GetMapping("/serveur/stats")
    public ResponseEntity<?> getServeurStats() {
        try {
            // Récupérer les statistiques des serveurs depuis le service
            int totalServeurs = employeeService.getTotalServeurs();
            int activeServeurs = employeeService.getActiveServeurs();
            int inactiveServeurs = totalServeurs - activeServeurs;

            // Créer un objet de réponse contenant ces statistiques
            Map<String, Integer> stats = new HashMap<>();
            stats.put("totalServeurs", totalServeurs);
            stats.put("activeServeurs", activeServeurs);
            stats.put("inactiveServeurs", inactiveServeurs);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la récupération des statistiques des serveurs");
        }
    }

    @PostMapping("/livreur/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Recherche de l'admin par email
        return employeeService.getLivreurByEmail(email)
                .map(livreur -> {

                    // Vérification de l'état de l'administrateur
                    if (livreur.getEtatLivreur() == Livreur.EtatLivreur.passe) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("message", "Accès refusé. Votre compte est inactif."));
                    }

                    if (passwordEncoder.matches(password, livreur.getPasswordLivreur())) {

                        // Génération du token JWT
                        String token = jwtUtil.generateToken(email);
                        System.out.println("Token est : " + token);
                        System.out.println("admin est : " + livreur.getNomLivreur());

                        // Retourne un message de validation et le token dans l'en-tête Authorization
                        return ResponseEntity.ok()
                                .header("Authorization", "Bearer " + token)
                                .body(Map.of(
                                        "message", "Connexion réussie!!!",
                                        "livreurId", livreur.getLivreurId()
                                ));
                    } else {
                        // Si le mot de passe est incorrect, retour de l'erreur 401
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Mot de passe incorrect."));
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "livreur non trouvé.")));
    }


    @GetMapping("/livreur/profile")
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
        return employeeService.getLivreurByEmail(email)
                .map(livreur -> {
                    // Afficher les données du livreur dans le terminal
                    System.out.println("Admin trouvé : " + livreur);
                    // Si trouvé, renvoie le livreur
                    return ResponseEntity.ok(livreur);
                })
                .orElseGet(() -> {
                    Livreur errorLivreur = new Livreur();
                    errorLivreur.setNomLivreur("Utilisateur non trouvé.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(errorLivreur);
                });
    }

    @PostMapping("/serveur/login")
    public ResponseEntity<?> loginServeur(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Recherche de serveur par email
        return employeeService.getServeurByEmail(email)
                .map(serveur -> {

                    // Vérification de l'état de l'administrateur
                    if (serveur.getEtatServeur() == Serveur.EtatServeur.passe) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("message", "Accès refusé. Votre compte est inactif."));
                    }

                    if (passwordEncoder.matches(password, serveur.getPasswordServeur())) {

                        // Génération du token JWT
                        String token = jwtUtil.generateToken(email);
                        System.out.println("Token est : " + token);
                        System.out.println("serveur est : " + serveur.getNomServeur());

                        // Retourne un message de validation et le token dans l'en-tête Authorization
                        return ResponseEntity.ok()
                                .header("Authorization", "Bearer " + token)
                                .body(Map.of(
                                        "message", "Connexion réussie!!!",
                                        "serveurId", serveur.getServeurId()
                                ));
                    } else {
                        // Si le mot de passe est incorrect, retour de l'erreur 401
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Mot de passe incorrect."));
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "serveur non trouvé.")));
    }


    @GetMapping("/serveur/profile")
    public ResponseEntity<?> getProfileServeur(@RequestHeader("Authorization") String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // Retirer "Bearer " du token
        }

        if (jwtUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Session expirée. Veuillez vous reconnecter."));
        }

        String email = jwtUtil.extractEmail(token);

        // Cherche le admin par email
        return employeeService.getServeurByEmail(email)
                .map(serveur -> {
                    // Afficher les données du livreur dans le terminal
                    System.out.println("serveur trouvé : " + serveur);
                    // Si trouvé, renvoie le serveur
                    return ResponseEntity.ok(serveur);
                })
                .orElseGet(() -> {
                    Serveur errorServeur = new Serveur();
                    errorServeur.setNomServeur("Utilisateur non trouvé.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(errorServeur);
                });
    }


}
