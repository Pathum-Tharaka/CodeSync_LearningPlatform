package com.backend.services;

import java.util.List;

import com.backend.exception.PostException;
import com.backend.exception.UserException;
import com.backend.model.Post;
import com.backend.model.User;

public interface PostService {

	public Post createPost(Post post,Integer userId) throws UserException, PostException;

	public Post editPost(Integer postId, Post updatedPost, Integer userId) throws PostException, UserException;

	public String deletePost(Integer postId, Integer userId) throws UserException,PostException;
	
	public List<Post> findPostByUserId(Integer userId) throws UserException;
	
	public Post findePostById(Integer postId) throws PostException;

	public List<Post> findAllPost() throws PostException;
	
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException;
	
	public String savedPost(Integer postId,Integer userId) throws PostException, UserException;
	
	public String unSavePost(Integer postId,Integer userId) throws PostException, UserException;
		
	public Post likePost(Integer postId ,Integer userId) throws UserException, PostException;
	
	public Post unLikePost(Integer postId ,Integer userId) throws UserException, PostException;
	
}
