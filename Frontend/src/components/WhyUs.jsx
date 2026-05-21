import React from 'react';
import './WhyUs.css';

const reasons = [
  'Techniciens certifiés',
  'Devis gratuit',
  'Pièces d\'origine',
  'Intervention rapide',
  'Garantie sur réparation'
];

const WhyUs = () => {
  return (
    <section className="whyus-section">
      <h2 className="whyus-title">Pourquoi nous choisir ?</h2>
      <div className="whyus-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="whyus-badge glass">
            <span className="whyus-check">✅</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
