package com.backend.config;

import java.io.IOException;
import java.util.List;
import javax.crypto.SecretKey;

import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // Retrieve the Authorization header from the request
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        // Check if the header is not null and starts with "Bearer "
        if (jwt != null && jwt.startsWith("Bearer ")) {
            // Remove the "Bearer " prefix to get the actual token
            jwt = jwt.substring(7);
        } else {
            // If token is missing or malformed, continue the filter chain without setting authentication
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Generate the secret key using the SECRET_KEY from constants (must be at least 256-bit for HS256)
            SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

            // Build the JWT parser with the secret key for signature verification
            JwtParser parser = Jwts.parser().verifyWith(key).build();

            // Parse and verify the JWT token; get the Claims (payload) from it
            Claims claims = parser.parseSignedClaims(jwt).getPayload();

            // Extract custom claims (email and authorities) from the JWT
            String email = String.valueOf(claims.get("email"));
            String authorities = String.valueOf(claims.get("authorities"));

            // Convert the authorities string into a list of GrantedAuthority
            List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

            // Create an Authentication object with the extracted user info and authorities
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

            // Set the Authentication object in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            // If any error occurs (invalid token, tampered, expired, etc.), throw exception
            throw new BadCredentialsException("Invalid JWT token", e);
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
