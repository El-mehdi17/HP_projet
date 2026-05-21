import React, { useState, useEffect } from 'react';
import './RegisterModal.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle, FaTimes, FaCheckCircle } from 'react-icons/fa';

const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'online', 'offline'

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setNom('');
      setEmail('');
      setTelephone('');
      setAdresse('');
      setError(null);
      setSuccess(false);
      setLoading(false);
      return;
    }

    // Check backend health
    const checkBackend = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/clients');
        if (res.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('online'); // even if empty, if server responds it's online
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };
    checkBackend();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const clientData = {
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim() || null,
      adresse: adresse.trim() || null
    };

    if (backendStatus === 'online') {
      try {
        const response = await fetch('http://localhost:8000/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(clientData)
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            onRegisterSuccess({
              id: data.data.id_client || data.data.id,
              name: data.data.nom,
              role: 'Client',
              details: `Client Email: ${data.data.email} | Tel: ${data.data.telephone || 'N/A'}`
            });
            onClose();
          }, 1500);
        } else {
          // Handle Laravel validation errors
          if (data.errors) {
            const firstError = Object.values(data.errors)[0][0];
            setError(firstError);
          } else {
            setError(data.message || "Une erreur est survenue lors de l'inscription.");
          }
        }
      } catch (err) {
        console.error('Error connecting to backend:', err);
        setError("Erreur de connexion avec le serveur.");
      } finally {
        setLoading(false);
      }
    } else {
      // Offline mock registration fallback
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          onRegisterSuccess({
            id: Date.now(),
            name: clientData.nom,
            role: 'Client (Hors-ligne)',
            details: `Client Email: ${clientData.email} | Tel: ${clientData.telephone || 'N/A'}`
          });
          onClose();
        }, 1500);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay" onClick={onClose}>
      <div className="register-modal-card glass" onClick={(e) => e.stopPropagation()}>
        <button className="register-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="register-header">
          <div className="register-logo">
            <i>hp</i>
          </div>
          <h2>Inscription Client</h2>
          <p>Créez votre compte client connecté au Backend</p>
        </div>

        {backendStatus === 'offline' && (
          <div className="backend-alert warning">
            <FaExclamationTriangle />
            <span>
              <strong>Mode Hors-ligne :</strong> Serveur Laravel hors-service. Votre inscription sera simulée localement.
            </span>
          </div>
        )}

        {success ? (
          <div className="register-success-view">
            <FaCheckCircle className="success-icon" />
            <h3>Inscription réussie !</h3>
            <p>Bienvenue chez HP Informatique, {nom}.</p>
            <span className="spinner"></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="nom">Nom Complet *</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  id="nom"
                  type="text"
                  placeholder="Ex: Ahmed El Mansouri"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse Email *</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Ex: ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone (Optionnel)</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input
                  id="telephone"
                  type="tel"
                  placeholder="Ex: +212 600 000 000"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="adresse">Adresse (Optionnel)</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  id="adresse"
                  type="text"
                  placeholder="Ex: Boulevard d'Anfa, Casablanca"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="register-error-msg">{error}</div>}

            <button type="submit" className="register-submit-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : "S'inscrire"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
