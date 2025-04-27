package com.backend.services;


import com.backend.exception.NotificationException;
import com.backend.exception.UserException;
import com.backend.model.Notification;

import java.util.List;

public interface NotificationService {

    Notification createNotification(Notification notification, Integer userId) throws UserException;

    List<Notification> getNotificationsByUserId(Integer userId) throws UserException;

    Notification markAsRead(Integer notificationId) throws NotificationException;

    void deleteNotification(Integer notificationId) throws NotificationException;

    List<Notification> getUnreadNotifications(Integer userId) throws UserException;
}
