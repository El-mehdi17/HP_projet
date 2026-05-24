import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  setId_produit, setName, setImages, setPrix,
  setClient_name, setClient_email, setClient_status, setClient_description,
  setTechnicien_id, setTechnicien_name, setTechnicien_specialite, setTechnicien_tel,
} from "./redux";
import "./css/Remplir.css";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

const STATUTS_SAV = ["en_attente", "en_cours", "terminee"];
const COLORS = { en_attente: "#fef3c7", en_cours: "#dbeafe", terminee: "#dcfce7" };

export default function Remplir() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const [image, setImage] = useState(null);
  const [techniciens, setTechniciens] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [loadingTech, setLoadingTech] = useState(true);
  const [loadingSav, setLoadingSav] = useState(true);

  useEffect(() => {
    api.get("/techniciens")
      .then(res => setTechniciens(res.data?.data ?? res.data))
      .catch(console.error)
      .finally(() => setLoadingTech(false));

    api.get("/interventions")
      .then(res => setInterventions(res.data?.data ?? res.data))
      .catch(console.error)
      .finally(() => setLoadingSav(false));
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    dispatch(setImages(url));
  };

  const handleTechnicienSelect = (e) => {
    const id = Number(e.target.value);
    const t = techniciens.find(t => t.id === id);
    if (!t) return;
    dispatch(setTechnicien_id(t.id));
    dispatch(setTechnicien_name(`${t.nom} ${t.prenom}`));
    dispatch(setTechnicien_specialite(t.specialite ?? ""));
    dispatch(setTechnicien_tel(t.telephone ?? ""));
  };

  const changerStatutSav = async (id, statut) => {
    await api.put(`/interventions/${id}`, { statut });
    setInterventions(prev =>
      prev.map(i => (i.id_intervention === id ? { ...i, statut } : i))
    );
  };

  return (
    <>
      <h1>Remplir</h1>
      <div className="home">

        {/* ── Produit ── */}
        <h2>Produit</h2>
        <div className="file">
          <input type="file" accept="image/*" onChange={handleImage} />
          {image && <div className="image-preview"><img src={image} alt="Aperçu" /></div>}
        </div>

        <input type="text" placeholder="Id_produit" value={form.id_produit}
          onChange={e => dispatch(setId_produit(e.target.value))} />
        <input type="text" placeholder="Nom du produit" value={form.name}
          onChange={e => dispatch(setName(e.target.value))} />
        <input type="text" placeholder="Prix" value={form.prix}
          onChange={e => dispatch(setPrix(e.target.value))} />

        {/* ── SAV ── */}
        <h2>SAV</h2>
        <input type="text" placeholder="Nom du client" value={form.client_name}
          onChange={e => dispatch(setClient_name(e.target.value))} />
        <input type="text" placeholder="Email du client" value={form.client_email}
          onChange={e => dispatch(setClient_email(e.target.value))} />
        <input type="text" placeholder="STATUS" value={form.client_status}
          onChange={e => dispatch(setClient_status(e.target.value))} />
        <textarea placeholder="Description du problème" value={form.client_description}
          onChange={e => dispatch(setClient_description(e.target.value))} />

        {/* ── Technicien (depuis DB) ── */}
        <h2>Technicien</h2>

        {loadingTech ? (
          <p style={{ color: "#888", fontSize: "0.9rem" }}>Chargement des techniciens...</p>
        ) : (
          <select
            onChange={handleTechnicienSelect}
            defaultValue=""
            style={{ width: "100%", padding: "0.6rem", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: "0.5rem" }}
          >
            <option value="" disabled>-- Choisir un technicien --</option>
            {techniciens.map(t => (
              <option key={t.id} value={t.id}>
                {t.nom} {t.prenom} — {t.specialite}
              </option>
            ))}
          </select>
        )}

        <input type="text" placeholder="Id_tech" value={form.technicien_id}
          onChange={e => dispatch(setTechnicien_id(e.target.value))} />
        <input type="text" placeholder="Nom du technicien" value={form.technicien_name}
          onChange={e => dispatch(setTechnicien_name(e.target.value))} />
        <input type="text" placeholder="Spécialité" value={form.technicien_specialite}
          onChange={e => dispatch(setTechnicien_specialite(e.target.value))} />
        <input type="tel" placeholder="Numéro de téléphone" value={form.technicien_tel}
          onChange={e => dispatch(setTechnicien_tel(e.target.value))} />

        <input type="submit" value="Soumettre" />

        {/* ── Messages SAV (depuis contact.jsx / DB) ── */}
        <h2 style={{ marginTop: "2rem" }}>📬 Messages SAV</h2>
        {loadingSav ? (
          <p style={{ color: "#888", fontSize: "0.9rem" }}>Chargement...</p>
        ) : interventions.length === 0 ? (
          <p style={{ color: "#888", fontSize: "0.9rem" }}>Aucun message SAV.</p>
        ) : (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  {["#", "Commande", "Description", "Date", "Statut"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {interventions.map(i => (
                  <tr key={i.id_intervention} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 10px" }}>{i.id_intervention}</td>
                    <td style={{ padding: "8px 10px" }}>#{i.id_commande}</td>
                    <td style={{ padding: "8px 10px", maxWidth: 250 }}>{i.description}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
                      {new Date(i.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ padding: "8px 10px" }}>
                      <select
                        value={i.statut}
                        onChange={e => changerStatutSav(i.id_intervention, e.target.value)}
                        style={{ padding: "0.25rem 0.5rem", borderRadius: 5, border: "1px solid #d1d5db", background: COLORS[i.statut] ?? "#fff" }}
                      >
                        {STATUTS_SAV.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
