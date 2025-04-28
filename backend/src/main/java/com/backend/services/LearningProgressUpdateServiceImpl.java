package com.backend.services;

import com.backend.exception.UserException;
import com.backend.model.LearningProgressUpdate;
import com.backend.model.User;
import com.backend.repository.LearningProgressUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LearningProgressUpdateServiceImpl implements LearningProgressUpdateService {

    @Autowired
    private LearningProgressUpdateRepository updateRepository;
    @Autowired private UserService userService;

    @Override
    public LearningProgressUpdate createProgressUpdate(LearningProgressUpdate update, Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        update.setUser(user);
        update.setCreatedAt(LocalDateTime.now());
        return updateRepository.save(update);
    }

   

