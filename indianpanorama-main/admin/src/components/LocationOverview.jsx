import React from 'react';
import { MapPin } from 'lucide-react';

export function LocationOverview({ locations }) {
    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-header">
                <h3 className="card-title">Location Overview</h3>
                <MapPin size={20} color="var(--color-text-muted)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {locations.map((location, index) => (
                    <div key={index} style={{
                        padding: '16px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {location.name}
                            </h4>
                            <span className={`badge ${location.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                {location.status}
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                            {location.city}, {location.country}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Menu Items:</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{location.menuItems}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
