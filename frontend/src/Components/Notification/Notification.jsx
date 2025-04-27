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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';


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

    // Reference for the modal
    const [modal, setModal] = useState(null);

    useEffect(() => {
        // Initialize Bootstrap modal
        const modalElement = document.getElementById('markAsReadModal');
        const bootstrapModal = new Modal(modalElement);
        setModal(bootstrapModal);
    }, []);

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

    const openMarkAsReadModal = (notification) => {
        setSelectedNotification(notification);
        modal?.show();
    };

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
                    <div className="rounded-full bg-red-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'COMMENT':
                return (
                    <div className="rounded-full bg-blue-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return null;
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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    </div>
                    
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'all'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('unread')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'unread'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Unread
                            </button>
                            <button
                                onClick={() => setActiveTab('read')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'read'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Read
                            </button>
                        </nav>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filterNotifications().length === 0 ? (
                            <div className="py-12 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by following some users or creating posts.</p>
                            </div>
                        ) : (
                            filterNotifications().map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 ${
                                        !readNotifications.has(item.id)
                                            ? 'bg-blue-50'
                                            : justMarkedAsRead === item.id
                                            ? 'bg-green-50'
                                            : 'bg-white'
                                    } transition-colors duration-200`}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {getNotificationIcon(item.type)}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={item.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                        alt=""
                                                    />
                                                    <p className="text-sm font-medium text-gray-900">
                                                        <span className="font-bold">{item.user.username}</span>
                                                        {" "}{item.message}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    {!readNotifications.has(item.id) && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(item)}
                                                            disabled={loading}
                                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        disabled={loading}
                                                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                    {item.postId && (
                                                        <button
                                                            onClick={() => handleNavigateToPost(item.postId)}
                                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                        >
                                                            View Post
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {timeDifference(item.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Mark as Read Confirmation Modal */}
            <div className="modal fade" id="markAsReadModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Mark as Read</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to mark this notification as read?</p>
                            {selectedNotification && (
                                <div className="p-3 bg-light rounded">
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            className="rounded-circle"
                                            src={selectedNotification.user.userImage}
                                            alt=""
                                            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <p className="mb-0">
                                                <strong>{selectedNotification.user.username}</strong>
                                                {" "}{selectedNotification.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={() => handleMarkAsRead(selectedNotification)}
                                disabled={loading}
                            >
                                {loading ? 'Marking...' : 'Mark as Read'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;