import React from 'react';
import { PlusSquare, FileText, Star, Edit3, HelpCircle } from 'lucide-react';

export function QuickActions() {
    const actions = [
        { icon: PlusSquare, title: 'Add Menu Item', description: 'Create new menu items', color: 'var(--color-success)' },
        { icon: FileText, title: 'Write Blog', description: 'Create new blog post', color: 'var(--color-info)' },
        { icon: Star, title: 'Manage Events', description: 'View event inquiries', color: 'var(--color-warning)' },
        { icon: Edit3, title: 'Manage Menu', description: 'Edit existing items', color: 'var(--color-danger)' },
        { icon: HelpCircle, title: 'Support', description: 'Manage support requests', color: 'var(--color-primary-accent)' },
    ];

    return (
        <div className="card" style={{ marginTop: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Quick Actions</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
            }}>
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '20px',
                            backgroundColor: 'var(--color-bg-main)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'left',
                            transition: 'all var(--transition-fast)',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = action.color;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--color-bg-hover)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: action.color
                            }}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <span style={{ display: 'block', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                    {action.title}
                                </span>
                                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                    {action.description}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
