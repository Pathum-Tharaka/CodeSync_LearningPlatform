package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.model.Comments;


public interface CommentRepository extends JpaRepository<Comments, Integer> {


    @Query("SELECT c FROM Comments c WHERE c.post.id = :postId")
    List<Comments> findCommentsByPostId(@Param("postId") Integer postId);

}
