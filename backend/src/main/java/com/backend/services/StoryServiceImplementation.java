package com.backend.services;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.UserDto;
import com.backend.exception.StoryException;
import com.backend.exception.UserException;
import com.backend.model.Story;
import com.backend.model.User;
import com.backend.repository.StoryRepository;
import com.backend.repository.UserRepository;

@Service
public class StoryServiceImplementation implements StoryService {
	
	@Autowired
	private StoryRepository storyRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Story createStory(Story story, Integer userId) throws UserException {
		
		User user = userService.findUserById(userId);
	
		
		UserDto userDto=new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		
		story.setUserDto(userDto);
		story.setTimestamp(LocalDateTime.now());
		
		user.getStories().add(story);

		return storyRepo.save(story);
		
		
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws UserException,StoryException {
		
		User user = userService.findUserById(userId);
		
		List<Story>  stories = user.getStories();
		
		if(stories.size()==0) {
			throw new StoryException("This user Don't have any Story");
		}
		
		return stories;
	}

}
