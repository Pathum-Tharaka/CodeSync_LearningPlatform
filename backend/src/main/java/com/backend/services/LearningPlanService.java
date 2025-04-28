package com.backend.services;

import com.backend.exception.LearningPlanException;
import com.backend.exception.ResourceException;
import com.backend.exception.TopicException;
import com.backend.exception.UserException;
import com.backend.model.LearningPlan;
import com.backend.model.Resource;
import com.backend.model.Topic;

import java.util.List;

public interface LearningPlanService {
    LearningPlan createLearningPlan(LearningPlan learningPlan, Integer userId) throws UserException;
    LearningPlan updateLearningPlan(LearningPlan learningPlan, Integer userId) throws UserException, LearningPlanException;
    LearningPlan getLearningPlanById(Long planId) throws LearningPlanException;
    List<LearningPlan> getLearningPlansByUserId(Integer userId) throws UserException;
    void deleteLearningPlan(Long planId, Integer userId) throws LearningPlanException, UserException;

    Topic addTopicToPlan(Long planId, Topic topic, Integer userId) throws LearningPlanException, UserException;
    Topic updateTopic(Long topicId, Topic topic, Integer userId) throws TopicException, UserException;
    void deleteTopic(Long topicId, Integer userId) throws TopicException, UserException;

    Resource addResourceToTopic(Long topicId, Resource resource, Integer userId) throws TopicException, UserException;
    Resource updateResource(Long resourceId, Resource resource, Integer userId) throws ResourceException, UserException;
    void deleteResource(Long resourceId, Integer userId) throws ResourceException, UserException;
}