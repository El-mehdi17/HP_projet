import { NavLink } from "react-router-dom";
import "./css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Résumé société */}
        <div className="footer-col a">
          <h3>HP Informatique</h3>
          <p>
            Spécialistes en vente, achat et réparation de composants informatiques.
            Nous offrons des produits certifiés et un service professionnel pour
            particuliers et entreprises.
          </p>
        </div>

        {/* Liens rapides */}
        <div className="footer-col b">
          <h3>Liens rapides</h3>
          <ul>
            <li><NavLink to="/Accuile">Accueil</NavLink></li>
            <li><NavLink to="/produits">Produits</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Coordonnées */}
        <div className="footer-col">
          <h3>Coordonnées</h3>
          <ul className="footer-contact">
            <li>📍 Casablanca , Morocco</li>
            <li>📞 <a href="tel:+213555123456">+212 63 55 12 45 28j</a></li>
            <li>✉️ <a href="mailto:contact@hp-informatique.dz">contact@hp-informatique.dz</a></li>
            <li>🕐 Lun – Sam : 08h00 – 18h00</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HP Informatique. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
