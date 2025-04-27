package com.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping("/api")
	public String homeControllerHandler() {
		
		return "welcome to Codesync backend api";
		
	}

}
