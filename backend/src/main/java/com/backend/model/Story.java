package com.backend.model;

import java.time.LocalDateTime;

import com.backend.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "user_id")),
            @AttributeOverride(name = "email", column = @Column(name = "user_email")),
    })
    private UserDto userDto;

    @NotNull
    private String image;
    private String captions;
    private LocalDateTime timestamp;

    public Story() {
        // TODO Auto-generated constructor stub
    }


    public Story(Integer id, @NotNull UserDto userDto, @NotNull String image, String captions,
                 LocalDateTime timestamp) {
        super();
        this.id = id;
        this.userDto = userDto;
        this.image = image;
        this.captions = captions;
        this.timestamp = timestamp;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public UserDto getUserDto() {
        return userDto;
    }


    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaptions() {
        return captions;
    }

    public void setCaptions(String captions) {
        this.captions = captions;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }


}
