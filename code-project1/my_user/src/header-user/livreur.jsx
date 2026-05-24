import { useState, useEffect, useRef } from "react";
import api from "./services/api";
import "./css/livreur.css";

const STATUTS = {
  en_attente: "⏳ En attente",
  en_preparation: "🔧 En préparation",
  expediee: "🚚 Expédiée",
  livree: "✅ Livrée",
};

export default function Livreur() {
  const [clients, setClients] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    Promise.all([api.get("/clients"), api.get("/commandes")])
      .then(([rc, rco]) => {
        setClients(rc.data?.data ?? rc.data);
        setCommandes(rco.data?.data ?? rco.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected, commandes]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const creerCommande = async () => {
    if (!selected) return;
    try {
      const res = await api.post("/commandes", { id_client: selected.id });
      const newCmd = res.data.data ?? res.data;
      setCommandes((prev) => [...prev, newCmd]);
      showToast(`✅ Commande #${newCmd.id} créée`);
    } catch (err) {
      showToast("❌ " + (err.response?.data?.message ?? "Erreur"));
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const txt = input.trim().toLowerCase();
    if (!txt || !selected) return;
    if (txt === "commande" || txt === "créer" || txt === "creer" || txt === "new") {
      creerCommande();
    } else {
      showToast('💡 Tapez "commande" pour créer une commande');
    }
    setInput("");
  };

  const clientsFiltres = clients.filter((c) =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const cmdsClient = selected
    ? commandes.filter((c) => c.id_client === selected.id)
    : [];

  const initiales = (nom) =>
    nom ? nom.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  if (loading)
    return (
      <div className="wa-app">
        <div className="wa-loading">Chargement...</div>
      </div>
    );

  return (
    <div className="wa-app">
      {/* ── Sidebar ── */}
      <div className="wa-sidebar">
        <div className="wa-sidebar-header">
          <div className="wa-avatar">🚚</div>
          <h2>Livreur</h2>
          <span style={{ color: "#8696a0", fontSize: "0.8rem" }}>
            {clients.length} clients
          </span>
        </div>

        <div className="wa-search-box">
          <div className="wa-search-wrap">
            <input
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="wa-contacts">
          {clientsFiltres.map((client) => {
            const nb = commandes.filter((c) => c.id_client === client.id).length;
            return (
              <div
                key={client.id}
                className={`wa-contact-item ${selected?.id === client.id ? "active" : ""}`}
                onClick={() => setSelected(client)}
              >
                <div className="wa-avatar">{initiales(client.nom)}</div>
                <div className="wa-contact-info">
                  <div className="wa-contact-name">{client.nom}</div>
                  <div className="wa-contact-sub">{client.email}</div>
                </div>
                {nb > 0 && <div className="wa-badge">{nb}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Zone chat ── */}
      <div className="wa-chat">
        {!selected ? (
          <div className="wa-chat-empty">
            <div className="wa-empty-icon">💬</div>
            <p>Sélectionnez un client pour voir ses commandes</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="wa-chat-header">
              <div className="wa-avatar">{initiales(selected.nom)}</div>
              <div className="wa-chat-header-info">
                <div className="wa-chat-header-name">{selected.nom}</div>
                <div className="wa-chat-header-sub">
                  {selected.email}
                  {selected.telephone && ` · 📞 ${selected.telephone}`}
                </div>
              </div>
              <button className="wa-create-btn" onClick={creerCommande}>
                + Nouvelle commande
              </button>
            </div>

            {/* Messages */}
            <div className="wa-messages">
              {/* Message d'accueil */}
              <div className="wa-msg received">
                <div>
                  👋 Client : <strong>{selected.nom}</strong>
                </div>
                <div style={{ color: "#8696a0", fontSize: "0.78rem", marginTop: 4 }}>
                  {selected.adresse ?? "Adresse non renseignée"}
                </div>
                <div className="wa-msg-time">info</div>
              </div>

              {cmdsClient.length === 0 ? (
                <div className="wa-msg received">
                  Aucune commande pour ce client.
                  <div className="wa-msg-time">—</div>
                </div>
              ) : (
                cmdsClient.map((cmd) => (
                  <div key={cmd.id} className="wa-msg sent">
                    <div className="wa-cmd-bubble">
                      <div className="cmd-id">Commande #{cmd.id}</div>
                      <div className="cmd-statut">
                        {STATUTS[cmd.statut] ?? cmd.statut}
                      </div>
                      <div className="cmd-date">
                        {new Date(cmd.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        {" · "}
                        {(cmd.commandeProduits ?? []).length} article(s)
                      </div>
                    </div>
                    <div className="wa-msg-time">
                      {new Date(cmd.created_at).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="wa-input-zone" onSubmit={handleSend}>
              <input
                placeholder='Tapez "commande" pour créer une commande...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="wa-send-btn">➤</button>
            </form>
          </>
        )}
      </div>

      {toast && <div className="wa-toast">{toast}</div>}
    </div>
  );
}
