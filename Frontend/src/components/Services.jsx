import React from 'react';
import './Services.css';

const servicesData = [
  {
    icon: '🛒',
    title: 'Vente de Produits',
    description: 'Nous proposons une large gamme de composants informatiques neufs : cartes mères, processeurs, RAM, SSD, claviers, souris et bien plus. Des produits certifiés, garantis et disponibles immédiatement.'
  },
  {
    icon: '💰',
    title: 'Achat & Reprise',
    description: 'Vous souhaitez vendre vos anciens composants ? Nous rachetons vos pièces PC d\'occasion après évaluation. Estimation rapide, paiement immédiat et processus transparent.'
  },
  {
    icon: '🔧',
    title: 'Réparation',
    description: 'Notre équipe de techniciens qualifiés diagnostique et répare tous types de pannes : carte mère, alimentation, écran, clavier, et autres composants. Devis gratuit avant toute intervention.'
  },
  {
    icon: '🔄',
    title: 'Service Après-Vente (SAV)',
    description: 'Après votre achat, nous restons à votre disposition. Remplacement sous garantie, assistance technique, suivi de votre dossier — votre satisfaction est notre priorité.'
  },
  {
    icon: '📦',
    title: 'Livraison & Retour',
    description: 'Livraison rapide à domicile ou en point relais. Retour facile sous 14 jours si le produit ne vous convient pas, sans frais cachés.'
  },
  {
    icon: '🛡️',
    title: 'Garantie & Fiabilité',
    description: 'Tous nos produits sont couverts par une garantie constructeur. Nous travaillons uniquement avec des marques reconnues pour vous assurer qualité et durabilité.'
  }
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-banner glass">
        <h2 className="services-title">Nos Services</h2>
        <p className="services-subtitle">
          Spécialistes en informatique, nous vous accompagnons de l'achat à
          la réparation avec un service professionnel et de confiance.
        </p>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card glass">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

