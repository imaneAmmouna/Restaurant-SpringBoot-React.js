package com.paletteDesSaveurs.RestaurantBackend.controller;

import com.paletteDesSaveurs.RestaurantBackend.config.JwtUtil;
import com.paletteDesSaveurs.RestaurantBackend.entity.Client;
import com.paletteDesSaveurs.RestaurantBackend.service.ClientService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.paletteDesSaveurs.RestaurantBackend.DTO.LoginRequest;


import java.util.*;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Client> getClientByEmail(@PathVariable String email) {
        return clientService.getClientByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping(path = "/save")
    public ResponseEntity<?> createClient(@Valid @RequestBody Client client, BindingResult result) {
        // Vérification des erreurs de validation
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        } else {
            // Vérification de l'unicité de l'email
            if (clientService.getClientByEmail(client.getEmailClient()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Cet email est déjà utilisé.");
            } else {
                // Sauvegarde du client si tout est correct
                Client savedClient = clientService.saveClient(client);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Recherche du client par email
        return clientService.getClientByEmail(email)
                .map(client -> {
                    // Vérification du mot de passe avec hachage sécurisé
                    if (clientService.checkPassword(password, client.getPasswordClient())) {

                        // Génération du token JWT
                        String token = jwtUtil.generateToken(email);
                        System.out.println("token est :"+ token);

                        // Retourne un message de validation et le token dans l'en-tête Authorization
                        return ResponseEntity.ok()
                                .header("Authorization", "Bearer " + token)
                                .body(Map.of(
                                        "message", "Connexion réussie!!!",
                                        "clientId", client.getClientId() // Assure-toi que la méthode getIdClient() existe
                                ));
                    } else {
                        // Si le mot de passe est incorrect, retour de l'erreur 401
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Mot de passe incorrect."));
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Client non trouvé.")));
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

        String email = jwtUtil.extractEmail(token); // Récupérer l'email depuis le token

        // Cherche le client par email
        return clientService.getClientByEmail(email)
                .map(client -> {
                    // Afficher les données du client dans le terminal
                    System.out.println("Client trouvé : " + client); // Vous pouvez personnaliser cela pour afficher des informations spécifiques
                    // Si trouvé, renvoie le client
                    return ResponseEntity.ok(client);
                })
                .orElseGet(() -> {
                    Client errorClient = new Client();
                    errorClient.setNomClient("Utilisateur non trouvé.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(errorClient); // Returning error wrapped in a Client object
                });
    }

    @PutMapping("/modifier-infos/{id}")
    public ResponseEntity<?> updateClient(@PathVariable Integer id, @RequestBody Client client) {
        // Vérification de l'unicité de l'email
        if (clientService.getClientByEmail(client.getEmailClient()).isPresent() &&
                !client.getClientId().equals(clientService.getClientByEmail(client.getEmailClient()).get().getClientId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cet email est déjà utilisé.");
        }

        // Vérification des emails spécifiques et des mots de passe
        String email = client.getEmailClient();

        // Vérification pour l'email serveur
        if (_serveurEmail(email) || _livreurEmail(email) || _adminEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Votre adresse email est invalide.");
        }

        // Mise à jour du client
        return clientService.getClientById(id)
                .map(existingClient -> {
                    // Mise à jour uniquement des champs nécessaires
                    Client updatedClient = clientService.updateClient(id, client);
                    return ResponseEntity.ok(updatedClient);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Fonction de validation de l'email serveur
    private boolean _serveurEmail(String email) {
        return email != null && email.endsWith("_serveur@gmail.com");
    }

    // Fonction de validation de l'email livreur
    private boolean _livreurEmail(String email) {
        return email != null && email.endsWith("_livreur@gmail.com");
    }

    // Fonction de validation de l'email admin
    private boolean _adminEmail(String email) {
        return email != null && email.endsWith("_admin@gmail.com");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}

