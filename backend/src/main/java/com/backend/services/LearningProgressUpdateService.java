package com.backend.services;

import com.backend.exception.UserException;
import com.backend.model.LearningProgressUpdate;

import java.util.List;

public interface LearningProgressUpdateService {

    LearningProgressUpdate createProgressUpdate(LearningProgressUpdate update, Integer userId) throws UserException;

    LearningProgressUpdate updateProgressUpdate(Long id, LearningProgressUpdate update, Integer userId) throws UserException;

    void deleteProgressUpdate(Long id, Integer userId) throws UserException;

    List<LearningProgressUpdate> getUserProgressUpdates(Integer userId) throws UserException;
}
