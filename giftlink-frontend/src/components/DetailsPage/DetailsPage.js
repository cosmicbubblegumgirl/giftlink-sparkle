import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';

function DetailsPage() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [sentiment, setSentiment] = useState('neutral');

  useEffect(() => {
    async function loadGift() {
      const response = await fetch(`${config.apiBaseUrl}/api/gifts/${id}`);
      const data = await response.json();
      setGift(data);

      const sentimentResponse = await fetch(`${config.apiBaseUrl}/sentiment?text=${encodeURIComponent(data.description || '')}`);
      const sentimentData = await sentimentResponse.json();
      setSentiment(sentimentData.sentiment || 'neutral');
    }
    loadGift().catch(() => setGift(null));
  }, [id]);

  if (!gift) {
    return <div className="empty-state"><h2>Loading...</h2></div>;
  }

  return (
    <section className="detail-card glass-card grid" style={{ gap: 20 }}>
      <img className="listing-thumb" src={gift.image} alt={gift.name} style={{ height: 320 }} />
      <div className="meta-row">
        <span className="badge">{gift.category}</span>
        <span className="badge">{gift.location}</span>
        <span className="badge">Sentiment: {sentiment}</span>
      </div>
      <h1 className="section-title" style={{ fontSize: '2.3rem' }}>{gift.name}</h1>
      <p className="section-copy">{gift.description}</p>
    </section>
  );
}

export default DetailsPage;
