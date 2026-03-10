import React from 'react';
import { Clock } from 'lucide-react';

export function RecentActivity({ activities }) {
    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-header">
                <h3 className="card-title">Recent Activity</h3>
                <Clock size={20} color="var(--color-text-muted)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
                {activities.map((activity, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-primary-accent)',
                            marginTop: '6px'
                        }} />
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                {activity.title}
                            </p>
                            <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                {activity.subtitle}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{activity.time}</span>
                                <span className="badge" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-primary-accent)' }}>
                                    {activity.location}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
