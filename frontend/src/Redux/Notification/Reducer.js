// Redux/Notification/Reducer.js
import {
    GET_NOTIFICATIONS,
    GET_UNREAD_NOTIFICATIONS,
    MARK_NOTIFICATION_AS_READ,
    DELETE_NOTIFICATION,
    CREATE_NOTIFICATION
} from "./ActionType";

const initialState = {
    notifications: [],
    unreadNotifications: [],
};

export const notificationReducer = (store = initialState, { type, payload }) => {
    if (type === GET_NOTIFICATIONS) {
        return { ...store, notifications: payload };
    } else if (type === GET_UNREAD_NOTIFICATIONS) {
        return { ...store, unreadNotifications: payload };
    } else if (type === MARK_NOTIFICATION_AS_READ) {
        const updatedNotifications = store.notifications.map((notification) =>
            notification.id === payload.id ? payload : notification
        );
        const updatedUnreadNotifications = store.unreadNotifications.filter(
            (notification) => notification.id !== payload.id
        );
        return {
            ...store,
            notifications: updatedNotifications,
            unreadNotifications: updatedUnreadNotifications,
        };
    } else if (type === DELETE_NOTIFICATION) {
        const updatedNotifications = store.notifications.filter(
            (notification) => notification.id !== payload
        );
        const updatedUnreadNotifications = store.unreadNotifications.filter(
            (notification) => notification.id !== payload
        );
        return {
            ...store,
            notifications: updatedNotifications,
            unreadNotifications: updatedUnreadNotifications,
        };
    } else if (type === CREATE_NOTIFICATION) {
        return {
            ...store,
            notifications: [payload, ...store.notifications],
            unreadNotifications: [payload, ...store.unreadNotifications],
        };
    }
    return store;
};