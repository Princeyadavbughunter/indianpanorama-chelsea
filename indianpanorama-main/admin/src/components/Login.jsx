import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-body)',
            fontFamily: 'var(--font-primary)'
        }}>
            <div style={{
                background: 'var(--color-bg-card)',
                padding: '40px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ color: 'var(--color-primary-accent)', margin: '0 0 8px 0', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>Admin Portal</h2>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.95rem' }}>Secure Dashboard Access</p>
                </div>

                {error && <div style={{ color: 'var(--color-danger)', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-body)',
                                color: 'var(--color-text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-body)',
                                color: 'var(--color-text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            backgroundColor: 'var(--color-primary-accent)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-inverse)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '8px',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px var(--color-primary-glow)'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.9'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
