package com.backend.controller;

import com.backend.exception.LearningPlanException;
import com.backend.exception.ResourceException;
import com.backend.exception.TopicException;
import com.backend.exception.UserException;
import com.backend.model.LearningPlan;
import com.backend.model.Resource;
import com.backend.model.Topic;
import com.backend.model.User;
import com.backend.response.MessageResponse;
import com.backend.services.LearningPlanService;
import com.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/learning_plan")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<LearningPlan> createLearningPlan(@Valid
            @RequestBody LearningPlan learningPlan,
            @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        LearningPlan createdPlan = learningPlanService.createLearningPlan(learningPlan, user.getId());
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    @PutMapping("/{planId}")
    public ResponseEntity<LearningPlan> updateLearningPlan(
            @PathVariable Long planId,
            @RequestBody LearningPlan learningPlan,
            @RequestHeader("Authorization") String token) throws UserException, LearningPlanException {

        User user = userService.findUserProfile(token);
        learningPlan.setId(planId);
        LearningPlan updatedPlan = learningPlanService.updateLearningPlan(learningPlan, user.getId());
        return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
    }

    @GetMapping("/{planId}")
    public ResponseEntity<LearningPlan> getLearningPlan(
            @PathVariable Long planId) throws LearningPlanException {

        LearningPlan plan = learningPlanService.getLearningPlanById(planId);
        return new ResponseEntity<>(plan, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<LearningPlan>> getUserLearningPlans(
            @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        List<LearningPlan> plans = learningPlanService.getLearningPlansByUserId(user.getId());
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<MessageResponse> deleteLearningPlan(
            @PathVariable Long planId,
            @RequestHeader("Authorization") String token) throws UserException, LearningPlanException {

        User user = userService.findUserProfile(token);
        learningPlanService.deleteLearningPlan(planId, user.getId());
        return new ResponseEntity<>(new MessageResponse("Learning plan deleted successfully"), HttpStatus.OK);
    }
