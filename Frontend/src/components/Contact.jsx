import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé avec succès !');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-banner glass">
        <h2 className="contact-title">Contactez-nous</h2>
        <p className="contact-subtitle">Envoyez-nous votre message, nous vous répondrons rapidement.</p>
      </div>

      <div className="contact-content">
        {/* Coordonnées */}
        <div className="contact-info glass">
          <h3>Nos coordonnées</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>Maroc, Casablanca</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+212 63 53 45 12</span>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <span>contact@hp-projet.ma</span>
            </li>
          </ul>
        </div>

        {/* Formulaire */}
        <form className="contact-form glass" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Votre message..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Envoyer le message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
