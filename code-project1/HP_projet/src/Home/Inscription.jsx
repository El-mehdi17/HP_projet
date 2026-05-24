import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/inscription.css";
import { Eye, EyeClosed } from "lucide-react";
import api from "./services/api";

export default function Inscription() {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", tel: "", mdp: "", confirm: "" });
  const [msg, setMsg] = useState("");
  const [showMdp, setShowMdp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(form.nom.trim())) return setMsg("❌ Le nom ne doit contenir que des lettres.");
    if (form.mdp.length < 6) return setMsg("❌ Le mot de passe doit contenir au moins 6 caractères.");
    if (form.mdp !== form.confirm) return setMsg("❌ Les mots de passe ne correspondent pas.");

    try {
      await api.post("/clients", {
        nom: `${form.nom} ${form.prenom}`.trim(),
        email: form.email,
        telephone: form.tel,
        password: form.mdp,
      });
      setMsg("✅ Inscription réussie !");
      setTimeout(() => navigate("/Connexion"), 1000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors?.email) return setMsg("❌ Cet email est déjà utilisé.");
      setMsg("❌ Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="inscription-page">
      <div className="inscription-card">
        <h1>Créer un compte</h1>
        <p className="sub">Rejoignez-nous dès aujourd'hui</p>

        <form onSubmit={handleSubmit}>
          <div className="row-2">
            <div className="form-group">
              <label className="r">Nom</label>
              <input name="nom" className="r" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
            </div>
            <div className="form-group">
              <label className="r">Prénom</label>
              <input name="prenom" className="w" value={form.prenom} onChange={handleChange} placeholder="Votre prénom" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="exemple@email.com" required />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="+212 XX XX XX XX" />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-eye">
              <input type={showMdp ? "text" : "password"} name="mdp" value={form.mdp} onChange={handleChange} placeholder="••••••••" required />
              <button type="button" className="eye-btn" onClick={() => setShowMdp(!showMdp)}>{showMdp ? <EyeClosed /> : <Eye />}</button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <div className="input-eye">
              <input type={showConfirm ? "text" : "password"} name="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••" required />
              <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeClosed /> : <Eye />}</button>
            </div>
          </div>

          {msg && <p className={msg.includes("✅") ? "msg-ok" : "msg-err"}>{msg}</p>}
          <button type="submit" className="btn-inscrire">S'inscrire</button>
        </form>

        <p className="login-link">Déjà un compte ? <NavLink to="/Connexion">Se connecter</NavLink></p>
      </div>
    </div>
  );
}
