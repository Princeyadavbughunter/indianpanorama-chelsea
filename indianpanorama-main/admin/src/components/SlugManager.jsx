import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, ExternalLink, ChevronDown, ChevronUp, Image as ImageIcon, Upload } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;
const AUTH = { 'Authorization': 'Bearer leela_admin_secret_123' };

const BUTTON_STYLE_OPTIONS = [
    { value: 'gold', label: 'Gold (primary)' },
    { value: 'outline', label: 'Outline (dark)' },
    { value: 'opentable', label: 'OpenTable (red)' },
    { value: 'sevenrooms', label: 'SevenRooms (blue)' },
    { value: 'deliveroo', label: 'Deliveroo (teal)' },
];

const EMPTY_FORM = {
    title: '',
    slug: '',
    heroSubtitle: '',
    description: '',
    status: 'Draft',
    content: '',
    metaTitle: '',
    metaDescription: '',
    image: null,            // New file selected for upload
    existingImage: '',      // URL of image already saved on the slug
    removeImage: false,     // User asked to clear the current image
    bookingButtons: [],
};

export function SlugManager() {
    const [slugs, setSlugs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [seoOpen, setSeoOpen] = useState(false);

    useEffect(() => {
        fetchSlugs();
    }, []);

    const fetchSlugs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/slugs`, { headers: AUTH });
            if (res.ok) setSlugs(await res.json());
        } catch (err) {
            console.error('Failed to fetch slugs', err);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'title' && !currentId) {
            const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title: value, slug: autoSlug, metaTitle: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) setFormData(prev => ({ ...prev, image: file, removeImage: false }));
    };

    const clearNewImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    const removeExistingImage = () => {
        setFormData(prev => ({ ...prev, existingImage: '', removeImage: true, image: null }));
    };

    const addButton = () => {
        setFormData(prev => ({
            ...prev,
            bookingButtons: [...prev.bookingButtons, { label: '', url: '', style: 'gold' }],
        }));
    };

    const updateButton = (i, field, value) => {
        setFormData(prev => ({
            ...prev,
            bookingButtons: prev.bookingButtons.map((b, idx) => idx === i ? { ...b, [field]: value } : b),
        }));
    };

    const removeButton = (i) => {
        setFormData(prev => ({
            ...prev,
            bookingButtons: prev.bookingButtons.filter((_, idx) => idx !== i),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId ? `${API_URL}/api/slugs/${currentId}` : `${API_URL}/api/slugs`;
        const method = currentId ? 'PUT' : 'POST';

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('slug', formData.slug);
        payload.append('heroSubtitle', formData.heroSubtitle);
        payload.append('description', formData.description);
        payload.append('status', formData.status);
        payload.append('content', formData.content);
        payload.append('metaTitle', formData.metaTitle);
        payload.append('metaDescription', formData.metaDescription);
        payload.append('bookingButtons', JSON.stringify(formData.bookingButtons));
        if (formData.image instanceof File) {
            payload.append('image', formData.image);
        } else if (formData.removeImage) {
            // Explicit signal to the backend: clear the stored image path.
            payload.append('image', '');
        }

        try {
            const res = await fetch(url, { method, body: payload, headers: AUTH });
            if (res.ok) {
                fetchSlugs();
                resetForm();
            } else {
                const err = await res.json();
                alert(`Error: ${err.message || 'Failed to save'}`);
            }
        } catch (err) {
            console.error('Failed to save slug', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this landing page?')) return;
        try {
            const res = await fetch(`${API_URL}/api/slugs/${id}`, { method: 'DELETE', headers: AUTH });
            if (res.ok) fetchSlugs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title || '',
            slug: item.slug || '',
            heroSubtitle: item.heroSubtitle || '',
            description: item.description || '',
            status: item.status || 'Draft',
            content: item.content || '',
            metaTitle: item.metaTitle || '',
            metaDescription: item.metaDescription || '',
            image: null,
            existingImage: item.image || '',
            removeImage: false,
            bookingButtons: Array.isArray(item.bookingButtons) ? item.bookingButtons : [],
        });
        setCurrentId(item._id);
        setIsEditing(true);
        setSeoOpen(false);
    };

    const resetForm = () => {
        setFormData(EMPTY_FORM);
        setCurrentId(null);
        setIsEditing(false);
        setSeoOpen(false);
    };

    // ─── Common input style ───
    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
        background: '#ffffff',
        color: 'var(--color-text-primary)',
        fontSize: '0.9rem',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '6px',
        color: 'var(--color-text-secondary)',
        fontSize: '0.82rem',
        fontWeight: 600,
    };

    return (
        <div style={{ color: 'var(--color-text-primary)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', gap: '16px' }}>
                <div>
                    <h2 className="font-serif-display" style={{ margin: 0, fontSize: '1.7rem', color: 'var(--brand-green-deep)' }}>Landing Pages</h2>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.88rem' }}>
                        Create branded landing pages at <code style={{ background: 'var(--brand-cream-2)', padding: '1px 6px', borderRadius: 4, fontSize: '0.8rem' }}>/[slug]</code> that match the Indian Panorama website.
                    </p>
                </div>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                        <Plus size={16} /> New Landing Page
                    </button>
                )}
            </div>

            {/* ─── Form ─── */}
            {isEditing && (
                <div className="card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                        <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.3rem', color: 'var(--brand-green-deep)' }}>
                            {currentId ? 'Edit Landing Page' : 'New Landing Page'}
                        </h3>
                        <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                        {/* Essentials */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Page Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInput} required style={inputStyle} placeholder="Best Indian Restaurant in Chelsea" />
                            </div>
                            <div>
                                <label style={labelStyle}>URL Slug *</label>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '8px', background: '#ffffff', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 12px', background: 'var(--brand-cream-2)', color: 'var(--color-text-muted)', fontSize: '0.85rem', borderRight: '1px solid var(--color-border)' }}>/</span>
                                    <input type="text" name="slug" value={formData.slug} onChange={handleInput} required style={{ ...inputStyle, border: 'none', borderRadius: 0, padding: '10px 12px' }} placeholder="best-indian-chelsea" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Hero Subtitle (optional, shown in italic gold)</label>
                            <input type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInput} style={inputStyle} placeholder="Authentic North Indian fine dining · SW3" />
                        </div>

                        <div>
                            <label style={labelStyle}>Intro Paragraph</label>
                            <textarea name="description" value={formData.description} onChange={handleInput} rows="3" style={{ ...inputStyle, resize: 'vertical' }} placeholder="A short, compelling introduction that appears just below the hero…" />
                        </div>

                        {/* Booking buttons repeater */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <label style={{ ...labelStyle, margin: 0 }}>Booking / CTA Buttons</label>
                                <button type="button" onClick={addButton} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                                    <Plus size={14} /> Add Button
                                </button>
                            </div>
                            {formData.bookingButtons.length === 0 ? (
                                <div style={{ padding: '18px', background: 'var(--brand-cream)', borderRadius: 8, color: 'var(--color-text-muted)', fontSize: '0.85rem', textAlign: 'center', border: '1px dashed var(--color-border)' }}>
                                    No buttons yet. Add SevenRooms / OpenTable / Deliveroo / custom links.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {formData.bookingButtons.map((btn, i) => (
                                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 170px 36px', gap: '8px', alignItems: 'center' }}>
                                            <input type="text" value={btn.label} onChange={(e) => updateButton(i, 'label', e.target.value)} placeholder="Book on SevenRooms" style={inputStyle} />
                                            <input type="text" value={btn.url} onChange={(e) => updateButton(i, 'url', e.target.value)} placeholder="https://…" style={inputStyle} />
                                            <select value={btn.style} onChange={(e) => updateButton(i, 'style', e.target.value)} style={inputStyle}>
                                                {BUTTON_STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                            </select>
                                            <button type="button" onClick={() => removeButton(i)} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 8, width: 36, height: 38, cursor: 'pointer', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Main content */}
                        <div>
                            <label style={labelStyle}>Main Content (HTML supported)</label>
                            <textarea name="content" value={formData.content} onChange={handleInput} rows="8" style={{ ...inputStyle, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.82rem' }} placeholder={`<h2>Exquisite Dining on Draycott Avenue</h2>\n<p>Welcome to the top-rated destination for <strong>Indian fine dining in SW3</strong>.</p>`} />
                            <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                Use <code>&lt;h2&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;blockquote&gt;</code>. Styling is applied automatically to match the site.
                            </p>
                        </div>

                        {/* Status */}
                        <div>
                            <label style={labelStyle}>Status</label>
                            <select name="status" value={formData.status} onChange={handleInput} style={inputStyle}>
                                <option value="Draft">Draft (hidden)</option>
                                <option value="Published">Published (live)</option>
                            </select>
                        </div>

                        {/* Hero background image */}
                        <div>
                            <label style={labelStyle}>Hero Background Image (optional)</label>
                            {(() => {
                                const newImageUrl = formData.image instanceof File
                                    ? URL.createObjectURL(formData.image)
                                    : null;
                                const currentUrl = formData.existingImage
                                    ? `${API_URL}${formData.existingImage}`
                                    : null;
                                const previewUrl = newImageUrl || currentUrl;
                                const showing = formData.image instanceof File
                                    ? 'new'
                                    : (formData.existingImage ? 'current' : 'none');

                                return (
                                    <div style={{
                                        border: '1px dashed var(--color-border)',
                                        borderRadius: 10,
                                        background: 'var(--brand-cream)',
                                        padding: 14,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                    }}>
                                        {previewUrl ? (
                                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                                <div style={{
                                                    width: 160,
                                                    height: 100,
                                                    borderRadius: 8,
                                                    overflow: 'hidden',
                                                    background: '#000',
                                                    flexShrink: 0,
                                                    boxShadow: 'var(--shadow-sm)',
                                                }}>
                                                    <img src={previewUrl} alt="Hero preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-green-deep)', marginBottom: 4 }}>
                                                        {showing === 'new' ? 'New image selected' : 'Currently attached'}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', wordBreak: 'break-all', marginBottom: 10 }}>
                                                        {showing === 'new'
                                                            ? `${formData.image.name} · ${(formData.image.size / 1024).toFixed(0)} KB`
                                                            : formData.existingImage}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        <label className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer', margin: 0 }}>
                                                            <Upload size={14} /> {showing === 'new' ? 'Choose different file' : 'Replace image'}
                                                            <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                                                        </label>
                                                        {showing === 'new' ? (
                                                            <button type="button" onClick={clearNewImage} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                                                                Cancel upload
                                                            </button>
                                                        ) : (
                                                            <button type="button" onClick={removeExistingImage} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', color: 'var(--color-danger)', borderColor: 'rgba(192,68,58,0.25)' }}>
                                                                <Trash2 size={14} /> Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 14px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8, cursor: 'pointer' }}>
                                                <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--brand-gold-soft)', color: 'var(--brand-gold-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <ImageIcon size={18} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--brand-green-deep)' }}>Click to upload a hero image</div>
                                                    <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>JPEG, PNG or WebP · appears behind the page title</div>
                                                </div>
                                                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                                            </label>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* SEO (collapsible) */}
                        <div style={{ border: '1px solid var(--color-border)', borderRadius: 8, background: 'var(--brand-cream)' }}>
                            <button type="button" onClick={() => setSeoOpen(!seoOpen)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
                                <span>Advanced · SEO Meta Tags</span>
                                {seoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {seoOpen && (
                                <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                    <div>
                                        <label style={labelStyle}>Meta Title (for search engines)</label>
                                        <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInput} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Meta Description</label>
                                        <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInput} rows="2" style={{ ...inputStyle, resize: 'vertical' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                            <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">{currentId ? 'Save Changes' : 'Create Landing Page'}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ─── List of landing pages ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {slugs.map(item => (
                    <div key={item._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
                        <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.1rem', color: 'var(--brand-green-deep)', lineHeight: 1.35 }}>{item.title}</h3>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description || item.heroSubtitle || 'No description yet.'}
                        </p>

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <span className={`badge ${item.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>{item.status}</span>
                            {item.bookingButtons?.length > 0 && (
                                <span className="badge" style={{ background: 'var(--brand-gold-soft)', color: 'var(--brand-gold-deep)', border: '1px solid var(--brand-gold-soft)' }}>
                                    {item.bookingButtons.length} button{item.bookingButtons.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>

                        <div style={{ background: 'var(--brand-cream)', padding: '8px 10px', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-text-muted)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', wordBreak: 'break-all', marginTop: 'auto' }}>
                            /{item.slug}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 4 }} title="Edit"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: 4 }} title="Delete"><Trash2 size={16} /></button>
                                {item.status === 'Published' && (
                                    <a href={`http://localhost:3000/${item.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gold-deep)', padding: 4, display: 'flex', alignItems: 'center' }} title="Open live page">
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}

                {slugs.length === 0 && !isEditing && (
                    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>No landing pages yet.</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ marginTop: 14 }}>
                            <Plus size={14} /> Create your first
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
