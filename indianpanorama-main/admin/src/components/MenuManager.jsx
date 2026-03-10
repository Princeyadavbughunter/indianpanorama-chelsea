import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export function MenuManager() {
    const [menuItems, setMenuItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        isPopular: false,
        isAvailable: true
    });
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                const data = await res.json();
                setMenuItems(data);
            }
        } catch (err) {
            console.error('Failed to fetch menu items', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId
            ? `${import.meta.env.VITE_API_URL}/api/menu/${currentId}`
            : `${import.meta.env.VITE_API_URL}/api/menu`;
        const method = currentId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + 'leela_admin_secret_123'
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price)
                })
            });

            if (res.ok) {
                fetchMenuItems();
                resetForm();
            }
        } catch (err) {
            console.error('Failed to save menu item', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this menu item?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) fetchMenuItems();
        } catch (err) {
            console.error('Failed to delete menu item', err);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            isPopular: item.isPopular,
            isAvailable: item.isAvailable
        });
        setCurrentId(item._id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: '', isPopular: false, isAvailable: true });
        setCurrentId(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: '24px', color: 'var(--color-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-accent)' }}>Menu Management</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 16px', backgroundColor: 'var(--color-primary-accent)',
                            color: 'var(--color-bg-card)', border: 'none', borderRadius: 'var(--radius-md)',
                            fontWeight: '600', cursor: 'pointer'
                        }}
                    >
                        <Plus size={18} /> Add New Item
                    </button>
                )}
            </div>

            {isEditing && (
                <div style={{
                    background: 'var(--color-bg-card)', padding: '24px',
                    borderRadius: 'var(--radius-lg)', marginBottom: '24px',
                    border: '1px solid var(--color-border)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{currentId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                        <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Item Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Price ($)</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Category</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }}>
                                <option value="">Select a category</option>
                                <option value="Starters">Starters</option>
                                <option value="Mains">Mains</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2', marginTop: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                                <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleInputChange} />
                                Mark as Popular
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleInputChange} />
                                Currently Available
                            </label>
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            <button type="submit" style={{ padding: '10px 20px', background: 'var(--color-primary-accent)', border: 'none', color: 'var(--color-bg-card)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>Save Item</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Menu List */}
            <div style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-body)' }}>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Name</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Category</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Price</th>
                            <th style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Status</th>
                            <th style={{ padding: '16px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.description.substring(0, 40)}...</div>
                                </td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{item.category}</td>
                                <td style={{ padding: '16px', fontWeight: 500 }}>${item.price.toFixed(2)}</td>
                                <td style={{ padding: '16px', textAlign: 'center' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', background: item.isAvailable ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)', color: item.isAvailable ? '#2ecc71' : '#e74c3c' }}>
                                        {item.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', marginRight: '16px' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {menuItems.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No menu items found. Add your first dish!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
