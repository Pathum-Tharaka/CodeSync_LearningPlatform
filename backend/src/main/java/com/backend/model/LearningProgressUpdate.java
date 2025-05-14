package com.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

// Learning progress update entity class
// This class represents the learning progress update entity in the database
@Entity
public class LearningProgressUpdate {

    // Primary key for the learning progress update
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the progress update
    private String title;

    // Content/details of the progress update
    private String content;

    // Milestone of the progress update
    private String milestone;

    // Start date of the progress update
    private LocalDateTime startDate;

    // End date of the progress update
    private LocalDateTime endDate;

    // Timestamp for when the update was created
    private LocalDateTime createdAt;

    // Many-to-one relationship with User entity
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference // Prevents infinite recursion during JSON serialization
    private User user;

    // Default constructor
    public LearningProgressUpdate() {}

    // Constructor with all fields
    public LearningProgressUpdate(Long id, String title, String content, String milestone, 
                                LocalDateTime startDate, LocalDateTime endDate, 
                                LocalDateTime createdAt, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.milestone = milestone;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.user = user;
    }

    // Getter and setter methods
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // New getters and setters
    public String getMilestone() {
        return milestone;
    }

    public void setMilestone(String milestone) {
        this.milestone = milestone;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}
