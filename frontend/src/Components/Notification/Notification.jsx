// Components/Notification/Notification.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getNotificationsAction, 
    markNotificationAsReadAction, 
    deleteNotificationAction,
    clearNotificationError
} from "../../Redux/Notification/Action";
import { timeDifference } from "../../Config/Logic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiBell, FiHeart, FiMessageSquare, FiX, FiCheck, FiExternalLink } from "react-icons/fi";

const Notification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notification } = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [readNotifications, setReadNotifications] = useState(new Set());
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [justMarkedAsRead, setJustMarkedAsRead] = useState(null);

    useEffect(() => {
        dispatch(getNotificationsAction(token));
    }, [token, dispatch]);

    useEffect(() => {
        const readIds = new Set(
            notification.notifications
                .filter(item => item.isRead)
                .map(item => item.id)
        );
        setReadNotifications(readIds);
    }, [notification.notifications]);

    useEffect(() => {
        if (justMarkedAsRead) {
            const timer = setTimeout(() => {
                setJustMarkedAsRead(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [justMarkedAsRead]);

    useEffect(() => {
        if (notification.error) {
            toast.error(notification.error);
            dispatch(clearNotificationError());
        }
    }, [notification.error, dispatch]);

    const handleMarkAsRead = async (notification) => {
        try {
            setLoading(true);
            await dispatch(markNotificationAsReadAction(notification.id));
            setReadNotifications(prev => new Set([...prev, notification.id]));
            setJustMarkedAsRead(notification.id);
            toast.success("Notification marked as read");
        } catch (error) {
            toast.error("Failed to mark notification as read");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            setLoading(true);
            await dispatch(deleteNotificationAction(notificationId));
            toast.success("Notification deleted successfully");
        } catch (error) {
            toast.error("Failed to delete notification");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToPost = (postId) => {
        if (postId) {
            navigate(`/p/${postId}`);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'LIKE':
                return (
                    <div className="p-2 rounded-full bg-pink-50 text-pink-500">
                        <FiHeart className="w-5 h-5" />
                    </div>
                );
            case 'COMMENT':
                return (
                    <div className="p-2 rounded-full bg-blue-50 text-blue-500">
                        <FiMessageSquare className="w-5 h-5" />
                    </div>
                );
            default:
                return (
                    <div className="p-2 rounded-full bg-gray-50 text-gray-500">
                        <FiBell className="w-5 h-5" />
                    </div>
                );
        }
    };

    const filterNotifications = () => {
        let filteredNotifications = [...notification.notifications];
        switch (activeTab) {
            case 'unread':
                return filteredNotifications.filter(item => !readNotifications.has(item.id));
            case 'read':
                return filteredNotifications.filter(item => readNotifications.has(item.id));
            default:
                return filteredNotifications;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                            <div className="flex space-x-1">
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                    {filterNotifications().length} total
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="border-b border-gray-100">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-4 py-3 text-sm font-medium relative ${
                                    activeTab === 'all'
                                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('unread')}
                                className={`px-4 py-3 text-sm font-medium relative ${
                                    activeTab === 'unread'
                                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Unread
                            </button>
                            <button
                                onClick={() => setActiveTab('read')}
                                className={`px-4 py-3 text-sm font-medium relative ${
                                    activeTab === 'read'
                                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Read
                            </button>
                        </nav>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-gray-100">
                        {filterNotifications().length === 0 ? (
                            <div className="py-10 text-center">
                                <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                                    <FiBell className="w-full h-full" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {activeTab === 'all' 
                                        ? "Your notifications will appear here"
                                        : activeTab === 'unread'
                                        ? "You're all caught up!"
                                        : "No read notifications"}
                                </p>
                            </div>
                        ) : (
                            filterNotifications().map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 transition-colors duration-150 ${
                                        !readNotifications.has(item.id)
                                            ? 'bg-blue-50'
                                            : justMarkedAsRead === item.id
                                            ? 'bg-green-50'
                                            : 'bg-white'
                                    }`}
                                >
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            {getNotificationIcon(item.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src={item.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                    alt={item.user.username}
                                                />
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    <span className="font-semibold">{item.user.username}</span>
                                                    {" "}{item.message}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-xs text-gray-500">
                                                    {timeDifference(item.createdAt)}
                                                </span>
                                                <div className="flex gap-2">
                                                    {!readNotifications.has(item.id) && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(item)}
                                                            disabled={loading}
                                                            className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <FiCheck className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {item.postId && (
                                                        <button
                                                            onClick={() => handleNavigateToPost(item.postId)}
                                                            className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="View post"
                                                        >
                                                            <FiExternalLink className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        disabled={loading}
                                                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FiX className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;