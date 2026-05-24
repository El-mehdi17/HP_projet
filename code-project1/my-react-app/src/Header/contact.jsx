import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

const STATUTS = ["en_attente", "en_cours", "terminee"];

export default function Contact() {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  const charger = () => {
    api.get("/interventions")
      .then(res => setInterventions(res.data?.data ?? res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { charger(); }, []);

  const changerStatut = async (id, statut) => {
    await api.put(`/interventions/${id}`, { statut });
    setInterventions(prev => prev.map(i => i.id_intervention === id ? { ...i, statut } : i));
  };

  if (loading) return <p style={{ textAlign: "center", padding: "2rem" }}>Chargement...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>📬 Messages Service Après-Vente</h2>

      {interventions.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center" }}>Aucun message reçu.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={th}>#</th>
              <th style={th}>Commande</th>
              <th style={th}>Message client</th>
              <th style={th}>Date</th>
              <th style={th}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map(i => (
              <tr key={i.id_intervention} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{i.id_intervention}</td>
                <td style={td}>#{i.id_commande}</td>
                <td style={{ ...td, maxWidth: 300 }}>{i.description}</td>
                <td style={td}>{new Date(i.created_at).toLocaleDateString("fr-FR")}</td>
                <td style={td}>
                  <select
                    value={i.statut}
                    onChange={e => changerStatut(i.id_intervention, e.target.value)}
                    style={{ padding: "0.3rem 0.6rem", borderRadius: 6, border: "1px solid #d1d5db", background: colors[i.statut] }}
                  >
                    {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { padding: "0.7rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151" };
const td = { padding: "0.7rem 1rem", color: "#555" };
const colors = { en_attente: "#fef3c7", en_cours: "#dbeafe", terminee: "#dcfce7" };
