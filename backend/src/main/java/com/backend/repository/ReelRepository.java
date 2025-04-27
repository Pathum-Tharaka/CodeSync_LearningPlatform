package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Reels;

public interface ReelRepository extends JpaRepository<Reels, Integer>{
}
