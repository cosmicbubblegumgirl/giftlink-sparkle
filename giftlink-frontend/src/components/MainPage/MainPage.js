import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

function MainPage() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api/gifts`)
      .then((response) => response.json())
      .then((data) => setGifts(Array.isArray(data) ? data : []))
      .catch(() => setGifts([]));
  }, []);

  return (
    <section className="grid" style={{ gap: 18 }}>
      <article className="hero-card glass-card">
        <div>
          <span className="badge">✨ A bright second life for useful things</span>
          <h1 className="section-title">Gift useful household treasures with a little sparkle.</h1>
          <p className="section-copy">
            GiftLink Sparkle helps neighbors pass along free items they no longer need and helps others
            find practical things with warmth, trust, and a clean whimsical experience.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/app/search">Browse gifts</Link>
            <Link className="btn btn-soft" to="/app/register">Create account</Link>
          </div>
        </div>
        <div className="hero-illustration" aria-hidden="true">🪄📦</div>
      </article>

      <section className="list-grid">
        {gifts.map((gift) => (
          <article key={gift.id || gift._id} className="listing-card glass-card">
            <img className="listing-thumb" src={gift.image} alt={gift.name} />
            <div className="meta-row">
              <span className="badge">{gift.category}</span>
              <span className="badge">{gift.location}</span>
            </div>
            <h3>{gift.name}</h3>
            <p>{gift.description}</p>
            <Link className="btn btn-primary" to={`/app/product/${gift.id || gift._id}`}>View details</Link>
          </article>
        ))}
      </section>
    </section>
  );
}

export default MainPage;
