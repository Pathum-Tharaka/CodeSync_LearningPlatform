package com.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import com.backend.config.SecurityContest;
import com.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider {
	
	public JwtTokenClaims getClaimsFromToken(String token) {
		SecretKey key= Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());
		
	    Claims claims = Jwts.parser()
	            .setSigningKey(key)
	            .parseClaimsJws(token)
	            .getBody();
	    String username= String.valueOf(claims.get("username"));

	    JwtTokenClaims jwtTokenClaims = new JwtTokenClaims();
//	    jwtTokenClaims.setUsername(Long.parseLong(claims.getSubject()));
	    jwtTokenClaims.setUsername(username);

	    return jwtTokenClaims;
	}
	
	public String  generateJwtToken(User user) {
		SecretKey key=Keys.hmacShaKeyFor(SecurityContest.JWT_KEY.getBytes());
		
		String jwt=Jwts.builder()
				.setIssuer("Ashok Zarmariya")
				.claim("username",user.getEmail())
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime()+ 990000000))
				.signWith(key).compact();
		
		
		return jwt;
	}

	public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("username", user.getEmail());
		return createToken(claims, user.getEmail());
	}

	private String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, "SECRET_KEY")
				.compact();
	}


}
