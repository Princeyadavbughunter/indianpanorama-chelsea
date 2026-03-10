import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';

export function SlugManager() {
    const [slugs, setSlugs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: 'Promotion',
        status: 'Draft',
        image: null,
        backgroundColor: '#f8fafc',
        textColor: '#0f172a',
        ctaText: '',
        ctaLink: '',
        content: '',
        metaTitle: '',
        metaDescription: ''
    });

    useEffect(() => {
        fetchSlugs();
    }, []);

    const fetchSlugs = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/slugs`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                const data = await res.json();
                setSlugs(data);
            }
        } catch (err) {
            console.error('Failed to fetch slugs', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Auto-generate slug from title
        if (name === 'title' && !currentId) {
            const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title: value, slug: autoSlug, metaTitle: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId
            ? `${import.meta.env.VITE_API_URL}/api/slugs/${currentId}`
            : `${import.meta.env.VITE_API_URL}/api/slugs`;
        const method = currentId ? 'PUT' : 'POST';

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') {
                if (formData.image instanceof File) {
                    submitData.append('image', formData.image);
                }
            } else {
                submitData.append(key, formData[key] || '');
            }
        });

        try {
            const res = await fetch(url, { method, body: submitData });
            if (res.ok) {
                fetchSlugs();
                resetForm();
            } else {
                const err = await res.json();
                alert(`Error: ${err.message}`);
            }
        } catch (err) {
            console.error('Failed to save slug', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Landing Page?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/slugs/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) fetchSlugs();
        } catch (err) {
            console.error('Failed to delete slug', err);
        }
    };

    const handleEdit = (slugData) => {
        setFormData({
            title: slugData.title || '',
            slug: slugData.slug || '',
            description: slugData.description || '',
            category: slugData.category || 'Promotion',
            status: slugData.status || 'Draft',
            image: null, // Don't prefill file input
            backgroundColor: slugData.backgroundColor || '#f8fafc',
            textColor: slugData.textColor || '#0f172a',
            ctaText: slugData.ctaText || '',
            ctaLink: slugData.ctaLink || '',
            content: slugData.content || '',
            metaTitle: slugData.metaTitle || '',
            metaDescription: slugData.metaDescription || '',
        });
        setCurrentId(slugData._id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({
            title: '', slug: '', description: '', category: 'Promotion', status: 'Draft',
            image: null, backgroundColor: '#f8fafc', textColor: '#0f172a', ctaText: '', ctaLink: '',
            content: '', metaTitle: '', metaDescription: ''
        });
        setCurrentId(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: '24px', color: 'var(--color-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-accent)' }}>Landing Page Slugs</h2>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Manage custom landing pages for festivals, offers, and special events</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 16px', backgroundColor: 'var(--color-primary-accent)',
                            color: 'var(--color-bg-card)', border: 'none', borderRadius: 'var(--radius-md)',
                            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        <Plus size={18} /> Create New Slug
                    </button>
                )}
            </div>

            {isEditing && (
                <div style={{
                    background: 'var(--color-bg-card)', padding: '24px',
                    borderRadius: 'var(--radius-lg)', marginBottom: '24px',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                        <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{currentId ? 'Edit Landing Page' : 'Create New Slug'}</h3>
                        <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                        {/* Left Column: Basic Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ margin: 0, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Basic Information</h4>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Slug *</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }}>
                                        <option value="Promotion">Promotion</option>
                                        <option value="Festival Special">Festival Special</option>
                                        <option value="Event">Event</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }}>
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Design & Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ margin: 0, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Content & Design</h4>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Featured Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-secondary)' }} />
                                {formData.image && formData.image instanceof File && (
                                    <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Selected: {formData.image.name}</div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Background Color</label>
                                    <input type="color" name="backgroundColor" value={formData.backgroundColor} onChange={handleInputChange} style={{ width: '100%', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Text Color</label>
                                    <input type="color" name="textColor" value={formData.textColor} onChange={handleInputChange} style={{ width: '100%', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>CTA Button Text</label>
                                    <input type="text" name="ctaText" value={formData.ctaText} onChange={handleInputChange} placeholder="e.g. Order Now" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>CTA Link</label>
                                    <input type="text" name="ctaLink" value={formData.ctaLink} onChange={handleInputChange} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                                </div>
                            </div>
                        </div>

                        {/* Full Width: Content & SEO */}
                        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                            <div>
                                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                    <span>Main Content (HTML Supported)</span>
                                </label>
                                <textarea name="content" value={formData.content} onChange={handleInputChange} rows="6" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)', fontFamily: 'monospace' }} placeholder="<h1>Welcome</h1><p>Enjoy our special offer...</p>" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--color-bg-body)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>SEO Meta Title</label>
                                    <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="Title for search engines" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', color: 'var(--color-text-primary)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>SEO Meta Description</label>
                                    <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows="2" placeholder="Description for search engines" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', color: 'var(--color-text-primary)' }} />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '10px 24px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                            <button type="submit" style={{ padding: '10px 32px', background: 'var(--color-primary-accent)', border: 'none', color: 'var(--color-bg-card)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 12px var(--color-primary-glow)' }}>{currentId ? 'Save Changes' : 'Create Slug'}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Grid display of existing Slugs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {slugs.map(slugItem => (
                    <div key={slugItem._id} style={{
                        background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border)', padding: '20px',
                        display: 'flex', flexDirection: 'column', gap: '12px',
                        boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s',
                    }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{slugItem.title}</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {slugItem.description || 'No description provided.'}
                        </p>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, background: slugItem.status === 'Published' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(241, 196, 15, 0.15)', color: slugItem.status === 'Published' ? '#2ecc71' : '#f1c40f' }}>{slugItem.status}</span>
                            <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-secondary-accent)' }}>{slugItem.category}</span>
                        </div>

                        <div style={{ background: 'var(--color-bg-body)', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', wordBreak: 'break-all', marginTop: 'auto' }}>
                            /{slugItem.slug}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => handleEdit(slugItem)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(slugItem._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete"><Trash2 size={18} /></button>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(slugItem.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}

                {slugs.length === 0 && !isEditing && (
                    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: `1px dashed var(--color-border)` }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>No landing page slugs generated yet.</p>
                        <button onClick={() => setIsEditing(true)} style={{ marginTop: '12px', padding: '8px 16px', background: 'transparent', border: '1px solid var(--color-primary-accent)', color: 'var(--color-primary-accent)', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Create First Slug</button>
                    </div>
                )}
            </div>
        </div>
    );
}

