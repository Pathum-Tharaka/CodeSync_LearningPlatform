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

    @PostMapping("/{planId}/topics")
    public ResponseEntity<Topic> addTopicToPlan(
            @PathVariable Long planId,
            @RequestBody Topic topic,
            @RequestHeader("Authorization") String token) throws UserException, LearningPlanException {

        User user = userService.findUserProfile(token);
        Topic createdTopic = learningPlanService.addTopicToPlan(planId, topic, user.getId());
        return new ResponseEntity<>(createdTopic, HttpStatus.CREATED);
    }

    @PutMapping("/topics/{topicId}")
    public ResponseEntity<Topic> updateTopic(
            @PathVariable Long topicId,
            @RequestBody Topic topic,
            @RequestHeader("Authorization") String token) throws UserException, TopicException {

        User user = userService.findUserProfile(token);
        topic.setId(topicId);
        Topic updatedTopic = learningPlanService.updateTopic(topicId, topic, user.getId());
        return new ResponseEntity<>(updatedTopic, HttpStatus.OK);
    }

    @DeleteMapping("/topics/{topicId}")
    public ResponseEntity<MessageResponse> deleteTopic(
            @PathVariable Long topicId,
            @RequestHeader("Authorization") String token) throws UserException, TopicException {

        User user = userService.findUserProfile(token);
        learningPlanService.deleteTopic(topicId, user.getId());
        return new ResponseEntity<>(new MessageResponse("Topic deleted successfully"), HttpStatus.OK);
    }

    @PostMapping("/topics/{topicId}/resources")
    public ResponseEntity<Resource> addResourceToTopic(
            @PathVariable Long topicId,
            @RequestBody Resource resource,
            @RequestHeader("Authorization") String token) throws UserException, TopicException {

        User user = userService.findUserProfile(token);
        Resource createdResource = learningPlanService.addResourceToTopic(topicId, resource, user.getId());
        return new ResponseEntity<>(createdResource, HttpStatus.CREATED);
    }

    @PutMapping("/resources/{resourceId}")
    public ResponseEntity<Resource> updateResource(
            @PathVariable Long resourceId,
            @RequestBody Resource resource,
            @RequestHeader("Authorization") String token) throws UserException, ResourceException {

        User user = userService.findUserProfile(token);
        resource.setId(resourceId);
        Resource updatedResource = learningPlanService.updateResource(resourceId, resource, user.getId());
        return new ResponseEntity<>(updatedResource, HttpStatus.OK);
    }

    @DeleteMapping("/resources/{resourceId}")
    public ResponseEntity<MessageResponse> deleteResource(
            @PathVariable Long resourceId,
            @RequestHeader("Authorization") String token) throws UserException, ResourceException {

        User user = userService.findUserProfile(token);
        learningPlanService.deleteResource(resourceId, user.getId());
        return new ResponseEntity<>(new MessageResponse("Resource deleted successfully"), HttpStatus.OK);
    }
}