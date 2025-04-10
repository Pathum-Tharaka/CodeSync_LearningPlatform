package com.backend.backend.config;

import java.util.Date;
import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
    // Create the secret key using the provided constant
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Method to generate a JWT token from the authentication object
    @SuppressWarnings("deprecation")
    public String generateToken(Authentication auth) {
        String jwt = Jwts.builder()
            .setIssuedAt(new Date()) // Corrected the typo here
            .setExpiration(new Date(new Date().getTime() + 86400000)) // 1-day expiration
            .claim("email", auth.getName()) // Add custom claim "email"
            .signWith(key) // Sign the JWT with the secret key
            .compact(); // Return the JWT string

        return jwt;
    }

    // Method to extract email from the JWT token
    public String getEmailFromToken(String token) {
        // Remove the "Bearer " prefix if it's present
        token = token.substring(7); 
        
        // Build the JWT parser with the secret key for signature verification
        @SuppressWarnings("deprecation")
        JwtParser parser = Jwts.parser()
            .setSigningKey(key) // Set the secret key for signature verification
            .build();

        // Parse and verify the JWT token; get the Claims (payload) from it
        @SuppressWarnings("deprecation")
        Claims claims = parser.parseClaimsJws(token).getBody();

        // Extract the "email" claim from the JWT payload
        String email = claims.get("email", String.class);

        return email;
    }
}
