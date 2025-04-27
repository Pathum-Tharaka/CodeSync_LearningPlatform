package com.backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {

	@Bean
	public SecurityFilterChain securityConfigration(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.cors().configurationSource(request -> {
					CorsConfiguration config = new CorsConfiguration();
					config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4000"));
					config.setAllowedMethods(Collections.singletonList("*"));
					config.setAllowCredentials(true);
					config.setAllowedHeaders(Collections.singletonList("*"));
					config.setExposedHeaders(Arrays.asList("Authorization"));
					config.setMaxAge(3600L);
					return config;
				})
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeHttpRequests()
				.requestMatchers(HttpMethod.POST, "/signup").permitAll()
				.requestMatchers(HttpMethod.GET, "/api").permitAll()
				.requestMatchers("/oauth2/**", "/login/**", "/oauth-user").permitAll()
				.anyRequest().authenticated()
				.and()
				.oauth2Login(oauth -> oauth
						.defaultSuccessUrl("http://localhost:3000/oauth-success", true)
						.failureUrl("http://localhost:3000/signin?error=true")
				)
				.formLogin()
				.and()
				.httpBasic()
				.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
				.and()
				.addFilterAfter(new JwtGenratorFilter(), BasicAuthenticationFilter.class)
				.addFilterBefore(new JwtValidationFilter(), BasicAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
