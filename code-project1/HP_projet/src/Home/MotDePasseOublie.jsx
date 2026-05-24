import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import api from "./services/api";
import "./css/connexion.css";

export default function MotDePasseOublie() {
  const [form, setForm] = useState({ email: "", password: "", password_confirmation: "" });
  const [msg, setMsg] = useState({ text: "", ok: false });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      setMsg({ text: "❌ Les mots de passe ne correspondent pas.", ok: false });
      return;
    }
    setLoading(true);
    try {
      await api.post("/clients/reset-password", form);
      setMsg({ text: "✅ Mot de passe mis à jour ! Redirection...", ok: true });
      setTimeout(() => navigate("/Connexion"), 2000);
    } catch (err) {
      setMsg({ text: "❌ " + (err.response?.data?.message ?? "Erreur."), ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connexion-page">
      <div className="connexion-card">
        <h1>Mot de passe oublié</h1>
        <p className="sub">Entrez votre email et choisissez un nouveau mot de passe.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handle}
              placeholder="exemple@email.com" required />
          </div>

          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <div className="input-eye">
              <input type={show ? "text" : "password"} name="password" value={form.password}
                onChange={handle} placeholder="••••••••" required minLength={6} />
              <button type="button" className="eye-btn" onClick={() => setShow(!show)}>
                {show ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input type={show ? "text" : "password"} name="password_confirmation"
              value={form.password_confirmation} onChange={handle}
              placeholder="••••••••" required minLength={6} />
          </div>

          {msg.text && <p className={msg.ok ? "msg-ok" : "msg-err"}>{msg.text}</p>}

          <button type="submit" className="btn-connexion" disabled={loading}>
            {loading ? "Mise à jour..." : "Réinitialiser le mot de passe"}
          </button>
        </form>

        <p className="register-link">
          <NavLink to="/Connexion">← Retour à la connexion</NavLink>
        </p>
      </div>
    </div>
  );
}
