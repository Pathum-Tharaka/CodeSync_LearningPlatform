package com.backend.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.backend.model")
public class CodesyncApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodesyncApplication.class, args);
	}

}
