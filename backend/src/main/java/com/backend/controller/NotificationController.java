package com.backend.controller;

import com.backend.exception.NotificationException;
import com.backend.exception.UserException;
import com.backend.model.Notification;
import com.backend.model.User;
import com.backend.response.MessageResponse;
import com.backend.services.NotificationService;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    // Endpoint to create a new notification for a user
    @PostMapping("/create")
    public ResponseEntity<Notification> createNotification(
            @RequestBody Notification notification,
            @RequestHeader("Authorization") String token) throws UserException {

        // Fetch the authenticated user
        User user = userService.findUserProfile(token);
        // Create notification for the user
        Notification createdNotification = notificationService.createNotification(notification, user.getId());

        return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
    }

    // Endpoint to retrieve all notifications for a user
    @GetMapping("/")
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestHeader("Authorization") String token) throws UserException {

        // Fetch the authenticated user
        User user = userService.findUserProfile(token);
        // Get all notifications for the user
        List<Notification> notifications = notificationService.getNotificationsByUserId(user.getId());

        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    // Endpoint to retrieve unread notifications for a user
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(
            @RequestHeader("Authorization") String token) throws UserException {

        // Fetch the authenticated user
        User user = userService.findUserProfile(token);
        // Get unread notifications
        List<Notification> notifications = notificationService.getUnreadNotifications(user.getId());

        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    // Endpoint to mark a specific notification as read
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<Notification> markAsRead(
            @PathVariable Integer notificationId) throws NotificationException {

        // Mark the notification as read
        Notification notification = notificationService.markAsRead(notificationId);
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    // Endpoint to delete a specific notification
    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<MessageResponse> deleteNotification(
            @PathVariable Integer notificationId) throws NotificationException {

        // Delete the notification
        notificationService.deleteNotification(notificationId);
        // Return success response
        MessageResponse res = new MessageResponse("Notification deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
