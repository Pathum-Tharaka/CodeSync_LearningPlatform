package com.backend.repository;

import com.backend.model.Resource;
import com.backend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByTopic(Topic topic);
}