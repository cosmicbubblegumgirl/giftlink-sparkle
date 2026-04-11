import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { getGifts } from '../../lib/api';

function MainPage() {
  const [gifts, setGifts] = useState([]);

  const featuredGifts = gifts.slice(0, 12);
  const locations = new Set(gifts.map((gift) => gift.location).filter(Boolean)).size;
  const categories = new Set(gifts.map((gift) => gift.category).filter(Boolean)).size;

  useEffect(() => {
    getGifts()
      .then((data) => setGifts(data))
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
          <p className="section-copy deployment-copy">
            Deployment URL:{' '}
            <a href={config.deploymentUrl} target="_blank" rel="noreferrer">{config.deploymentUrl}</a>
          </p>
        </div>
        <div className="hero-illustration" aria-hidden="true">🪄📦</div>
      </article>

      <section className="grid grid-3">
        <article className="small-stat glass-card stat-card">
          <span className="badge">Catalog sparkle</span>
          <h3>{gifts.length} neighbor-ready listings</h3>
          <p className="section-copy">A generous mix of practical home finds ready to browse in full search.</p>
        </article>
        <article className="small-stat glass-card stat-card">
          <span className="badge">Whimsical map</span>
          <h3>{locations} pickup spots</h3>
          <p className="section-copy">From Maple Grove to Stonebridge, the demo catalog feels spread across real neighborhoods.</p>
        </article>
        <article className="small-stat glass-card stat-card">
          <span className="badge">Useful variety</span>
          <h3>{categories} cozy categories</h3>
          <p className="section-copy">Lighting, kitchen, storage, office, decor, and more without crowding the landing page.</p>
        </article>
      </section>

      <section className="glass-card featured-shell">
        <div className="featured-header">
          <div>
            <span className="badge">🌼 Featured finds</span>
            <h2 className="section-title featured-title">A small front porch of standout listings</h2>
            <p className="section-copy">
              The homepage keeps things light and friendly with a curated dozen. The full catalog of {gifts.length} demo listings is still waiting in search.
            </p>
          </div>
          <Link className="btn btn-soft" to="/app/search">See all listings</Link>
        </div>

        <div className="featured-marquee" aria-hidden="true">
          <span>lamp glow</span>
          <span>tea-time treasures</span>
          <span>soft bedroom finds</span>
          <span>clever storage picks</span>
          <span>garden-friendly extras</span>
        </div>

        <section className="list-grid">
        {featuredGifts.map((gift) => (
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
    </section>
  );
}

export default MainPage;
