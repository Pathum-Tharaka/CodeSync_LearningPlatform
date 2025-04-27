package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.exception.StoryException;
import com.backend.exception.UserException;
import com.backend.model.Story;
import com.backend.model.User;
import com.backend.services.StoryService;
import com.backend.services.UserService;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<Story> createStoryHandler(@RequestBody Story story, @RequestHeader("Authorization") String token) throws UserException {

        User reqUser = userService.findUserProfile(token);

        Story createdStory = storyService.createStory(story, reqUser.getId());
        return new ResponseEntity<Story>(createdStory, HttpStatus.OK);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Story>> findAllStoryByUserIdHandler(@PathVariable Integer userId) throws UserException, StoryException {

        List<Story> stories = storyService.findStoryByUserId(userId);

        System.out.println("stories userid --------- ");

        return new ResponseEntity<List<Story>>(stories, HttpStatus.OK);
    }

}
