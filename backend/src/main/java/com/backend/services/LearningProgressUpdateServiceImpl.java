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

    @Override
    public LearningProgressUpdate updateProgressUpdate(Long id, LearningProgressUpdate update, Integer userId) throws UserException {
        LearningProgressUpdate existing = updateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Update not found"));
        if (!existing.getUser().getId().equals(userId)) throw new RuntimeException("Unauthorized");
        existing.setTitle(update.getTitle());
        existing.setContent(update.getContent());
        return updateRepository.save(existing);
    }

    @Override
    public void deleteProgressUpdate(Long id, Integer userId) throws UserException {
        LearningProgressUpdate existing = updateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Update not found"));
        if (!existing.getUser().getId().equals(userId)) throw new RuntimeException("Unauthorized");
        updateRepository.delete(existing);
    }

    @Override
    public List<LearningProgressUpdate> getUserProgressUpdates(Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        return updateRepository.findByUser(user);
    }
}

