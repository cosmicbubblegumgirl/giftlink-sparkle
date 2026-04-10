import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

function SearchPage() {
  const [filters, setFilters] = useState({ q: '', category: '', location: '' });
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);

    fetch(`${config.apiBaseUrl}/api/gifts/search?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setGifts(Array.isArray(data) ? data : []))
      .catch(() => setGifts([]));
  }, [filters]);

  return (
    <section className="grid" style={{ gap: 18 }}>
      <div className="glass-card form-card">
        <span className="badge">🔎 Search gifts</span>
        <h1 className="section-title" style={{ fontSize: '2.4rem' }}>Search for second-hand treasures</h1>
        <div className="grid grid-3">
          <div>
            <label className="label" htmlFor="search-query">Keywords</label>
            <input id="search-query" className="input" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="search-category">Category</label>
            <input id="search-category" className="input" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="search-location">Location</label>
            <input id="search-location" className="input" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="list-grid">
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
      </div>
    </section>
  );
}

export default SearchPage;
