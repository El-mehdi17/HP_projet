import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <ul className="nav-links">
          <li><a href="#accueil" className="active">Accueil</a></li>
          <li><a href="#produits">Produit</a></li>
        </ul>
        
        <div className="logo-container">
          <div className="hp-logo">
            <i>hp</i>
          </div>
        </div>

        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn-connexion glass">CONNEXION</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
