import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./css/contact.css";
import {Mail} from "lucide-react"

// ─── Configuration EmailJS ───────────────────────────────────────────────────
// 1. Créez un compte sur https://www.emailjs.com
// 2. Ajoutez un service Gmail  → copiez le Service ID
// 3. Créez un template         → copiez le Template ID
// 4. Récupérez votre Public Key (Account > API Keys)
// Remplacez les 3 valeurs ci-dessous :
const SERVICE_ID  = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus("ok");
        form.current.reset();
      })
      .catch(() => setStatus("err"));
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contactez-nous</h1>
        <p>Envoyez-nous votre message, nous vous répondrons rapidement.</p>
      </div>

      <div className="contact-container">
        {/* Infos */}
        <div className="contact-infos">
          <h2>Nos coordonnées</h2>
          <div className="info-item">📍 <span>Morroco , CasaBlanca</span></div>
          <div className="info-item">📞 <span>+212 63 53 45 12 </span></div>
          <div className="info-item">✉️ <span>contact@hp-informatique.dz</span></div>
          <div className="info-item">🕐 <span>Lun – Sam : 08h00 – 18h00</span></div>
        </div>

        {/* Formulaire */}
        <form ref={form} onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="user_name" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="user_email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label>Sujet</label>
            <input type="text" name="subject" placeholder="Sujet du message" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" placeholder="Écrivez votre message..." required />
          </div>

          <button type="submit" className="btn-send" disabled={status === "sending"}>
            {status === "sending" ? "Envoi en cours..." : <>Envoyer le message <Mail className="em" size={23} /></>}
          </button>

          {status === "ok"  && <p className="msg-ok">✅ Message envoyé avec succès !</p>}
          {status === "err" && <p className="msg-err">❌ Erreur lors de l'envoi. Réessayez.</p>}
        </form>
      </div>
    </div>
  );
}
