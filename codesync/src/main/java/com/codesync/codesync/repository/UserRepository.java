package com.codesync.codesync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codesync.codesync.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
