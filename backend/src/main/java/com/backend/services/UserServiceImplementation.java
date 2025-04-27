package com.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dto.UserDto;
import com.backend.exception.PostException;
import com.backend.exception.UserException;
import com.backend.model.Post;
import com.backend.model.User;
import com.backend.repository.UserRepository;
import com.backend.security.JwtTokenClaims;
import com.backend.security.JwtTokenProvider;
import com.backend.util.UserUtil;

import net.bytebuddy.dynamic.loading.PackageDefinitionStrategy.Definition.Undefined;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public User registerUser(User user) throws UserException {

        System.out.println("registered user ------ ");

        Optional<User> isEmailExist = repo.findByEmail(user.getEmail());

        if (isEmailExist.isPresent()) {
            throw new UserException("Email Already Exist");
        }

        Optional<User> isUsernameTaken = repo.findByUsername(user.getUsername());

        if (isUsernameTaken.isPresent()) {
            throw new UserException("Username Already Taken");
        }

        if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null || user.getName() == null) {
            throw new UserException("email,password and username are required");

        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        User newUser = new User();

        newUser.setEmail(user.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setUsername(user.getUsername());
        newUser.setName(user.getName());

        return repo.save(newUser);

    }


    @Override
    public User findUserById(Integer userId) throws UserException {

        Optional<User> opt = repo.findById(userId);

        if (opt.isPresent()) {
            return opt.get();
        }

        throw new UserException("user not found with userid :" + userId);
    }


    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        User followUser = findUserById(followUserId);
        User reqUser = findUserById(reqUserId);

        UserDto follower = new UserDto();
        follower.setEmail(reqUser.getEmail());
        follower.setUsername(reqUser.getUsername());
        follower.setId(reqUser.getId());
        follower.setName(reqUser.getName());
        follower.setUserImage(reqUser.getImage());


        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setUsername(followUser.getUsername());
        following.setId(followUser.getId());
        following.setName(followUser.getName());
        following.setUserImage(followUser.getImage());


        followUser.getFollower().add(follower);
        reqUser.getFollowing().add(following);

        repo.save(followUser);
        repo.save(reqUser);

        return "you are following " + followUser.getUsername();
    }


    @Override
    public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException {


        User unfollowUser = findUserById(unfollowUserId);

        System.out.println("unfollow user ---- " + unfollowUser.toString());
        System.out.println("unfollow user's follower" + unfollowUser.getFollower().toString());

        User reqUser = findUserById(reqUserId);

        UserDto unfollow = new UserDto();
        unfollow.setEmail(reqUser.getEmail());
        unfollow.setUsername(reqUser.getUsername());
        unfollow.setId(reqUser.getId());
        unfollow.setName(reqUser.getName());
        unfollow.setUserImage(reqUser.getImage());


        UserDto following = new UserDto();
        following.setEmail(unfollowUser.getEmail());
        following.setUsername(unfollowUser.getUsername());
        following.setId(unfollowUser.getId());
        following.setName(unfollowUser.getName());
        following.setUserImage(unfollowUser.getImage());


        unfollowUser.getFollower().remove(unfollow);

        repo.save(reqUser);

//		User user= userService.findUserById(userId);
//		UserDto userDto=new UserDto();
//		
//		userDto.setEmail(user.getEmail());
//		userDto.setUsername(user.getUsername());
//		userDto.setId(user.getId());
//		
//		Post post=findePostById(postId);
//		post.getLikedByUsers().remove(userDto);

        return "you have unfollow " + unfollowUser.getUsername();


    }


    @Override
    public User findUserProfile(String token) throws UserException {

        token = token.substring(7);

        JwtTokenClaims jwtTokenClaims = jwtTokenProvider.getClaimsFromToken(token);

        String username = jwtTokenClaims.getUsername();

        Optional<User> opt = repo.findByEmail(username);

        if (opt.isPresent()) {


            return opt.get();

        }

        throw new UserException("user not exist with email : " + username);


    }


    @Override
    public User findUserByUsername(String username) throws UserException {

        Optional<User> opt = repo.findByUsername(username);

        if (opt.isPresent()) {
            User user = opt.get();
            return user;
        }

        throw new UserException("user not exist with username " + username);
    }


    @Override
    public List<User> findUsersByUserIds(List<Integer> userIds) {
        List<User> users = repo.findAllUserByUserIds(userIds);

        return users;
    }


    @Override
    public List<User> searchUser(String query) throws UserException {
        List<User> users = repo.findByQuery(query);
        if (users.size() == 0) {
            throw new UserException("user not exist");
        }
        return users;
    }


    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {

        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getBio() != null) {
            existingUser.setBio(updatedUser.getBio());
        }
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getUsername() != null) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getMobile() != null) {
            existingUser.setMobile(updatedUser.getMobile());
        }
        if (updatedUser.getGender() != null) {
            existingUser.setGender(updatedUser.getGender());
        }
        if (updatedUser.getWebsite() != null) {
            existingUser.setWebsite(updatedUser.getWebsite());
        }
        if (updatedUser.getImage() != null) {
            existingUser.setImage(updatedUser.getImage());
        }


        if (!updatedUser.getId().equals(existingUser.getId())) {

            System.out.println(" u " + updatedUser.getId() + " e " + existingUser.getId());
            throw new UserException("you can't update another user");
        }


        return repo.save(existingUser);

    }


    @Override
    public List<User> popularUser() {
        List<User> users = repo.findAll();

        UserUtil.sortUserByNumberOfPost(users);

        int numUsers = Math.min(users.size(), 5);
        List<User> populerUsers = users.subList(0, numUsers);

        return populerUsers;

    }


}
