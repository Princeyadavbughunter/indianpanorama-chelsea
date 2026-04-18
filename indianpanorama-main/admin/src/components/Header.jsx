import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Bell, ChevronDown, CheckCircle2, CalendarDays, User } from 'lucide-react';

export function Header() {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');

    const fetchNotifications = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
                headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' }
            });
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
        const interval = setInterval(fetchNotifications, 30000);

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' }
            });
            if (res.ok) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            }
        } catch (error) {
            console.error('Failed to mark as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/read-all`, {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' }
            });
            if (res.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            }
        } catch (error) {
            console.error('Failed to mark all as read');
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <header className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div>
                    <h1 className="font-serif-display" style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--brand-green-deep)',
                        letterSpacing: '-0.01em',
                    }}>
                        Dashboard
                    </h1>
                    <p style={{ margin: '2px 0 0', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>
                        Welcome back — here’s what’s happening at the restaurant today.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Date pill */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--brand-cream-2)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.82rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                }}>
                    <CalendarDays size={15} color="var(--brand-gold-deep)" />
                    {currentDate}
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            background: isDropdownOpen ? 'var(--brand-gold-soft)' : 'var(--brand-cream)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--brand-green-deep)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--radius-full)',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        <Bell size={18} strokeWidth={1.8} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '6px',
                                minWidth: '16px',
                                height: '16px',
                                padding: '0 4px',
                                background: 'var(--brand-rust)',
                                color: '#fff',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                borderRadius: '8px',
                                border: '2px solid var(--color-bg-card)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                lineHeight: 1,
                            }}>{unreadCount}</span>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '10px',
                            width: '380px',
                            background: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--color-border)',
                            zIndex: 1000,
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                padding: '14px 18px',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'var(--brand-cream)',
                            }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--brand-green-deep)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Notifications
                                    {unreadCount > 0 && (
                                        <span style={{ background: 'var(--brand-gold)', color: 'var(--brand-green-deep)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>
                                            {unreadCount} new
                                        </span>
                                    )}
                                </h3>
                                {unreadCount > 0 && (
                                    <button onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: 'var(--brand-gold-deep)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCircle2 size={13} /> Mark all read
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
                                                padding: '14px 18px',
                                                borderBottom: '1px solid var(--color-border)',
                                                background: notif.isRead ? 'transparent' : 'var(--brand-gold-soft)',
                                                cursor: notif.isRead ? 'default' : 'pointer',
                                                display: 'flex',
                                                gap: '12px',
                                                transition: 'background var(--transition-fast)',
                                            }}
                                        >
                                            <div style={{ width: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6px' }}>
                                                {!notif.isRead && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-gold-deep)' }}></div>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '3px' }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: notif.isRead ? 500 : 600, color: 'var(--color-text-primary)' }}>{notif.title}</h4>
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{new Date(notif.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{notif.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                        <Bell size={28} style={{ opacity: 0.25, marginBottom: '10px' }} />
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>You’re all caught up.</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid var(--color-border)', background: 'var(--brand-cream)' }}>
                                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>SYNCED IN REAL-TIME</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile pill */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '4px 12px 4px 4px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--brand-cream)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                }}>
                    <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--brand-gold)',
                        background: 'var(--brand-green-deep)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <User size={18} color="var(--brand-gold)" strokeWidth={1.8} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--brand-green-deep)' }}>Super Admin</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Restaurant Manager</span>
                    </div>
                    <ChevronDown size={14} color="var(--color-text-muted)" />
                </div>
            </div>
        </header>
    );
}
