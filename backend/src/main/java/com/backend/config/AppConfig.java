package com.backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AppConfig {

    // Define the security filter chain for HTTP security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Define which endpoints require authentication and which are publicly accessible
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").authenticated() // Protect all /api/** endpoints
                .anyRequest().permitAll() // Allow all other requests without authentication
            )
            // Add JWT token validator filter before BasicAuthenticationFilter
            .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
            // Set session management to stateless for token-based authentication
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Disable CSRF protection (useful for stateless APIs with JWT)
            .csrf(csrf -> csrf.disable())
            // Enable CORS with a custom configuration
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    // Bean for CORS configuration with allowed origins, methods, and credentials
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Allow requests from localhost:3000
        config.setAllowedMethods(Collections.singletonList("*")); // Allow all HTTP methods
        config.setAllowCredentials(true); // Allow credentials (cookies, authorization headers)
        config.setAllowedHeaders(Collections.singletonList("*")); // Allow all headers
        config.setExposedHeaders(Arrays.asList("Authorization")); // Expose the Authorization header
        config.setMaxAge(3600L); // Cache pre-flight request results for 1 hour

        // Register the CORS configuration for all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Bean to encode passwords using BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
