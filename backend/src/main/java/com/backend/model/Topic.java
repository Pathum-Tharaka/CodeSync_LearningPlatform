package com.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed;
    private LocalDate targetCompletionDate;

    @ManyToOne
    @JoinColumn(name = "learning_plan_id")
    @JsonBackReference
    private LearningPlan learningPlan;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Resource> resources = new ArrayList<>();

    public Topic() {}

    public Topic(Long id, String title, String description, boolean completed, LocalDate targetCompletionDate, LearningPlan learningPlan, List<Resource> resources) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.targetCompletionDate = targetCompletionDate;
        this.learningPlan = learningPlan;
        this.resources = resources;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDate getTargetCompletionDate() {
        return targetCompletionDate;
    }

    public void setTargetCompletionDate(LocalDate targetCompletionDate) {
        this.targetCompletionDate = targetCompletionDate;
    }

    public LearningPlan getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(LearningPlan learningPlan) {
        this.learningPlan = learningPlan;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }
}
