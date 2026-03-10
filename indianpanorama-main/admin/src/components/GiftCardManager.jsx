import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export function GiftCardManager() {
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ code: '', purchaserName: '', recipientName: '', amount: '', balance: '', status: 'Active' });
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/giftcards`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) setItems(await res.json());
        } catch (err) { console.error('Failed to fetch', err); }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId ? `${import.meta.env.VITE_API_URL}/api/giftcards/${currentId}` : `${import.meta.env.VITE_API_URL}/api/giftcards`;
        const method = currentId ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, amount: parseFloat(formData.amount), balance: parseFloat(formData.balance) })
            });
            if (res.ok) { fetchItems(); resetForm(); }
        } catch (err) { console.error('Failed to save', err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this gift card?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/giftcards/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) fetchItems();
        } catch (err) { console.error('Failed to delete', err); }
    };

    const handleEdit = (item) => {
        setFormData({
            code: item.code, purchaserName: item.purchaserName, recipientName: item.recipientName || '',
            amount: item.amount, balance: item.balance, status: item.status
        });
        setCurrentId(item._id);
        setIsEditing(true);
    };

    const handleAdd = () => {
        // Generate a professional random gift card code (e.g., GC-4A2B-1234)
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const randomCode = `GC-${randomStr}-${randomNum}`;

        setFormData({ code: randomCode, purchaserName: '', recipientName: '', amount: '', balance: '', status: 'Active' });
        setCurrentId(null);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ code: '', purchaserName: '', recipientName: '', amount: '', balance: '', status: 'Active' });
        setCurrentId(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: '24px', color: 'var(--color-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-accent)' }}>Gift Card Management</h2>
                {!isEditing && (
                    <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-primary-accent)', color: 'var(--color-bg-card)', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: '600', cursor: 'pointer' }}>
                        <Plus size={18} /> Issue Gift Card
                    </button>
                )}
            </div>

            {isEditing && (
                <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input type="text" name="code" value={formData.code} onChange={handleInputChange} placeholder="Card Code (e.g. GC1234)" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="text" name="purchaserName" value={formData.purchaserName} onChange={handleInputChange} placeholder="Purchaser Name" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Initial Amount" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <input type="number" name="balance" value={formData.balance} onChange={handleInputChange} placeholder="Current Balance" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        <select name="status" value={formData.status} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }}>
                            <option value="Active">Active</option>
                            <option value="Used">Used</option>
                            <option value="Expired">Expired</option>
                        </select>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: '8px' }}>Cancel</button>
                            <button type="submit" style={{ padding: '10px 20px', background: 'var(--color-primary-accent)', border: 'none', color: 'var(--color-bg-card)', fontWeight: '600', borderRadius: '8px' }}>Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-body)' }}>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Code</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Purchaser</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Balance</th>
                            <th style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Status</th>
                            <th style={{ padding: '16px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '16px', fontWeight: 500 }}>{item.code}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{item.purchaserName}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>${item.balance}</td>
                                <td style={{ padding: '16px', textAlign: 'center' }}>{item.status}</td>
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
