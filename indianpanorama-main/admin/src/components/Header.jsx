import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Bell, ChevronDown, Check, CheckCircle2 } from 'lucide-react';

export function Header() {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');

    const fetchNotifications = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error('Failed to fetch notifications');
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds for live updates
        const interval = setInterval(fetchNotifications, 30000);

        // Handle clicking outside to close
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            clearInterval(interval);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const markAsRead = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}/read`, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            }
        } catch (error) {
            console.error('Failed to mark as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/read-all`, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            }
        } catch (error) {
            console.error('Failed to mark all as read');
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <header className="header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            padding: '0 32px',
            backgroundColor: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Dashboard
                </h1>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    Welcome back, Manager
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-bg-hover)', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}>
                        <CalendarIcon size={16} color="var(--color-primary-accent)" />
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{currentDate}</span>
                    </span>
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            background: isDropdownOpen ? 'var(--color-bg-hover)' : 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'background 0.2s'
                        }}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '6px',
                                width: '8px',
                                height: '8px',
                                backgroundColor: 'var(--color-danger)',
                                borderRadius: '50%',
                                border: '2px solid var(--color-bg-card)'
                            }}></span>
                        )}
                    </button>

                    {/* Notification Dropdown UI */}
                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '12px',
                            width: '380px',
                            background: 'var(--color-bg-card)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            border: '1px solid var(--color-border)',
                            zIndex: 1000,
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-body)' }}>
                                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Notifications {unreadCount > 0 && <span style={{ background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', marginLeft: '6px' }}>{unreadCount} New</span>}</h3>
                                {unreadCount > 0 && (
                                    <button onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCircle2 size={14} /> Mark all read
                                    </button>
                                )}
                            </div>

                            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <div
                                            key={notif._id}
                                            onClick={() => { if (!notif.isRead) markAsRead(notif._id) }}
                                            style={{
                                                padding: '16px 20px',
                                                borderBottom: '1px solid var(--color-border)',
                                                background: notif.isRead ? 'transparent' : 'rgba(59, 130, 246, 0.03)',
                                                cursor: notif.isRead ? 'default' : 'pointer',
                                                display: 'flex',
                                                gap: '16px',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            <div style={{
                                                width: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {!notif.isRead && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: notif.isRead ? 500 : 600, color: 'var(--color-text-primary)' }}>{notif.title}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(notif.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{notif.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                        <Bell size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
                                        <p style={{ margin: 0, fontSize: '0.95rem' }}>You're all caught up!</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-body)' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Synched in real-time</span>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary-accent)',
                        fontWeight: 600,
                        overflow: 'hidden'
                    }}>
                        <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Info" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Super Admin</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Admin Role</span>
                    </div>
                    <ChevronDown size={16} color="var(--color-text-muted)" />
                </div>
            </div>
        </header>
    );
}

function CalendarIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    );
}
