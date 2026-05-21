import React from 'react';
import './Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-hp-logo"><i>hp</i></div>
            <span className="footer-brand-name">HP Informatique</span>
          </div>
          <p className="footer-desc">
            Spécialistes en vente, achat et réparation de composants
            informatiques. Nous offrons des produits certifiés et un
            service professionnel pour particuliers et entreprises.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Liens rapides</h4>
          <div className="footer-divider"></div>
          <ul className="footer-links">
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#produits">Produits</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Coordonnées</h4>
          <div className="footer-divider"></div>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-icon"><FaMapMarkerAlt /></span>
              <span>Casablanca, Morocco</span>
            </li>
            <li>
              <span className="footer-icon"><FaPhoneAlt /></span>
              <span>+212 63 53 45 12</span>
            </li>
            <li>
              <span className="footer-icon"><FaEnvelope /></span>
              <span>contact@hp-informatique.dz</span>
            </li>
            <li>
              <span className="footer-icon"><FaClock /></span>
              <span>Lun – Sam : 08h00 – 18h00</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 HP Informatique. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
