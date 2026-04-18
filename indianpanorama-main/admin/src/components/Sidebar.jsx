import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    UtensilsCrossed,
    ChefHat,
    Newspaper,
    CalendarDays,
    Sparkles,
    Users as UsersIcon,
    Gift,
    LinkIcon,
    LifeBuoy,
    Settings,
    LogOut
} from 'lucide-react';

const navGroups = [
    {
        heading: 'Overview',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        ],
    },
    {
        heading: 'Kitchen & Content',
        items: [
            { id: 'add-menu', label: 'Add Menu', icon: ChefHat, path: '/admin/menu' },
            { id: 'edit-menu', label: 'Edit Menu', icon: UtensilsCrossed, path: '/admin/menu' },
            { id: 'blogs', label: 'Blog Posts', icon: Newspaper, path: '/admin/blogs' },
            { id: 'events', label: 'Events', icon: Sparkles, path: '/admin/events' },
            { id: 'slugs', label: 'Landing Pages', icon: LinkIcon, path: '/admin/slugs' },
        ],
    },
    {
        heading: 'Guests',
        items: [
            { id: 'reservations', label: 'Reservations', icon: CalendarDays, path: '/admin/reservations' },
            { id: 'group-bookings', label: 'Group Bookings', icon: UsersIcon, path: '/admin/group-bookings' },
            { id: 'gift-cards', label: 'Gift Cards', icon: Gift, path: '/admin/gift-cards' },
            { id: 'support', label: 'Support', icon: LifeBuoy, path: '/admin/support' },
        ],
    },
    {
        heading: 'System',
        items: [
            { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
        ],
    },
];

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (item) => {
        if (item.id === 'dashboard') return location.pathname === '/admin' || location.pathname === '/admin/';
        return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div style={{
                padding: '24px 22px 20px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
            }}>
                <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, var(--brand-green-deep), var(--brand-green))',
                    color: 'var(--brand-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 18px rgba(22, 29, 24, 0.22)',
                    flexShrink: 0,
                }}>
                    <UtensilsCrossed size={20} strokeWidth={1.8} />
                </div>
                <div style={{ minWidth: 0 }}>
                    <h2 className="font-serif-display" style={{
                        margin: 0,
                        fontSize: '1.22rem',
                        color: 'var(--brand-green-deep)',
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>Indian Panorama</h2>
                    <p style={{
                        margin: '3px 0 0 0',
                        fontSize: '0.7rem',
                        color: 'var(--brand-gold-deep)',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                    }}>Chelsea · Admin</p>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '18px 14px', overflowY: 'auto' }}>
                {navGroups.map((group) => (
                    <div key={group.heading} style={{ marginBottom: '18px' }}>
                        <div style={{
                            padding: '4px 14px 8px',
                            fontSize: '0.67rem',
                            fontWeight: 700,
                            color: 'var(--color-text-muted)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}>
                            {group.heading}
                        </div>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {group.items.map((item) => {
                                const active = isActive(item);
                                const Icon = item.icon;
                                return (
                                    <li key={item.id}>
                                        <a
                                            href={item.path}
                                            onClick={(e) => { e.preventDefault(); navigate(item.path); }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '10px 14px',
                                                borderRadius: 'var(--radius-md)',
                                                color: active ? 'var(--brand-green-deep)' : 'var(--color-text-secondary)',
                                                background: active
                                                    ? 'linear-gradient(90deg, var(--brand-gold-soft), transparent 120%)'
                                                    : 'transparent',
                                                fontWeight: active ? 600 : 500,
                                                fontSize: '0.9rem',
                                                position: 'relative',
                                                transition: 'all var(--transition-fast)',
                                                borderLeft: active ? '3px solid var(--brand-gold)' : '3px solid transparent',
                                                paddingLeft: active ? '11px' : '14px',
                                            }}
                                            onMouseOver={(e) => {
                                                if (!active) {
                                                    e.currentTarget.style.background = 'var(--brand-cream)';
                                                    e.currentTarget.style.color = 'var(--brand-green-deep)';
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!active) {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                }
                                            }}
                                        >
                                            <Icon size={18} strokeWidth={active ? 2.2 : 1.8} color={active ? 'var(--brand-gold-deep)' : 'currentColor'} />
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div style={{ padding: '16px 14px', borderTop: '1px solid var(--color-border)' }}>
                <a
                    href="#"
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        color: 'var(--color-text-secondary)',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        borderRadius: 'var(--radius-md)',
                        transition: 'all var(--transition-fast)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--color-danger)';
                        e.currentTarget.style.backgroundColor = 'rgba(192, 68, 58, 0.08)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <LogOut size={18} strokeWidth={1.8} />
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    );
}
