package com.backend.dto;

import java.util.List;

public class PostEditDto {
    private String caption;
    private String location;
    private List<String> mediaUrls;

    public PostEditDto() {
    }

    public PostEditDto(String caption, String location, List<String> mediaUrls) {
        this.caption = caption;
        this.location = location;
        this.mediaUrls = mediaUrls;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(List<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }
}