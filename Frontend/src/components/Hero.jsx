import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="accueil">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="highlight">Qui</span> sommes-nous ?
        </h1>
        <p className="hero-description">
          Notre société est dédiée à offrir des solutions complètes pour vos besoins
          informatiques. Spécialisés dans la vente, l'achat et la réparation de pièces
          PC telles que les claviers, cartes mères et autres composants essentiels,
          nous garantissons des produits fiables et un service professionnel. Que
          vous soyez particulier ou entreprise, nous mettons notre expertise à votre
          disposition pour assurer performance, qualité et satisfaction.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Inscription</button>
          <button className="btn-secondary">Connexion</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
