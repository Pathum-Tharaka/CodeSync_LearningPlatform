package com.backend.repository;

import com.backend.model.LearningProgressUpdate;
import com.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
//learning progress update repository interface
public interface LearningProgressUpdateRepository extends JpaRepository<LearningProgressUpdate, Long> {
    List<LearningProgressUpdate> findByUser(User user);
}
