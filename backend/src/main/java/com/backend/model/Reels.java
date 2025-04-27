package com.backend.model;

import jakarta.persistence.Id;

import com.backend.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Reels {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String caption;

    private String video;

    @Embedded
    @AttributeOverride(name = "id", column = @Column(name = "user_id"))
    @AttributeOverride(name = "email", column = @Column(name = "user_email"))
    @AttributeOverride(name = "username", column = @Column(name = "user_username"))
    private UserDto user;

    public Reels() {
        // TODO Auto-generated constructor stub
    }

    public Reels(Integer id, String caption, String video, UserDto user) {
        super();
        this.id = id;
        this.caption = caption;
        this.video = video;
        this.user = user;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }


}
