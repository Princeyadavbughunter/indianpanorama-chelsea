import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    PlusSquare,
    Edit3,
    FileText,
    CalendarDays,
    Star,
    Gift,
    MapPin,
    HelpCircle,
    Settings,
    LogOut
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-menu', label: 'Add Menu', icon: PlusSquare },
    { id: 'edit-menu', label: 'Edit Menu', icon: Edit3 },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'reservations', label: 'Reservations', icon: CalendarDays },
    { id: 'events', label: 'Events', icon: Star },
    { id: 'group-bookings', label: 'Group Bookings', icon: Star },
    { id: 'gift-cards', label: 'Gift Cards', icon: Gift },
    { id: 'slugs', label: 'Slugs', icon: LayoutDashboard },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeItem = 'dashboard' }) {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header" style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)' }}>
                <h2 style={{ margin: 0, color: 'var(--color-primary-accent)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-bg-hover)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px var(--color-primary-glow)' }}>
                        <LayoutDashboard size={20} color="var(--color-primary-accent)" />
                    </div>
                    Portal
                </h2>
                <p style={{ margin: '4px 0 0 44px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Management System</p>
            </div>

            <nav className="sidebar-nav" style={{ flex: 1, padding: '24px 16px', overflowY: 'auto' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => {
                        const isActive = activeItem === item.id;
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/admin/${item.id === 'dashboard' ? '' : item.id === 'add-menu' || item.id === 'edit-menu' ? 'menu' : item.id === 'blogs' ? 'blogs' : item.id}`);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        borderRadius: 'var(--radius-md)',
                                        color: isActive ? 'var(--color-primary-accent)' : 'var(--color-text-secondary)',
                                        backgroundColor: isActive ? 'var(--color-bg-active)' : 'transparent',
                                        transition: 'all var(--transition-fast)',
                                        fontWeight: isActive ? 600 : 500,
                                        borderLeft: isActive ? '4px solid var(--color-primary-accent)' : '4px solid transparent',
                                        boxShadow: isActive ? 'inset 2px 0 0 var(--color-primary-accent), 0 4px 12px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer" style={{ padding: '24px 16px', borderTop: '1px solid var(--color-border)' }}>
                <a
                    href="#"
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        color: 'var(--color-text-secondary)',
                        fontWeight: 500,
                        borderRadius: 'var(--radius-md)',
                        transition: 'all var(--transition-fast)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--color-danger)';
                        e.currentTarget.style.backgroundColor = 'rgba(217, 83, 79, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <LogOut size={20} />
                    Logout
                </a>
            </div>
        </aside>
    );
}
