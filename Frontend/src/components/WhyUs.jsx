import React from 'react';
import './WhyUs.css';

const reasons = [
  {
    icon: '🏆',
    title: 'Techniciens certifiés',
    desc: 'Notre équipe possède des certifications reconnues et une expertise terrain solide.'
  },
  {
    icon: '💰',
    title: 'Devis gratuit',
    desc: 'Obtenez une estimation transparente sans engagement avant toute intervention.'
  },
  {
    icon: '🔩',
    title: 'Pièces d\'origine',
    desc: 'Nous utilisons exclusivement des composants authentiques et certifiés constructeur.'
  },
  {
    icon: '⚡',
    title: 'Intervention rapide',
    desc: 'Délais courts et efficacité maximale pour minimiser votre temps d\'arrêt.'
  },
  {
    icon: '🛡️',
    title: 'Garantie réparation',
    desc: 'Chaque réparation est couverte par une garantie pour votre tranquillité d\'esprit.'
  },
  {
    icon: '🤝',
    title: 'Service personnalisé',
    desc: 'Un accompagnement sur mesure adapté à vos besoins, particuliers ou entreprises.'
  }
];

const WhyUs = () => {
  return (
    <section className="whyus-section">
      <div className="whyus-header">
        <h2 className="whyus-title">Pourquoi nous choisir ?</h2>
        <p className="whyus-subtitle">
          Des professionnels de confiance à votre service depuis des années.
        </p>
      </div>
      <div className="whyus-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="whyus-card glass">
            <div className="whyus-icon">{reason.icon}</div>
            <h3 className="whyus-card-title">{reason.title}</h3>
            <p className="whyus-card-desc">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
