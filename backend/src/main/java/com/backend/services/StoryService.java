package com.backend.services;

import java.util.List;

import com.backend.exception.StoryException;
import com.backend.exception.UserException;
import com.backend.model.Story;

public interface StoryService {

	public Story createStory(Story story,Integer userId) throws UserException;
	
	public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
	
	
}
