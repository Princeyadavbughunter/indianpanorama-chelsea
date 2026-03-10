import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        isPublished: true,
        image: null
    });
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (err) {
            console.error('Failed to fetch blogs', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Auto-generate slug from title if slug isn't being manually edited
        if (name === 'title' && !currentId) {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Store the raw file object instead of base64
            setFormData(prev => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentId
            ? `${import.meta.env.VITE_API_URL}/api/blogs/${currentId}`
            : `${import.meta.env.VITE_API_URL}/api/blogs`;
        const method = currentId ? 'PUT' : 'POST';

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') {
                if (formData.image instanceof File) {
                    submitData.append('image', formData.image);
                }
            } else {
                submitData.append(key, formData[key]);
            }
        });

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': 'Bearer ' + 'leela_admin_secret_123'
                },
                // Do not set Content-Type header manually when using FormData
                body: submitData
            });

            if (res.ok) {
                fetchBlogs();
                resetForm();
            }
        } catch (err) {
            console.error('Failed to save blog post', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } });
            if (res.ok) fetchBlogs();
        } catch (err) {
            console.error('Failed to delete blog post', err);
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt || '',
            content: blog.content,
            author: blog.author,
            isPublished: blog.isPublished,
            image: null // We don't populate the file input on edit for security
        });
        setCurrentId(blog._id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ title: '', slug: '', excerpt: '', content: '', author: 'Admin', isPublished: true, image: null });
        setCurrentId(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: '24px', color: 'var(--color-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-accent)' }}>Blog Management</h2>
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
                        <Plus size={18} /> New Blog Post
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
                        <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{currentId ? 'Edit Post' : 'Create New Post'}</h3>
                        <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Post Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>URL Slug</label>
                            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Excerpt (Short Summary)</label>
                            <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Feature Image (Upload)</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-secondary)' }} />
                            {formData.image && formData.image instanceof File && (
                                <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                    Selected file: {formData.image.name}
                                </div>
                            )}
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Main Content</label>
                            <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="8" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-body)', color: 'var(--color-text-primary)', fontFamily: 'monospace' }} placeholder="Write your blog post content here... HTML is supported." />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2', marginTop: '10px', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} />
                                Publish Immediately
                            </label>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            <button type="submit" style={{ padding: '10px 20px', background: 'var(--color-primary-accent)', border: 'none', color: 'var(--color-bg-card)', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>Save Post</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Blogs List */}
            <div style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-body)' }}>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Title</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Author</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Date</th>
                            <th style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Status</th>
                            <th style={{ padding: '16px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontWeight: 500 }}>{blog.title}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>/{blog.slug}</div>
                                </td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{blog.author}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '16px', textAlign: 'center' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', background: blog.isPublished ? 'rgba(46, 204, 113, 0.1)' : 'rgba(241, 196, 15, 0.1)', color: blog.isPublished ? '#2ecc71' : '#f1c40f' }}>
                                        {blog.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(blog)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', marginRight: '16px' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(blog._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No blogs have been published yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
