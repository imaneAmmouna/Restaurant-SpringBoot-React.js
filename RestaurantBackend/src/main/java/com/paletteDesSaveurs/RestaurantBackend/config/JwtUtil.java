package com.paletteDesSaveurs.RestaurantBackend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "votre_clé_secrète_très_sécurisée_ici"; // À stocker dans application.properties
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 heure

    // Méthode pour générer un token JWT
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Méthode pour extraire l'email (subject) du token
    public String extractEmail(String token) {
        JwtParser jwtParser = Jwts.parser() // Utilisation de parser() au lieu de parserBuilder()
                .setSigningKey(SECRET_KEY)  // Clé secrète pour la signature
                .build(); // Construction du JwtParser

        Claims claims = jwtParser.parseClaimsJws(token).getBody(); // Extraction des informations
        return claims.getSubject(); // Retourner l'email extrait
    }

    // Méthode pour vérifier si un token est valide
    public boolean isTokenValid(String token, String email) {
        return email.equals(extractEmail(token)) && !isTokenExpired(token);
    }

    // Méthode pour vérifier si le token a expiré
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Méthode pour extraire la date d'expiration du token
    private Date extractExpiration(String token) {
        JwtParser jwtParser = Jwts.parser() // Utilisation de parser() au lieu de parserBuilder()
                .setSigningKey(SECRET_KEY)  // Clé secrète pour la signature
                .build(); // Construction du JwtParser

        Claims claims = jwtParser.parseClaimsJws(token).getBody(); // Extraction des informations
        return claims.getExpiration(); // Retourner la date d'expiration
    }
}
