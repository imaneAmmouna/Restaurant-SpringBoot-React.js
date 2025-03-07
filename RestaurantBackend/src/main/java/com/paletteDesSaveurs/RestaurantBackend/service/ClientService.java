package com.paletteDesSaveurs.RestaurantBackend.service;

import com.paletteDesSaveurs.RestaurantBackend.entity.Client;
import com.paletteDesSaveurs.RestaurantBackend.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(Integer id) {
        return clientRepository.findById(id);
    }

    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmailClient(email);
    }

    @Transactional
    public Client saveClient(Client client) {
        try {
            // Log du client avant sauvegarde pour vérifier la structure
            client.setPasswordClient(passwordEncoder.encode(client.getPasswordClient()));
            System.out.println("Client à sauvegarder : " + client);
            return clientRepository.save(client);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la sauvegarde du client");
        }
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    @Transactional
    public Client updateClient(Integer id, Client client) {
        // Vérification si le client existe
        Optional<Client> existingClientOpt = clientRepository.findById(id);
        if (existingClientOpt.isEmpty()) {
            throw new RuntimeException("Client non trouvé");
        }

        Client existingClient = existingClientOpt.get();

        // Mise à jour des informations spécifiques
        existingClient.setNomClient(client.getNomClient());
        existingClient.setPrenomClient(client.getPrenomClient());
        existingClient.setEmailClient(client.getEmailClient());
        existingClient.setTelephoneClient(client.getTelephoneClient());

        // Sauvegarde et retour du client mis à jour
        return clientRepository.save(existingClient);
    }

}

