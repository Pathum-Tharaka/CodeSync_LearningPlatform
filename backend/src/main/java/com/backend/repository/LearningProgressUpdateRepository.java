package com.backend.repository;

import com.backend.model.LearningProgressUpdate;
import com.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Learning progress update repository interface
// Extends JpaRepository to provide CRUD operations for LearningProgressUpdate entity
public interface LearningProgressUpdateRepository extends JpaRepository<LearningProgressUpdate, Long> {

    // Retrieves all learning progress updates associated with a specific user
    List<LearningProgressUpdate> findByUser(User user);
}
