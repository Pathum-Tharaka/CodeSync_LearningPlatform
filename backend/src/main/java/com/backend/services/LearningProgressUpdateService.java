package com.backend.services;

import com.backend.exception.UserException;
import com.backend.model.LearningProgressUpdate;

import java.util.List;

// Learning progress update service interface
// Defines the contract for services related to learning progress updates
public interface LearningProgressUpdateService {

    // Creates a new learning progress update for a specific user
    LearningProgressUpdate createProgressUpdate(LearningProgressUpdate update, Integer userId) throws UserException;

    // Updates an existing learning progress update for a specific user
    LearningProgressUpdate updateProgressUpdate(Long id, LearningProgressUpdate update, Integer userId) throws UserException;

    // Deletes a learning progress update for a specific user
    void deleteProgressUpdate(Long id, Integer userId) throws UserException;

    // Retrieves all learning progress updates for a specific user
    List<LearningProgressUpdate> getUserProgressUpdates(Integer userId) throws UserException;
}
