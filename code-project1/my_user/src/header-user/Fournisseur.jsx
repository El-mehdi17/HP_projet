import React, { useState, useEffect } from 'react';
import "./css/Fournisseur.css";
import api from './services/api';

const Fournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    email: '',        // Changé: 'contact' -> 'email'
    telephone: '',
    adresse: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/fournisseurs');
      setFournisseurs(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des fournisseurs:', error);
      const mockData = [
        { id: 1, nom: 'Tech Solutions', email: 'contact@techsolutions.com', telephone: '06 12 34 56 78', adresse: '12 Rue de la Tech, Paris' },
        { id: 2, nom: 'Matières Premières SARL', email: 'contact@matierespremieres.fr', telephone: '06 98 76 54 32', adresse: '45 Avenue des Fournisseurs, Lyon' }
      ];
      setFournisseurs(mockData);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer les erreurs quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (serverErrors[name]) {
      setServerErrors({
        ...serverErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setServerErrors({});

    // Préparer les données pour le backend (sans l'id pour la création)
    const dataToSend = {
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse
    };

    try {
      if (isEditing) {
        // Mettre à jour le fournisseur
        const response = await api.put(`/fournisseurs/${formData.id}`, dataToSend);
        setFournisseurs(fournisseurs.map(f => f.id === formData.id ? response.data.data : f));
        alert('Fournisseur modifié avec succès!');
        resetForm();
      } else {
        // Ajouter un nouveau fournisseur
        const response = await api.post('/fournisseurs', dataToSend);
        setFournisseurs([...fournisseurs, response.data.data]);
        alert('Fournisseur ajouté avec succès!');
        resetForm();
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);

      // Gérer les erreurs de validation 422
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;

        // Transformer les erreurs du backend en format utilisable
        const formattedErrors = {};
        if (validationErrors) {
          Object.keys(validationErrors).forEach(key => {
            if (Array.isArray(validationErrors[key])) {
              formattedErrors[key] = validationErrors[key][0];
            } else {
              formattedErrors[key] = validationErrors[key];
            }
          });
        }
        setServerErrors(formattedErrors);

        // Afficher un message d'erreur plus détaillé
        const errorMessage = Object.values(formattedErrors).join('\n');
        alert(`Erreur de validation:\n${errorMessage}`);
      } else {
        alert(`Erreur lors de l'enregistrement: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (fournisseur) => {
    setFormData({
      id: fournisseur.id,
      nom: fournisseur.nom,
      email: fournisseur.email,
      telephone: fournisseur.telephone || '',
      adresse: fournisseur.adresse || ''
    });
    setIsEditing(true);
    setServerErrors({});
  };

  const handleDelete = async (id, nom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le fournisseur "${nom}" ?`)) {
      try {
        await api.delete(`/fournisseurs/${id}`);
        setFournisseurs(fournisseurs.filter(f => f.id !== id));
        alert('Fournisseur supprimé avec succès!');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert(`Erreur lors de la suppression: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      nom: '',
      email: '',
      telephone: '',
      adresse: ''
    });
    setIsEditing(false);
    setErrors({});
    setServerErrors({});
  };

  return (
    <div className="fournisseur-container">
      <div className="fournisseur-card">
        <div className="card-header">
          <h2>Gestion des Fournisseurs</h2>
          <p>Ajouter, modifier ou supprimer des fournisseurs</p>
        </div>

        <div className="fournisseur-content">
          {/* Formulaire */}
          <div className="form-section">
            <h3 className="section-title">
              {isEditing ? 'Modifier le fournisseur' : 'Ajouter un nouveau fournisseur'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Nom <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={`form-input ${(errors.nom || serverErrors.nom) ? 'error' : ''}`}
                    placeholder="Nom du fournisseur"
                    disabled={submitting}
                  />
                  {(errors.nom || serverErrors.nom) && (
                    <span className="error-message">{errors.nom || serverErrors.nom}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${(errors.email || serverErrors.email) ? 'error' : ''}`}
                    placeholder="email@exemple.com"
                    disabled={submitting}
                  />
                  {(errors.email || serverErrors.email) && (
                    <span className="error-message">{errors.email || serverErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Téléphone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className={`form-input ${(errors.telephone || serverErrors.telephone) ? 'error' : ''}`}
                    placeholder="06 12 34 56 78"
                    disabled={submitting}
                  />
                  {(errors.telephone || serverErrors.telephone) && (
                    <span className="error-message">{errors.telephone || serverErrors.telephone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Adresse <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className={`form-input ${(errors.adresse || serverErrors.adresse) ? 'error' : ''}`}
                    placeholder="Adresse complète"
                    disabled={submitting}
                  />
                  {(errors.adresse || serverErrors.adresse) && (
                    <span className="error-message">{errors.adresse || serverErrors.adresse}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'En cours...' : (isEditing ? 'Modifier' : 'Ajouter')}
                </button>
                {isEditing && (
                  <button type="button" className="btn-cancel" onClick={resetForm} disabled={submitting}>
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Liste des fournisseurs */}
          <div className="list-section">
            <h3 className="section-title">Liste des fournisseurs</h3>
            <div className="table-responsive">
              {loading ? (
                <div className="loading-spinner">Chargement...</div>
              ) : (
                <table className="fournisseur-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Adresse</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fournisseurs.length > 0 ? (
                      fournisseurs.map((fournisseur) => (
                        <tr key={fournisseur.id}>
                          <td>{fournisseur.id}</td>
                          <td>{fournisseur.nom}</td>
                          <td>{fournisseur.email}</td>
                          <td>{fournisseur.telephone}</td>
                          <td>{fournisseur.adresse}</td>
                          <td className="actions">
                            <button
                              onClick={() => handleEdit(fournisseur)}
                              className="btn-edit"
                              disabled={submitting}
                            >
                              ✏️ Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(fournisseur.id, fournisseur.nom)}
                              className="btn-delete"
                              disabled={submitting}
                            >
                              🗑️ Supprimer
                            </button>
                           </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data">
                          Aucun fournisseur trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fournisseur;
