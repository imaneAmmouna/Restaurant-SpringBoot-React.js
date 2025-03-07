package com.paletteDesSaveurs.RestaurantBackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configure les règles CORS globales pour l'API
        registry.addMapping("/api/**")  // Applique les règles CORS pour toutes les routes qui commencent par "/api"
                .allowedOrigins("http://localhost:3000")  // Permet l'origine de ton frontend (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Autorise ces méthodes HTTP
                .allowedHeaders("*")  // Autorise tous les headers
                .allowCredentials(true)  // Permet l'envoi de cookies
                .exposedHeaders("Authorization");
    }
}
