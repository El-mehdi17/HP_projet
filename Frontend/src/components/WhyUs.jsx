import React from 'react';
import './WhyUs.css';
import { FaTrophy, FaFileInvoiceDollar, FaTools, FaBolt, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaTrophy />,
    title: 'Techniciens certifiés',
    desc: 'Notre équipe possède des certifications reconnues et une expertise terrain solide.'
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: 'Devis gratuit',
    desc: 'Obtenez une estimation transparente sans engagement avant toute intervention.'
  },
  {
    icon: <FaTools />,
    title: 'Pièces d\'origine',
    desc: 'Nous utilisons exclusivement des composants authentiques et certifiés constructeur.'
  },
  {
    icon: <FaBolt />,
    title: 'Intervention rapide',
    desc: 'Délais courts et efficacité maximale pour minimiser votre temps d\'arrêt.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Garantie réparation',
    desc: 'Chaque réparation est couverte par une garantie pour votre tranquillité d\'esprit.'
  },
  {
    icon: <FaHandshake />,
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
