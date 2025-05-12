package com.backend.controller;

import com.backend.exception.UserException;
import com.backend.model.LearningProgressUpdate;
import com.backend.model.User;
import com.backend.response.MessageResponse;
import com.backend.services.LearningProgressUpdateService;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Learning progress update controller
// This class handles HTTP requests related to learning progress updates
@RestController
@RequestMapping("/api/progress")
public class LearningProgressUpdateController {

    @Autowired
    private LearningProgressUpdateService updateService;

    @Autowired
    private UserService userService;

    // Endpoint to create a new learning progress update
    @PostMapping("/")
    public ResponseEntity<LearningProgressUpdate> create(
            @RequestBody LearningProgressUpdate update,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        // Get the authenticated user
        User user = userService.findUserProfile(token);
        // Create the progress update
        LearningProgressUpdate created = updateService.createProgressUpdate(update, user.getId());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Endpoint to get all learning progress updates for the authenticated user
    @GetMapping("/user")
    public List<LearningProgressUpdate> getUserUpdates(
            @RequestHeader("Authorization") String token
    ) throws UserException {
        // Get the authenticated user
        User user = userService.findUserProfile(token);
        // Return list of progress updates
        return updateService.getUserProgressUpdates(user.getId());
    }

    // Endpoint to update a specific learning progress update
    @PutMapping("/{id}")
    public LearningProgressUpdate update(
            @PathVariable Long id,
            @RequestBody LearningProgressUpdate update,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        // Get the authenticated user
        User user = userService.findUserProfile(token);
        // Update the progress update
        return updateService.updateProgressUpdate(id, update, user.getId());
    }

    // Endpoint to delete a specific learning progress update
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> delete(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        // Get the authenticated user
        User user = userService.findUserProfile(token);
        // Delete the progress update
        updateService.deleteProgressUpdate(id, user.getId());
        return ResponseEntity.ok(new MessageResponse("Deleted successfully"));
    }
}
// This class handles HTTP requests related to learning progress updates