import "./css/services.css";

const services = [
  {
    icon: "🛒",
    titre: "Vente de Produits",
    description:
      "Nous proposons une large gamme de composants informatiques neufs : cartes mères, processeurs, RAM, SSD, claviers, souris et bien plus. Des produits certifiés, garantis et disponibles immédiatement.",
  },
  {
    icon: "💰",
    titre: "Achat & Reprise",
    description:
      "Vous souhaitez vendre vos anciens composants ? Nous rachetons vos pièces PC d'occasion après évaluation. Estimation rapide, paiement immédiat et processus transparent.",
  },
  {
    icon: "🔧",
    titre: "Réparation",
    description:
      "Notre équipe de techniciens qualifiés diagnostique et répare tous types de pannes : carte mère, alimentation, écran, clavier, et autres composants. Devis gratuit avant toute intervention.",
  },
  {
    icon: "🔄",
    titre: "Service Après-Vente (SAV)",
    description:
      "Après votre achat, nous restons à votre disposition. Remplacement sous garantie, assistance technique, suivi de votre dossier — votre satisfaction est notre priorité.",
  },
  {
    icon: "📦",
    titre: "Livraison & Retour",
    description:
      "Livraison rapide à domicile ou en point relais. Retour facile sous 14 jours si le produit ne vous convient pas, sans frais cachés.",
  },
  {
    icon: "🛡️",
    titre: "Garantie & Fiabilité",
    description:
      "Tous nos produits sont couverts par une garantie constructeur. Nous travaillons uniquement avec des marques reconnues pour vous assurer qualité et durabilité.",
  },
];

export default function Services() {
  return (
    <div className="services-page">
      {/* Hero */}
      <div className="services-hero">
        <h1>Nos Services</h1>
        <p>
          Spécialistes en informatique, nous vous accompagnons de l'achat à la
          réparation avec un service professionnel et de confiance.
        </p>
      </div>

      {/* Cartes services */}
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.titre}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>

      {/* Bannière pourquoi nous */}
      <div className="services-banner">
        <h2>Pourquoi nous choisir ?</h2>
        <div className="banner-items">
          <div className="banner-item">
            <span>✅</span>
            <p>Techniciens certifiés</p>
          </div>
          <div className="banner-item">
            <span>✅</span>
            <p>Devis gratuit</p>
          </div>
          <div className="banner-item">
            <span>✅</span>
            <p>Pièces d'origine</p>
          </div>
          <div className="banner-item">
            <span>✅</span>
            <p>Intervention rapide</p>
          </div>
          <div className="banner-item">
            <span>✅</span>
            <p>Garantie sur réparation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
