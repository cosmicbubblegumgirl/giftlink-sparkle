import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Creating your account...');

    try {
      const response = await fetch(`${config.apiBaseUrl}/api/auths/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || 'Registration failed.');
        return;
      }

      login({
        username: data.username,
        email: data.email,
        authtoken: data.authtoken
      });

      navigate('/app/profile');
    } catch (error) {
      setStatus('Registration service is unavailable.');
    }
  }

  return (
    <section className="form-card glass-card" style={{ maxWidth: 640, margin: '0 auto' }}>
      <span className="badge">✨ Join GiftLink Sparkle</span>
      <h1 className="section-title" style={{ fontSize: '2.2rem' }}>Create an account</h1>
      <form className="grid" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="register-username">Username</label>
          <input id="register-username" className="input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="register-email">Email</label>
          <input id="register-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="register-password">Password</label>
          <input id="register-password" className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
        {status && <p className="notice">{status}</p>}
      </form>
    </section>
  );
}

export default RegisterPage;
