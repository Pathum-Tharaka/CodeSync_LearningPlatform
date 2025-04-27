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

@RestController
@RequestMapping("/api/progress")
public class LearningProgressUpdateController {

    @Autowired
    private LearningProgressUpdateService updateService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<LearningProgressUpdate> create(
            @RequestBody LearningProgressUpdate update,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        User user = userService.findUserProfile(token);
        LearningProgressUpdate created = updateService.createProgressUpdate(update, user.getId());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public List<LearningProgressUpdate> getUserUpdates(
            @RequestHeader("Authorization") String token
    ) throws UserException {
        User user = userService.findUserProfile(token);
        return updateService.getUserProgressUpdates(user.getId());
    }

    @PutMapping("/{id}")
    public LearningProgressUpdate update(
            @PathVariable Long id,
            @RequestBody LearningProgressUpdate update,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        User user = userService.findUserProfile(token);
        return updateService.updateProgressUpdate(id, update, user.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> delete(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) throws UserException {
        User user = userService.findUserProfile(token);
        updateService.deleteProgressUpdate(id, user.getId());
        return ResponseEntity.ok(new MessageResponse("Deleted successfully"));
    }
}
