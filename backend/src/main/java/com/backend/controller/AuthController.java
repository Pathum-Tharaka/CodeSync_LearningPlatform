package com.backend.controller;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

import com.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.backend.exception.UserException;
import com.backend.model.User;
import com.backend.repository.UserRepository;
import com.backend.services.UserService;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/signin")
    public ResponseEntity<User> signinHandler(Authentication auth) throws BadCredentialsException {


        try {
            User user = userRepo.findByEmail(auth.getName())
                    .orElseThrow(() -> new BadCredentialsException("Invalid Username or password"));
            return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }

    }



//    @GetMapping("/oauth-user")
//    public ResponseEntity<User> getOAuthUser(Principal principal) {
//        if (principal instanceof OAuth2AuthenticationToken authToken) {
//            Map<String, Object> attributes = authToken.getPrincipal().getAttributes();
//            String email = (String) attributes.get("email");
//
//            User user = userRepo.findByEmail(email).orElseGet(() -> {
//                User newUser = new User();
//                newUser.setEmail(email);
//                newUser.setName((String) attributes.get("name"));
//                return userRepo.save(newUser);
//            });
//
//            return ResponseEntity.ok(user);
//        }
//        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not an OAuth2 login");
//    }

    @GetMapping("/oauth-user")
    public ResponseEntity<User> getOAuthUser(Principal principal) {
        if (principal instanceof OAuth2AuthenticationToken authToken) {
            Map<String, Object> attributes = authToken.getPrincipal().getAttributes();
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");

            Optional<User> existingUserOpt = userRepo.findByEmail(email);
            User user = existingUserOpt.orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);

                // Generate unique username
                String baseUsername = email.split("@")[0];
                String uniqueUsername = baseUsername;
                int i = 0;
                while (userRepo.findByUsername(uniqueUsername).isPresent()) {
                    uniqueUsername = baseUsername + (++i);
                }

                newUser.setUsername(uniqueUsername);
                newUser.setPassword(passwordEncoder.encode("oauth_dummy_password"));
                return userRepo.save(newUser);
            });

            String token = jwtTokenProvider.generateToken(user);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            return ResponseEntity.ok().headers(headers).body(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not an OAuth2 login");
    }



    @PostMapping("/signup")
    public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {


        User createdUser = userService.registerUser(user);

        System.out.println("createdUser --- " + createdUser);

        return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);


    }


}
