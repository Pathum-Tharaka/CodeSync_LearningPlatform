package com.backend.services;

import com.backend.exception.LearningPlanException;
import com.backend.exception.ResourceException;
import com.backend.exception.TopicException;
import com.backend.exception.UserException;
import com.backend.model.LearningPlan;
import com.backend.model.Resource;
import com.backend.model.Topic;
import com.backend.model.User;
import com.backend.repository.LearningPlanRepository;
import com.backend.repository.ResourceRepository;
import com.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
//learning plan service implementation
@Service
public class LearningPlanServiceImpl implements LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private UserService userService;

    @Override
    public LearningPlan createLearningPlan(LearningPlan learningPlan, Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        learningPlan.setUser(user);
        learningPlan.setCreatedAt(LocalDateTime.now());
        learningPlan.setUpdatedAt(LocalDateTime.now());
        LearningPlan savedPlan = learningPlanRepository.save(learningPlan);
        return savedPlan;
    }

    @Override
    public LearningPlan updateLearningPlan(LearningPlan learningPlan, Integer userId) throws LearningPlanException, UserException {
        LearningPlan existingPlan = getLearningPlanById(learningPlan.getId());

        if (!existingPlan.getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to update this plan");
        }

        existingPlan.setTitle(learningPlan.getTitle());
        existingPlan.setDescription(learningPlan.getDescription());
        existingPlan.setUpdatedAt(LocalDateTime.now());

        return learningPlanRepository.save(existingPlan);
    }

    @Override
    public LearningPlan getLearningPlanById(Long planId) throws LearningPlanException {
        return learningPlanRepository.findById(planId)
                .orElseThrow(() -> new LearningPlanException("Learning plan not found with id: " + planId));
    }

    @Override
    public List<LearningPlan> getLearningPlansByUserId(Integer userId) throws UserException {
        return learningPlanRepository.findByUserId(userId);
    }

    @Override
    public void deleteLearningPlan(Long planId, Integer userId) throws LearningPlanException, UserException {
        LearningPlan plan = getLearningPlanById(planId);

        if (!plan.getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to delete this plan");
        }

        learningPlanRepository.delete(plan);
    }

    @Override
    public Topic addTopicToPlan(Long planId, Topic topic, Integer userId) throws LearningPlanException, UserException {
        LearningPlan plan = getLearningPlanById(planId);

        if (!plan.getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to add topics to this plan");
        }

        topic.setLearningPlan(plan);
        return topicRepository.save(topic);
    }

    @Override
    public Topic updateTopic(Long topicId, Topic topic, Integer userId) throws TopicException, UserException {
        Topic existingTopic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicException("Topic not found with id: " + topicId));

        if (!existingTopic.getLearningPlan().getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to update this topic");
        }

        existingTopic.setTitle(topic.getTitle());
        existingTopic.setDescription(topic.getDescription());
        existingTopic.setCompleted(topic.isCompleted());
        existingTopic.setTargetCompletionDate(topic.getTargetCompletionDate());

        return topicRepository.save(existingTopic);
    }

    @Override
    public void deleteTopic(Long topicId, Integer userId) throws TopicException, UserException {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicException("Topic not found with id: " + topicId));

        if (!topic.getLearningPlan().getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to delete this topic");
        }

        topicRepository.delete(topic);
    }

    @Override
    public Resource addResourceToTopic(Long topicId, Resource resource, Integer userId) throws TopicException, UserException {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicException("Topic not found with id: " + topicId));

        if (!topic.getLearningPlan().getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to add resources to this topic");
        }

        resource.setTopic(topic);
        return resourceRepository.save(resource);
    }

    @Override
    public Resource updateResource(Long resourceId, Resource resource, Integer userId) throws ResourceException, UserException {
        Resource existingResource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceException("Resource not found with id: " + resourceId));

        if (!existingResource.getTopic().getLearningPlan().getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to update this resource");
        }

        existingResource.setUrl(resource.getUrl());
        existingResource.setDescription(resource.getDescription());

        return resourceRepository.save(existingResource);
    }

    @Override
    public void deleteResource(Long resourceId, Integer userId) throws ResourceException, UserException {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceException("Resource not found with id: " + resourceId));

        if (!resource.getTopic().getLearningPlan().getUser().getId().equals(userId)) {
            throw new UserException("You don't have permission to delete this resource");
        }

        resourceRepository.delete(resource);
    }
}