import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <Link className="nav-brand" to="/app">
          <span className="brand-mark">✦</span>
          <span>GiftLink Sparkle</span>
        </Link>

        <nav className="nav-links">
          <Link className="nav-link" to="/app">Home</Link>
          <Link className="nav-link" to="/app/search">Search</Link>
          <Link className="nav-link" to="/app/listings">Listings</Link>
          {user ? (
            <>
              <span className="badge" aria-label="logged-in-username">Signed in as {user.username}</span>
              <Link className="nav-link" to="/app/profile">Profile</Link>
              <button className="btn btn-soft" type="button" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/app/login">Login</Link>
              <Link className="btn btn-primary" to="/app/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
