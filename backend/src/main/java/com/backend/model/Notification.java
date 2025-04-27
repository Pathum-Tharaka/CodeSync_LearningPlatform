package com.backend.model;

import com.sun.istack.NotNull;
import com.backend.dto.UserDto;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "user_id")),
            @AttributeOverride(name = "email", column = @Column(name = "user_email")),
            @AttributeOverride(name = "username", column = @Column(name = "user_username"))
    })
    private UserDto user;

    @NotNull
    private String message;

    @NotNull
    private String type; // "LIKE", "COMMENT", "FOLLOW"

    private Integer postId;
    private Integer commentId;
    private boolean isRead;
    private LocalDateTime createdAt;

    public Notification() {}

    public Notification(Integer id, UserDto user, String message, String type,
                        Integer postId, Integer commentId, boolean isRead,
                        LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.type = type;
        this.postId = postId;
        this.commentId = commentId;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}