import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <section className="glass-card profile-card">
      <span className="badge">🪴 Profile</span>
      <h1 className="section-title" style={{ fontSize: '2.2rem' }}>
        {user ? `Hello, ${user.username}` : 'Hello, guest'}
      </h1>
      <p className="section-copy">Use this page to manage your profile information.</p>
      {user && (
        <div className="grid grid-2">
          <div className="small-stat glass-card stat-card">
            <span className="badge">Username</span>
            <h3>{user.username}</h3>
          </div>
          <div className="small-stat glass-card stat-card">
            <span className="badge">Email</span>
            <h3>{user.email}</h3>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
