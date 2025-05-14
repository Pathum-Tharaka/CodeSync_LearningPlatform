package com.backend.services;

import com.backend.exception.UserException;
import com.backend.model.LearningProgressUpdate;
import com.backend.model.User;
import com.backend.repository.LearningProgressUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

// Learning progress update service implementation
@Service
public class LearningProgressUpdateServiceImpl implements LearningProgressUpdateService {

    @Autowired
    private LearningProgressUpdateRepository updateRepository;

    @Autowired
    private UserService userService;

    // Creates a new learning progress update for the specified user
    @Override
    public LearningProgressUpdate createProgressUpdate(LearningProgressUpdate update, Integer userId) throws UserException {
        User user = userService.findUserById(userId); // Retrieve user by ID
        update.setUser(user); // Associate update with the user
        update.setCreatedAt(LocalDateTime.now()); // Set creation timestamp
        
        // Ensure dates are set
        if (update.getStartDate() == null) {
            update.setStartDate(LocalDateTime.now());
        }
        if (update.getEndDate() == null) {
            update.setEndDate(update.getStartDate().plusDays(7)); // Default to 7 days if not specified
        }
        
        // Set default milestone if not specified
        if (update.getMilestone() == null) {
            update.setMilestone("Beginner");
        }
        
        return updateRepository.save(update); // Save the update to the database
    }

    // Updates an existing learning progress update if it belongs to the user
    @Override
    public LearningProgressUpdate updateProgressUpdate(Long id, LearningProgressUpdate update, Integer userId) throws UserException {
        LearningProgressUpdate existing = updateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Update not found")); // Fetch update or throw error
        if (!existing.getUser().getId().equals(userId)) throw new RuntimeException("Unauthorized"); // Check ownership
        existing.setTitle(update.getTitle()); // Update title
        existing.setContent(update.getContent()); // Update content
        existing.setMilestone(update.getMilestone());
        existing.setStartDate(update.getStartDate());
        existing.setEndDate(update.getEndDate());
        return updateRepository.save(existing); // Save changes
    }

    // Deletes a learning progress update if it belongs to the user
    @Override
    public void deleteProgressUpdate(Long id, Integer userId) throws UserException {
        LearningProgressUpdate existing = updateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Update not found")); // Fetch update or throw error
        if (!existing.getUser().getId().equals(userId)) throw new RuntimeException("Unauthorized"); // Check ownership
        updateRepository.delete(existing); // Delete update
    }

    // Retrieves all progress updates for a specific user
    @Override
    public List<LearningProgressUpdate> getUserProgressUpdates(Integer userId) throws UserException {
        User user = userService.findUserById(userId); // Fetch user by ID
        return updateRepository.findByUser(user); // Return updates associated with user
    }
}
