import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGiftById, getSentiment } from '../../lib/api';

function DetailsPage() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [sentiment, setSentiment] = useState('neutral');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadGift() {
      setError('');
      const data = await getGiftById(id);
      setGift(data);

      const sentimentValue = await getSentiment(data.description || '');
      setSentiment(sentimentValue);
    }
    loadGift().catch((loadError) => {
      setGift(null);
      setError(loadError.message || 'Gift not found');
    });
  }, [id]);

  if (error) {
    return <div className="empty-state"><h2>{error}</h2></div>;
  }

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
        <span className="badge">Listed by {gift.owner}</span>
      </div>
      <h1 className="section-title" style={{ fontSize: '2.3rem' }}>{gift.name}</h1>
      <p className="section-copy">{gift.description}</p>
      <p className="section-copy">Contact: {gift.ownerEmail}</p>
    </section>
  );
}

export default DetailsPage;
