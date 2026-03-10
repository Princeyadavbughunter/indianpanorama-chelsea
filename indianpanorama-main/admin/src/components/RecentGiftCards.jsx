import React from 'react';
import { Gift } from 'lucide-react';

export function RecentGiftCards({ giftCards }) {
    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-header">
                <h3 className="card-title">Recent Gift Cards</h3>
                <Gift size={20} color="var(--color-text-muted)" />
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Customer details</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {giftCards.map((card, index) => (
                            <tr key={index}>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
                                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{card.customer}</span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Code: {card.code}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{card.date}</span>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--color-success)' }}>
                                    {card.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
