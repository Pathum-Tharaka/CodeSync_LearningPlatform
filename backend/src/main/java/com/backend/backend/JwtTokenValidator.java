package com.backend.backend;

import java.io.IOException;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String jwt = request.getHeader(JwtConstant.JWT_HEADER);

                // Check if the JWT is present and starts with "Bearer "
                //Bearer jwt
                if (jwt!=null)
                    jwt=jwt.substring(7);
                try {
                    SecretKey Key = Keys.hmacShaKeyFor(JwtConstant
                    .SECRET_KEY.getBytes());
                    // Validate the JWT and extract claims
                    Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
                            
                            // Extract the email from the claims
                            String email = String.valueOf(claims.get("email"));
                            
                            // Extract the authorities from the claims
                            String authorities = String.valueOf(claims.get("authorities"));

                            List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

                            // Set the authentication in the security context
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            
                } catch (Exception e) {
                    //TODO: handle exception
                    throw new BadCredentialsException("Invalid JWT token");
                }
        }

    

}


