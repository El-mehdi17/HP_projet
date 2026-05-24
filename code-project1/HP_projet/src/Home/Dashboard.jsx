import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import { useAuth } from "./AuthContext";
import "./css/dashboard.css";

const STATUTS = { en_attente: "⏳ En attente", en_preparation: "🔧 En préparation", expediee: "🚚 Expédiée", livree: "✅ Livrée" };
const TABS = ["produits", "panier", "commandes", "livreur", "profil", "message"];

export default function Dashboard() {
  const { client, logout, login } = useAuth();
  const navigate = useNavigate();
  const [onglet, setOnglet] = useState("produits");
  const [produits, setProduits] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allCommandes, setAllCommandes] = useState([]);
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profil, setProfil] = useState({ nom: client?.nom || "", email: client?.email || "", telephone: client?.telephone || "" });
  const [profilMsg, setProfilMsg] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!client) { navigate("/Connexion"); return; }
    Promise.all([
      api.get("/produits"),
      api.get(`/commandes?id_client=${client.id}`),
      api.get("/clients"),
      api.get("/commandes"),
    ]).then(([rp, rc, rcl, rca]) => {
      setProduits(rp.data?.data ?? rp.data);
      setCommandes(rc.data?.data ?? rc.data);
      setAllClients(rcl.data?.data ?? rcl.data);
      setAllCommandes(rca.data?.data ?? rca.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [client]);

  // Panier
  const ajouterAuPanier = (produit) => {
    setPanier(prev => {
      const exist = prev.find(p => p.id === produit.id);
      if (exist) return prev.map(p => p.id === produit.id ? { ...p, qte: p.qte + 1 } : p);
      return [...prev, { ...produit, qte: 1 }];
    });
  };

  const retirerDuPanier = (id) => setPanier(prev => prev.filter(p => p.id !== id));

  const changerQte = (id, qte) => {
    if (qte < 1) return retirerDuPanier(id);
    setPanier(prev => prev.map(p => p.id === id ? { ...p, qte } : p));
  };

  const totalPanier = panier.reduce((s, p) => s + p.prix * p.qte, 0);

  const confirmerCommande = async () => {
    if (panier.length === 0) return;
    try {
      const res = await api.post("/commandes", { id_client: client.id });
      const id_commande = res.data.data?.id ?? res.data.id;
      await Promise.all(panier.map(p =>
        api.post("/commande-produits", { id_commande, id_produit: p.id, quantite: p.qte, prix: p.prix })
      ));
      setPanier([]);
      const rc = await api.get(`/commandes?id_client=${client.id}`);
      setCommandes(rc.data?.data ?? rc.data);
      setOnglet("commandes");
    } catch (err) {
      console.error("Erreur commande:", err.response?.data);
    }
  };

  // Profil
  const sauvegarderProfil = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/clients/${client.id}`, profil);
      login(res.data.data ?? res.data);
      setProfilMsg("✅ Profil mis à jour !");
    } catch {
      setProfilMsg("❌ Erreur lors de la mise à jour.");
    }
  };

  const produitsFiltres = produits.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="dash-loading">Chargement...</div>;

  return (
    <div className="dash-container">
      {/* Header dashboard */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Bonjour, {client?.nom} 👋</h1>
          <p className="dash-sub">{client?.email}</p>
        </div>
        <button className="btn-logout" onClick={() => { logout(); navigate("/Connexion"); }}>Déconnexion</button>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        <div className="stat-card blue">
          <span className="stat-num">{produits.length}</span>
          <span className="stat-label">Produits disponibles</span>
        </div>
        <div className="stat-card green">
          <span className="stat-num">{commandes.length}</span>
          <span className="stat-label">Mes commandes</span>
        </div>
        <div className="stat-card orange">
          <span className="stat-num">{panier.length}</span>
          <span className="stat-label">Articles dans le panier</span>
        </div>
        <div className="stat-card blue">
          <span className="stat-num">{allClients.length}</span>
          <span className="stat-label">Total clients</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="dash-tabs">
        {TABS.map(t => (
          <button key={t} className={`dash-tab ${onglet === t ? "active" : ""}`} onClick={() => setOnglet(t)}>
            {t === "produits" && "🛍️ Produits"}
            {t === "panier" && `🛒 Panier ${panier.length > 0 ? `(${panier.length})` : ""}`}
            {t === "commandes" && "📦 Mes commandes"}
            {t === "livreur" && "🚚 Livreur"}
            {t === "profil" && "👤 Mon profil"}
            {t === "message" && "💬 Service après-vente"}
          </button>
        ))}
      </div>

      {/* Produits */}
      {onglet === "produits" && (
        <div>
          <input
            className="dash-search"
            placeholder="🔍 Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="dash-grid">
            {produitsFiltres.map(p => {
              const imgs = p.images ? (() => { try { return JSON.parse(p.images); } catch { return []; } })() : [];
              return (
              <div className="dash-card" key={p.id}>
                {imgs.length > 0 && (
                  <div className="dash-card-imgs">
                    {imgs.map((img, i) => (
                      <img key={i} src={`http://127.0.0.1:8000/storage/${img}`} alt={p.nom} className="dash-card-img" />
                    ))}
                  </div>
                )}
                <div className="dash-card-body">
                  <h3>{p.nom}</h3>
                  <p className="dash-prix">{(p.prix * 9.6).toFixed(2)} Dh</p>
                  <p className="dash-stock">Stock : {p.quantite_stock}</p>
                  <p className="dash-desc">{p.description}</p>
                  <button
                    className="btn-ajouter"
                    onClick={() => ajouterAuPanier(p)}
                    disabled={p.quantite_stock === 0}
                  >
                    {p.quantite_stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Panier */}
      {onglet === "panier" && (
        <div className="dash-section">
          {panier.length === 0 ? (
            <p className="dash-empty">Votre panier est vide.</p>
          ) : (
            <>
              <table className="dash-table">
                <thead>
                  <tr><th>Produit</th><th>Prix unitaire</th><th>Quantité</th><th>Sous-total</th><th></th></tr>
                </thead>
                <tbody>
                  {panier.map(p => (
                    <tr key={p.id}>
                      <td>{p.nom}</td>
                      <td>{(p.prix * 9.6).toFixed(2)} Dh</td>
                      <td>
                        <div className="qte-ctrl">
                          <button onClick={() => changerQte(p.id, p.qte - 1)}>−</button>
                          <span>{p.qte}</span>
                          <button onClick={() => changerQte(p.id, p.qte + 1)}>+</button>
                        </div>
                      </td>
                      <td>{(p.prix * p.qte * 9.6).toFixed(2)} Dh</td>
                      <td><button className="btn-retirer" onClick={() => retirerDuPanier(p.id)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="panier-footer">
                <strong>Total : {(totalPanier * 9.6).toFixed(2)} Dh</strong>
                <button className="btn-commander" onClick={confirmerCommande}>Confirmer la commande</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Commandes */}
      {onglet === "commandes" && (
        <div className="dash-section">
          {commandes.length === 0 ? (
            <p className="dash-empty">Aucune commande pour l'instant.</p>
          ) : (
            <table className="dash-table">
              <thead>
                <tr><th>#</th><th>Date</th><th>Statut</th><th>Produits</th></tr>
              </thead>
              <tbody>
                {commandes.map(c => (
                  <tr key={c.id}>
                    <td>#{c.id}</td>
                    <td>{new Date(c.created_at).toLocaleDateString("fr-FR")}</td>
                    <td><span className={`badge badge-${c.statut}`}>{STATUTS[c.statut] ?? c.statut}</span></td>
                    <td>{(c.commandeProduits ?? []).length} article(s)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Livreur */}
      {onglet === "livreur" && (
        <OngletLivreur clients={allClients} commandes={allCommandes} produits={produits} setAllCommandes={setAllCommandes} />
      )}

      {/* Profil */}
      {onglet === "profil" && (
        <div className="dash-section profil-section">
          <h2>Modifier mon profil</h2>
          <form onSubmit={sauvegarderProfil} className="profil-form">
            <div className="form-group">
              <label>Nom complet</label>
              <input value={profil.nom} onChange={e => setProfil({ ...profil, nom: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={profil.email} onChange={e => setProfil({ ...profil, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input value={profil.telephone} onChange={e => setProfil({ ...profil, telephone: e.target.value })} />
            </div>
            {profilMsg && <p className={profilMsg.includes("✅") ? "msg-ok" : "msg-err"}>{profilMsg}</p>}
            <button type="submit" className="btn-sauvegarder">Sauvegarder</button>
          </form>
        </div>
      )}
      {/* Message SAV */}
      {onglet === "message" && <MessageSAV client={client} />}
    </div>
  );
}

function OngletLivreur({ clients, commandes, produits, setAllCommandes }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  const creerCommande = async (id_client) => {
    try {
      const res = await api.post("/commandes", { id_client });
      const newCmd = res.data.data ?? res.data;
      setAllCommandes(prev => [...prev, newCmd]);
      setMsg(`✅ Commande #${newCmd.id} créée`);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message ?? "Erreur"));
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const clientsFiltres = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dash-section">
      <h2 style={{ marginBottom: "0.5rem" }}>🚚 Vue Livreur</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <span className="stat-card blue" style={{ padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.85rem" }}>
          👥 {clients.length} clients
        </span>
        <span className="stat-card green" style={{ padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.85rem" }}>
          📦 {commandes.length} commandes
        </span>
        <span className="stat-card orange" style={{ padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.85rem" }}>
          🛍️ {produits.length} produits
        </span>
      </div>

      {msg && (
        <p style={{ padding: "0.5rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.9rem",
          background: msg.startsWith("✅") ? "#dcfce7" : "#fee2e2",
          color: msg.startsWith("✅") ? "#166534" : "#991b1b" }}>
          {msg}
        </p>
      )}

      <input
        className="dash-search"
        placeholder="🔍 Rechercher un client..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {clientsFiltres.map(client => {
          const cmds = commandes.filter(c => c.id_client === client.id);
          const isOpen = selected === client.id;
          return (
            <div key={client.id} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.75rem 1rem", background: "#f9fafb", cursor: "pointer" }}
                onClick={() => setSelected(isOpen ? null : client.id)}
              >
                <div>
                  <strong>{client.nom}</strong>
                  <span style={{ color: "#6b7280", fontSize: "0.85rem", marginLeft: "0.75rem" }}>{client.email}</span>
                  {client.telephone && <span style={{ color: "#9ca3af", fontSize: "0.85rem", marginLeft: "0.75rem" }}>📞 {client.telephone}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#2563eb" }}>{cmds.length} commande(s)</span>
                  <button
                    className="btn-ajouter"
                    style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                    onClick={e => { e.stopPropagation(); creerCommande(client.id); }}
                  >
                    + Créer commande
                  </button>
                  <span>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {isOpen && (
                <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
                  {cmds.length === 0 ? (
                    <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Aucune commande.</p>
                  ) : (
                    <table className="dash-table">
                      <thead>
                        <tr><th>#</th><th>Date</th><th>Statut</th><th>Articles</th></tr>
                      </thead>
                      <tbody>
                        {cmds.map(cmd => (
                          <tr key={cmd.id}>
                            <td>#{cmd.id}</td>
                            <td>{new Date(cmd.created_at).toLocaleDateString("fr-FR")}</td>
                            <td><span className={`badge badge-${cmd.statut}`}>{STATUTS[cmd.statut] ?? cmd.statut}</span></td>
                            <td>{(cmd.commandeProduits ?? []).length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tableau produits */}
      <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontWeight: "bold" }}>📦 Produits ({produits.length})</h3>
      <table className="dash-table">
        <thead>
          <tr><th>Nom</th><th>Prix</th><th>Stock</th></tr>
        </thead>
        <tbody>
          {produits.map(p => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{(p.prix * 9.6).toFixed(2)} Dh</td>
              <td>{p.quantite_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessageSAV({ client }) {
  const [form, setForm] = useState({ id_commande: "", description: "" });
  const [msg, setMsg] = useState("");
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    if (client?.id) {
      api.get(`/commandes?id_client=${client.id}`)
        .then(res => setCommandes(res.data?.data ?? res.data))
        .catch(() => {});
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/interventions", {
        id_commande: Number(form.id_commande),
        description: form.description,
      });
      setMsg("✅ Message envoyé ! L'admin vous répondra bientôt.");
      setForm({ id_commande: "", description: "" });
    } catch (err) {
      setMsg("❌ Erreur : " + (err.response?.data?.message ?? "Réessayez."));
    }
  };

  return (
    <div className="dash-section profil-section">
      <h2>💬 Contacter le service après-vente</h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Un problème avec votre commande ? Notre équipe vous répond dans les 24h.
      </p>
      <form onSubmit={handleSubmit} className="profil-form">
        <div className="form-group">
          <label>Commande concernée</label>
          <select
            value={form.id_commande}
            onChange={e => setForm({ ...form, id_commande: e.target.value })}
            required
            style={{ padding: "0.55rem 0.8rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.9rem" }}
          >
            <option value="">-- Choisir une commande --</option>
            {commandes.map(c => (
              <option key={c.id} value={c.id}>Commande #{c.id} — {new Date(c.created_at).toLocaleDateString("fr-FR")}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Décrivez votre problème</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Ex: Mon produit est arrivé endommagé..."
            rows={5}
            required
            style={{ padding: "0.55rem 0.8rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.9rem", resize: "vertical" }}
          />
        </div>
        {msg && <p className={msg.includes("✅") ? "msg-ok" : "msg-err"}>{msg}</p>}
        <button type="submit" className="btn-sauvegarder">📧 Envoyer</button>
      </form>
    </div>
  );
}
