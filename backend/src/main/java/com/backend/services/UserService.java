package com.backend.services;

import java.util.List;
import java.util.Optional;

import com.backend.dto.UserDto;
import com.backend.exception.PostException;
import com.backend.exception.UserException;
import com.backend.model.Post;
import com.backend.model.User;

public interface UserService {

    User registerUser(User user) throws UserException;

    User findUserById(Integer userId) throws UserException;

    User findUserProfile(String token) throws UserException;

    User findUserByUsername(String username) throws UserException;

    String followUser(Integer reqUserId, Integer followUserId) throws UserException;

    String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException;

    List<User> findUsersByUserIds(List<Integer> userIds);

    List<User> searchUser(String query) throws UserException;

    List<User> popularUser();


    User updateUserDetails(User updatedUser, User existingUser) throws UserException;


}
