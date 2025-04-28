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
