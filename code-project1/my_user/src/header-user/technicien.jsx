import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import "./css/techn.css";
import api from "./services/api";

const specialites = [
  "Technicien Maintenance Hardware",
  "Technicien Logiciel (Software)",
  "Technicien Support PC",
  "Technicien Laptop (Portable)",
  "Technicien Micro-soudure",
  "Technicien Récupération de données",
];

const metiers = [
  "Technicien de maintenance informatique",
  "Technicien support informatique",
  "Réparateur d'ordinateurs (PC)",
  "Technicien hardware",
  "Technicien software",
  "Technicien en réparation de laptops",
  "Technicien micro-soudure",
  "Spécialiste en récupération de données",
];

const EMPTY = {
  image: null, imagePreview: null,
  nom: "", prenom: "", cin: "",
  specialite: "", metier: "",
  experience: "", prix: "",
};

export default function Technicien() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techniciens, setTechniciens] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/techniciens")
      .then(res => setTechniciens(res.data?.data ?? res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => setForm(f => ({ ...f, image: file, imagePreview: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setForm(f => ({ ...f, [name]: value }));
      if (errors[name]) setErrors(e => ({ ...e, [name]: "" }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Requis";
    if (!form.prenom.trim()) e.prenom = "Requis";
    if (!form.cin.trim()) e.cin = "Requis";
    if (!form.specialite) e.specialite = "Requis";
    if (!form.metier) e.metier = "Requis";
    if (!form.experience) e.experience = "Requis";
    if (!form.prix) e.prix = "Requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.append("nom", form.nom);
    data.append("prenom", form.prenom);
    data.append("cin", form.cin);
    data.append("specialite", form.specialite);
    data.append("metier", form.metier);
    data.append("années_d_expérience", form.experience);
    data.append("Prix", form.prix);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        data.append("_method", "PUT");
        const res = await api.post(`/techniciens/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updated = res.data.data ?? res.data;
        setTechniciens(prev => prev.map(t => t.id === editId ? updated : t));
        setEditId(null);
      } else {
        const res = await api.post("/techniciens", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const created = res.data.data ?? res.data;
        setTechniciens(prev => [...prev, created]);
      }
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      if (err.response?.status === 422) {
        const srv = {};
        Object.entries(err.response.data.errors ?? {}).forEach(([k, v]) => {
          srv[k] = Array.isArray(v) ? v[0] : v;
        });
        setErrors(srv);
      } else {
        alert("Erreur : " + (err.response?.data?.message ?? err.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setForm({
      image: null,
      imagePreview: t.image ? `http://127.0.0.1:8000/storage/${t.image}` : null,
      nom: t.nom ?? "",
      prenom: t.prenom ?? "",
      cin: t.cin ?? "",
      specialite: t.specialite ?? "",
      metier: t.metier ?? "",
      experience: t["années_d_expérience"] ?? "",
      prix: t.Prix ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce technicien ?")) return;
    await api.delete(`/techniciens/${id}`);
    setTechniciens(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="technicien-container">
      <div className="technicien-card">
        <div className="card-header">
          <h2>👨‍🔧 {editId ? "Modifier" : "Enregistrement"} Technicien</h2>
          <p>Remplissez le formulaire pour {editId ? "modifier" : "ajouter"} un technicien</p>
        </div>

        <form onSubmit={handleSubmit} className="technicien-form">
          {/* Image */}
          <div className="form-section">
            <label className="form-label">Photo du technicien</label>
            <div className="image-upload-area">
              {form.imagePreview ? (
                <div className="image-preview">
                  <img src={form.imagePreview} alt="Aperçu" />
                  <button type="button" className="remove-image"
                    onClick={() => setForm(f => ({ ...f, image: null, imagePreview: null }))}>
                    ✕ Supprimer
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
                  <div className="upload-icon"><Camera size={50} color="#5a67d8" /></div>
                  <div className="upload-text">Cliquez pour ajouter une photo</div>
                  <div className="upload-hint">PNG, JPG, JPEG (max. 5MB)</div>
                </label>
              )}
            </div>
          </div>

          {/* Infos personnelles */}
          <div className="form-section">
            <h3 className="section-title">Informations personnelles</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nom <span className="required">*</span></label>
                <input type="text" name="nom" placeholder="Ex: Bennani"
                  className={`form-input ${errors.nom ? "error" : ""}`}
                  value={form.nom} onChange={handleChange} />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Prénom <span className="required">*</span></label>
                <input type="text" name="prenom" placeholder="Ex: Ahmed"
                  className={`form-input ${errors.prenom ? "error" : ""}`}
                  value={form.prenom} onChange={handleChange} />
                {errors.prenom && <span className="error-message">{errors.prenom}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">CIN <span className="required">*</span></label>
              <input type="text" name="cin" placeholder="Ex: AB123456"
                className={`form-input ${errors.cin ? "error" : ""}`}
                value={form.cin} onChange={handleChange} />
              {errors.cin && <span className="error-message">{errors.cin}</span>}
            </div>
          </div>

          {/* Infos professionnelles */}
          <div className="form-section">
            <h3 className="section-title">Informations professionnelles</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Spécialité <span className="required">*</span></label>
                <select name="specialite"
                  className={`form-select ${errors.specialite ? "error" : ""}`}
                  value={form.specialite} onChange={handleChange}>
                  <option value="">Sélectionnez une spécialité</option>
                  {specialites.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.specialite && <span className="error-message">{errors.specialite}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Métier <span className="required">*</span></label>
                <select name="metier"
                  className={`form-select ${errors.metier ? "error" : ""}`}
                  value={form.metier} onChange={handleChange}>
                  <option value="">Sélectionnez un métier</option>
                  {metiers.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.metier && <span className="error-message">{errors.metier}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Années d'expérience <span className="required">*</span></label>
                <input type="number" name="experience" placeholder="Ex: 5"
                  className={`form-input ${errors.experience ? "error" : ""}`}
                  value={form.experience} onChange={handleChange} />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Prix (DH) <span className="required">*</span></label>
                <input type="number" name="prix" placeholder="Ex: 500"
                  className={`form-input ${errors.prix ? "error" : ""}`}
                  value={form.prix} onChange={handleChange} />
                {errors.prix && <span className="error-message">{errors.prix}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : editId ? "✅ Modifier" : "✅ Enregistrer"}
            </button>
            <button type="button" className="btn-reset"
              onClick={() => { setForm(EMPTY); setErrors({}); setEditId(null); }}>
              🗑️ Réinitialiser
            </button>
          </div>
        </form>
      </div>

      {/* Liste */}
      {techniciens.length > 0 && (
        <div className="technicien-card" style={{ marginTop: "1.5rem" }}>
          <div className="card-header">
            <h2>📋 Liste des techniciens ({techniciens.length})</h2>
          </div>
          <div style={{ overflowX: "auto", padding: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  {["#", "Photo", "Nom", "Prénom", "CIN", "Spécialité", "Exp.", "Prix", "Actions"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {techniciens.map(t => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 12px" }}>{t.id}</td>
                    <td style={{ padding: "8px 12px" }}>
                      {t.image
                        ? <img src={`http://127.0.0.1:8000/storage/${t.image}`} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                        : <span style={{ fontSize: "1.4rem" }}>👤</span>}
                    </td>
                    <td style={{ padding: "8px 12px" }}>{t.nom}</td>
                    <td style={{ padding: "8px 12px" }}>{t.prenom}</td>
                    <td style={{ padding: "8px 12px" }}>{t.cin}</td>
                    <td style={{ padding: "8px 12px" }}>{t.specialite}</td>
                    <td style={{ padding: "8px 12px" }}>{t["années_d_expérience"]} ans</td>
                    <td style={{ padding: "8px 12px" }}>{t.Prix} Dh</td>
                    <td style={{ padding: "8px 12px", display: "flex", gap: 6 }}>
                      <button className="btn-submit" style={{ padding: "4px 10px", fontSize: "0.78rem" }}
                        onClick={() => handleEdit(t)}>✏️</button>
                      <button className="btn-reset" style={{ padding: "4px 10px", fontSize: "0.78rem" }}
                        onClick={() => handleDelete(t.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
