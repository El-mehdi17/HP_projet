import React, { useState, useEffect } from 'react';
import './LoginModal.css';
import { FaUser, FaLock, FaEnvelope, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'online', 'offline'
  
  // Players and Clients cache for offline fallback
  const [availablePlayers, setAvailablePlayers] = useState([
    { id: 1, name: 'Mahdi', game: 'Football', role: 'Player' },
    { id: 2, name: 'Ali', game: 'Basketball', role: 'Player' }
  ]);
  const [availableClients, setAvailableClients] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Attempt to fetch players and clients from Laravel backend
    setBackendStatus('checking');
    setError(null);
    
    const fetchData = async () => {
      try {
        // Fetch players
        const playersRes = await fetch('http://localhost:8000/api/players');
        if (playersRes.ok) {
          const playersData = await playersRes.json();
          setAvailablePlayers(playersData.map(p => ({ ...p, role: 'Player' })));
          setBackendStatus('online');
        }
        
        // Fetch clients
        const clientsRes = await fetch('http://localhost:8000/api/clients');
        if (clientsRes.ok) {
          const clientsData = await clientsRes.json();
          setAvailableClients(clientsData.map(c => ({ ...c, role: 'Client' })));
          setBackendStatus('online');
        }
      } catch (err) {
        console.warn('Laravel backend is offline, using static mock fallback data.', err);
        setBackendStatus('offline');
      }
    };

    fetchData();
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network delay for a premium feel
    setTimeout(() => {
      const trimmedName = name.trim().toLowerCase();
      const trimmedEmail = email.trim().toLowerCase();

      // 1. Search in players (from backend or static fallback)
      const foundPlayer = availablePlayers.find(
        p => p.name.toLowerCase() === trimmedName
      );

      if (foundPlayer) {
        onLoginSuccess({
          id: foundPlayer.id,
          name: foundPlayer.name,
          role: 'Player',
          details: `Jeu préféré: ${foundPlayer.game || 'Non spécifié'}`
        });
        setLoading(false);
        onClose();
        return;
      }

      // 2. Search in clients (from backend)
      const foundClient = availableClients.find(
        c => (c.nom && c.nom.toLowerCase() === trimmedName) || 
             (c.email && c.email.toLowerCase() === trimmedEmail)
      );

      if (foundClient) {
        onLoginSuccess({
          id: foundClient.id_client || foundClient.id,
          name: foundClient.nom,
          role: 'Client',
          details: `Client Email: ${foundClient.email} | Tel: ${foundClient.telephone || 'N/A'}`
        });
        setLoading(false);
        onClose();
        return;
      }

      // 3. Simple registration or mock user if offline/unrecognized to not block the user
      if (trimmedName) {
        // If they type a new name, let them log in as a new user to make it flexible!
        onLoginSuccess({
          id: Date.now(),
          name: name.trim(),
          role: 'Visiteur',
          details: 'Utilisateur connecté avec succès'
        });
        setLoading(false);
        onClose();
      } else {
        setError("Veuillez saisir un nom valide pour vous connecter.");
        setLoading(false);
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-card glass" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="login-header">
          <div className="login-logo">
            <i>hp</i>
          </div>
          <h2>Connexion</h2>
          <p>Connectez-vous avec vos identifiants du Backend</p>
        </div>

        {backendStatus === 'offline' && (
          <div className="backend-alert warning">
            <FaExclamationTriangle />
            <span>
              <strong>Mode Hors-ligne :</strong> Le serveur Laravel (port 8000) est hors-service. Utilisation des données statiques (Essayez: <strong>Mahdi</strong> ou <strong>Ali</strong>).
            </span>
          </div>
        )}

        {backendStatus === 'online' && (
          <div className="backend-alert success">
            <span className="pulse-dot"></span>
            <span>Connecté au serveur Laravel avec succès !</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur / Nom du client</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Ex: Mahdi, Ali ou votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse Email (Optionnel)</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="Ex: client@hp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="login-error-msg">{error}</div>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
