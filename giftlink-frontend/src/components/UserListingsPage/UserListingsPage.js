import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

function UserListingsPage() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api/gifts`)
      .then((response) => response.json())
      .then((data) => setGifts(Array.isArray(data) ? data.slice(0, 2) : []))
      .catch(() => setGifts([]));
  }, []);

  return (
    <section className="grid" style={{ gap: 18 }}>
      <div className="glass-card form-card">
        <span className="badge">📦 Your listings</span>
        <h1 className="section-title" style={{ fontSize: '2.2rem' }}>Items connected to this profile</h1>
      </div>

      <div className="list-grid">
        {gifts.map((gift) => (
          <article key={gift.id || gift._id} className="listing-card glass-card">
            <img className="listing-thumb" src={gift.image} alt={gift.name} />
            <h3>{gift.name}</h3>
            <p>{gift.description}</p>
            <Link className="btn btn-primary" to={`/app/product/${gift.id || gift._id}`}>View details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserListingsPage;
