import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/connexion.css";
import { Eye, EyeClosed } from "lucide-react";
import api from "./services/api";
import { useAuth } from "./AuthContext";

export default function Connexion() {
  const [form, setForm] = useState({ email: "", mdp: "" });
  const [msg, setMsg] = useState("");
  const [showMdp, setShowMdp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/clients/login", { email: form.email, password: form.mdp });
      login(res.data.client);
      navigate("/dashboard");
    } catch (err) {
      setMsg("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="connexion-page">
      <div className="connexion-card">
        <h1>Se connecter</h1>
        <p className="sub">Content de vous revoir !</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="exemple@email.com" required />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-eye">
              <input type={showMdp ? "text" : "password"} name="mdp" value={form.mdp} onChange={handleChange} placeholder="••••••••" required />
              <button type="button" className="eye-btn" onClick={() => setShowMdp(!showMdp)}>{showMdp ? <EyeClosed /> : <Eye />}</button>
            </div>
          </div>

          {msg && <p className="msg-err">{msg}</p>}
          <button type="submit" className="btn-connexion">Se connecter</button>
        </form>

        <p className="register-link">Pas encore de compte ? <NavLink to="/Inscription">S'inscrire</NavLink></p>
      </div>
    </div>
  );
}
