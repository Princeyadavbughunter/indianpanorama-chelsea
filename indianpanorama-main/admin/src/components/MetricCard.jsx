import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({ title, value, icon: Icon, trend, trendLabel }) {
    const isPositive = trend > 0;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="icon-soft">
                    {Icon && <Icon size={24} />}
                </div>

                {trend !== undefined && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: isPositive ? 'var(--color-success)' : 'var(--color-danger)',
                        fontSize: '0.875rem',
                        fontWeight: 500
                    }}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary-accent)' }}>
                    {value}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                    {title}
                </p>
            </div>
        </div>
    );
}
