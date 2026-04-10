import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Opening the sparkle gate...');

    try {
      const response = await fetch(`${config.apiBaseUrl}/api/auths/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer login-request'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || 'Login failed.');
        return;
      }

      login({
        username: data.username,
        email: data.email,
        authtoken: data.authtoken
      });

      navigate('/app/profile');
    } catch (error) {
      setStatus('Login service is unavailable.');
    }
  }

  return (
    <section className="form-card glass-card" style={{ maxWidth: 560, margin: '0 auto' }}>
      <span className="badge">🔐 Welcome back</span>
      <h1 className="section-title" style={{ fontSize: '2.2rem' }}>Log in</h1>
      <form className="grid" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="login-email">Email</label>
          <input id="login-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="login-password">Password</label>
          <input id="login-password" className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button className="btn btn-primary" type="submit">Log in</button>
        {status && <p className="notice">{status}</p>}
      </form>
    </section>
  );
}

export default LoginPage;
