package com.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.model.User;
import com.backend.repository.UserRepository;

@Service
public class CustomUserDetailsServiceImplementation implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepository.findByEmail(username);
		
        if (user==null || user.isLogin_with_google()) {
            throw new UsernameNotFoundException("User not found with email"+ username);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}
}