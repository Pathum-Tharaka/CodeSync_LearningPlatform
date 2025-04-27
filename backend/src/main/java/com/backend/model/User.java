package com.backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.backend.dto.UserDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;
    private String email;
    private String name;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ElementCollection
    @Embedded
    private Set<UserDto> follower = new HashSet<UserDto>();

    @ElementCollection
    @Embedded
    private Set<UserDto> following = new HashSet<UserDto>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Story> stories = new ArrayList<>();

    @ManyToMany
    private List<Post> savedPost = new ArrayList<>();

    public User() {
        // TODO Auto-generated constructor stub
    }


    public User(Integer id, String username, String email, String name, String mobile, String website, String bio,
                String gender, String image, String password, Set<UserDto> follower, Set<UserDto> following,
                List<Story> stories, List<Post> savedPost) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.mobile = mobile;
        this.website = website;
        this.bio = bio;
        this.gender = gender;
        this.image = image;
        this.password = password;
        this.follower = follower;
        this.following = following;
        this.stories = stories;
        this.savedPost = savedPost;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public Set<UserDto> getFollower() {
        return follower;
    }


    public void setFollower(Set<UserDto> follower) {
        this.follower = follower;
    }


    public Set<UserDto> getFollowing() {
        return following;
    }


    public void setFollowing(Set<UserDto> following) {
        this.following = following;
    }


    public List<Story> getStories() {
        return stories;
    }


    public void setStories(List<Story> stories) {
        this.stories = stories;
    }


    public List<Post> getSavedPost() {
        return savedPost;
    }


    public void setSavedPost(List<Post> savedPost) {
        this.savedPost = savedPost;
    }


    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
                + ", follower=" + follower + ", following=" + following + ", stories=" + stories + "]";
    }


    @Override
    public int hashCode() {
        return Objects.hash(email, id, username);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        return Objects.equals(email, other.email) && Objects.equals(id, other.id)
                && Objects.equals(username, other.username);
    }


}
