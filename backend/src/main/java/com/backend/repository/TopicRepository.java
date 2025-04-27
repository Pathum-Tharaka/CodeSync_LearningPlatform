package com.backend.repository;

import com.backend.model.LearningPlan;
import com.backend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByLearningPlan(LearningPlan learningPlan);
}
