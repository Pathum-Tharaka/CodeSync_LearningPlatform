package com.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.backend.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.UserDto;
import com.backend.exception.PostException;
import com.backend.exception.UserException;
import com.backend.model.Post;
import com.backend.model.User;
import com.backend.repository.PostRepository;
import com.backend.repository.UserRepository;


@Service
public class PostServiceImplementation implements PostService {

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Post createPost(Post post, Integer userId) throws UserException {
        User user = userService.findUserById(userId);

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());

        post.setUser(userDto);
        post.setCreatedAt(LocalDateTime.now());

        return postRepo.save(post);
    }


    @Override
    public List<Post> findPostByUserId(Integer userId) throws UserException {

        List<Post> posts = postRepo.findByUserId(userId);

        return posts;
    }


    @Override
    public Post findePostById(Integer postId) throws PostException {
        Optional<Post> opt = postRepo.findById(postId);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new PostException("Post not exist with id: " + postId);
    }


    @Override
    public List<Post> findAllPost() throws PostException {
        List<Post> posts = postRepo.findAll();
        if (posts.size() > 0) {
            return posts;
        }
        throw new PostException("Post Not Exist");
    }


    @Override
    public Post likePost(Integer postId, Integer userId) throws UserException, PostException {
        User user = userService.findUserById(userId);
        Post post = findePostById(postId);

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());

        post.getLikedByUsers().add(userDto);

        if (!post.getUser().getId().equals(userId)) {
            Notification notification = new Notification();
            notification.setMessage(user.getUsername() + " liked your post");
            notification.setType("LIKE");
            notification.setPostId(postId);
            notificationService.createNotification(notification, post.getUser().getId());
        }

        return postRepo.save(post);
    }
    @Override
    public Post unLikePost(Integer postId, Integer userId) throws UserException, PostException {
        // TODO Auto-generated method stub

        User user = userService.findUserById(userId);
        UserDto userDto = new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());

        Post post = findePostById(postId);
        post.getLikedByUsers().remove(userDto);


        return postRepo.save(post);
    }


    @Override
    public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
        // TODO Auto-generated method stub

        Post post = findePostById(postId);

        User user = userService.findUserById(userId);
        System.out.println(post.getUser().getId() + " ------ " + user.getId());
        if (post.getUser().getId().equals(user.getId())) {
            System.out.println("inside delete");
            postRepo.deleteById(postId);

            return "Post Deleted Successfully";
        }


        throw new PostException("You Dont have access to delete this post");

    }


    @Override
    public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException {


        List<Post> posts = postRepo.findAllPostByUserIds(userIds);

        if (posts.size() == 0) {
            throw new PostException("No Post Available of your followings");
        }


        return posts;
    }


    @Override
    public String savedPost(Integer postId, Integer userId) throws PostException, UserException {

        Post post = findePostById(postId);
        User user = userService.findUserById(userId);
        if (!user.getSavedPost().contains(post)) {
            user.getSavedPost().add(post);
            userRepo.save(user);
        }


        return "Post Saved Successfully";
    }


    @Override
    public String unSavePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findePostById(postId);
        User user = userService.findUserById(userId);

        if (user.getSavedPost().contains(post)) {
            user.getSavedPost().remove(post);
            userRepo.save(user);
        }

        return "Post Remove Successfully";
    }


    @Override
    public Post editPost(Integer postId, Post updatedPost, Integer userId) throws PostException, UserException {
        Post existingPost = findePostById(postId);

        if (!existingPost.getUser().getId().equals(userId)) {
            throw new PostException("You don't have permission to edit this post");
        }

        if (updatedPost.getCaption() != null) {
            existingPost.setCaption(updatedPost.getCaption());
        }

        if (updatedPost.getLocation() != null) {
            existingPost.setLocation(updatedPost.getLocation());
        }

        if (updatedPost.getMediaUrls() != null && !updatedPost.getMediaUrls().isEmpty()) {
            existingPost.setMediaUrls(updatedPost.getMediaUrls());
        }

        return postRepo.save(existingPost);

    }

}
