import { useState, useEffect } from "react";
import "./css/product.css"
import api from "./services/api"
export default function ProductForm() {
  const [form, setForm] = useState({
    id: "",
    nom: "",
    description: "",
    price_before: "",
    price_after: "",
    id_fournisseur: 0,
    quantite_stock: 0,
    images: []
  });
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    api.get("/produits").then(res => setProduits(res.data?.data ?? res.data)).catch(() => {});
    api.get("/fournisseurs").then(res => setFournisseurs(res.data?.data ?? res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setForm(prev => ({ ...prev, images: files }));
      return;
    }

    const numFields = ["id_fournisseur", "quantite_stock", "price_before", "price_after"];
    const newVal = numFields.includes(name) ? Number(value) : value;

    setForm(prev => {
      const updated = { ...prev, [name]: newVal };
      if (name === "price_before" && Number(value) >= 1500) {
        updated.price_after = Number(value) * 1.04;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nom", form.nom);
    data.append("description", form.description);
    data.append("prix", form.price_after || form.price_before);
    data.append("quantite_stock", form.quantite_stock);
    data.append("id_fournisseur", form.id_fournisseur);
    for (let i = 0; i < form.images.length; i++) {
      data.append("images[]", form.images[i]);
    }
    try {
      const response = await api.post("/produits", data);
      setProduits(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Erreur ajout produit:", JSON.stringify(err.response?.data, null, 2));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Ajouter Produit 🛒</h2>

      <form onSubmit={handleSubmit} className="space-y-5" method="post">

        {/* ID + Name */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            placeholder="ID Produit"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="nom"
            placeholder="Nom du produit"
            className="border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description du produit"
          className="w-full border p-2 rounded"
          rows="4"
          onChange={handleChange}
        ></textarea>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price_before"
            placeholder="Prix avant (€)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price_after"
            placeholder="Prix après (€)"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <select
            name="id_fournisseur"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">-- Choisir fournisseur --</option>
            {fournisseurs.map(f => (
              <option key={f.id} value={f.id}>{f.nom}</option>
            ))}
          </select>


            <input
            type="number"
            name="quantite_stock"
            placeholder="quantite de stock"
            className="border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-medium">
            Images du produit
          </label>
          <input
            type="file"
            name="images"
            multiple
            className="w-full"
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Ajouter Produit
        </button>

      </form>

      {/* Liste des produits */}
      {produits.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Liste des Produits</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Prix</th>
                <th className="border p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {produits.map(p => (
                <tr key={p.id}>
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.nom}</td>
                  <td className="border p-2">{p.prix} €</td>
                  <td className="border p-2">{p.quantite_stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
