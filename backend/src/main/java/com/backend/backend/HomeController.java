package com.backend.backend;
// Use your actual package name here

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Spring Boot is working!";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from backend!";
    }
}

