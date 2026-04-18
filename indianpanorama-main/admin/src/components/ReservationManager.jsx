import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const UK_TZ = 'Europe/London';
const formatUKDate = (value) => value ? new Date(value).toLocaleDateString('en-GB', { timeZone: UK_TZ, day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
const toUKDateInput = (value) => value ? new Date(value).toLocaleDateString('en-CA', { timeZone: UK_TZ }) : '';

export function ReservationManager() {
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', date: '', time: '', guests: 2, specialRequests: '', status: 'Pending'
    });
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) setItems(await res.json());
        } catch (err) { console.error('Failed to fetch', err); }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId ? `${import.meta.env.VITE_API_URL}/api/reservations/${currentId}` : `${import.meta.env.VITE_API_URL}/api/reservations`;
        const method = currentId ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + 'leela_admin_secret_123'
                },
                body: JSON.stringify({ ...formData, guests: parseInt(formData.guests) })
            });
            if (res.ok) { fetchItems(); resetForm(); }
        } catch (err) { console.error('Failed to save', err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) fetchItems();
        } catch (err) { console.error('Failed to delete', err); }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name, email: item.email, phone: item.phone,
            date: toUKDateInput(item.date),
            time: item.time, guests: item.guests, specialRequests: item.specialRequests || '', status: item.status
        });
        setCurrentId(item._id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2, specialRequests: '', status: 'Pending' });
        setCurrentId(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: '24px', color: 'var(--color-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-accent)' }}>Reservation Management</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-primary-accent)', color: 'var(--color-bg-card)', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: '600', cursor: 'pointer' }}>
                        <Plus size={18} /> New Reservation
                    </button>
                )}
            </div>

            {isEditing && (
                <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{currentId ? 'Edit Reservation' : 'Create New Reservation'}</h3>
                        <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="time" name="time" value={formData.time} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} placeholder="Guests" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <select name="status" value={formData.status} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }}>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                            <button type="submit" style={{ padding: '10px 20px', background: 'var(--color-primary-accent)', border: 'none', color: 'var(--color-bg-card)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-body)' }}>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Name</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Date & Time</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Guests</th>
                            <th style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Status</th>
                            <th style={{ padding: '16px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '16px', fontWeight: 500 }}>{item.name}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{formatUKDate(item.date)} at {item.time}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{item.guests}</td>
                                <td style={{ padding: '16px', textAlign: 'center' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', background: item.status === 'Confirmed' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(241, 196, 15, 0.1)', color: item.status === 'Confirmed' ? '#2ecc71' : '#f1c40f' }}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', marginRight: '16px' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
