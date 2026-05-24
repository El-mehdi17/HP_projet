import { useState, useEffect } from "react";
import "./css/produits.css";
import api from "./services/api";

// Données simulant une base de données
const produitsDB = [
  {
    id: 1,
    nom: "Carte Mère ASUS ROG",
    categorie: "Carte Mère",
    prix: 250,
    stock: 5,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    description: "Carte mère gaming haute performance, socket AM5, DDR5, PCIe 5.0.",
    marque: "ASUS",
    garantie: "3 ans",
  },
  {
    id: 2,
    nom: "Clavier Mécanique HP",
    categorie: "Clavier",
    prix: 85,
    stock: 12,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    description: "Clavier mécanique rétroéclairé RGB, switches Blue, anti-ghosting.",
    marque: "HP",
    garantie: "2 ans",
  },
  {
    id: 3,
    nom: "RAM DDR5 32GB",
    categorie: "Mémoire RAM",
    prix: 120,
    stock: 8,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    description: "Mémoire DDR5 32GB (2x16GB) 5600MHz, latence CL36, XMP 3.0.",
    marque: "Kingston",
    garantie: "À vie",
  },
  {
    id: 4,
    nom: "SSD NVMe 1TB",
    categorie: "Stockage",
    prix: 95,
    stock: 15,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
    description: "SSD NVMe PCIe 4.0, lecture 7000 MB/s, écriture 6500 MB/s.",
    marque: "Samsung",
    garantie: "5 ans",
  },
  {
    id: 5,
    nom: "Processeur Intel i7",
    categorie: "Processeur",
    prix: 380,
    stock: 3,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80",
    description: "Intel Core i7-13700K, 16 cœurs, 24 threads, jusqu'à 5.4 GHz.",
    marque: "Intel",
    garantie: "3 ans",
  },
  {
    id: 6,
    nom: "Souris Gaming HP",
    categorie: "Souris",
    prix: 45,
    stock: 20,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    description: "Souris gaming optique 16000 DPI, 7 boutons programmables, RGB.",
    marque: "HP",
    garantie: "1 an",
  },
];

export default function Produits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  let [h,setH]=useState([])
  const [selected, setSelected] = useState(null);

const fff = async () => {

  try {

    const response = await api.get("/players");

    console.log(response.data);

    setH(response.data);

    setLoading(false);

  } catch (error) {

    console.log(error);

  }

};

useEffect(()=>{
    fff()
},[])
  useEffect(() => {

    // Simule un appel à la base de données
    setTimeout(() => {
      setProduits(produitsDB);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <div className="loading">Chargement des produits...</div>;

  return (
    <div className="produits-page">
      <h2 className="produits-titre">Nos Produits</h2>
      <p></p>
      <div className="produits-grid">
        {produits.map((p) => (
          <div className="produit-card" key={p.id}>
            <img src={p.image} alt={p.nom} className="produit-img" />
            <div className="produit-info">
              <span className="produit-categorie">{p.categorie}</span>
              <h3 className="produit-nom">{p.nom}</h3>
              <p className="produit-prix">{p.prix*9.6} Dh</p>
              <button className="btn-details" onClick={() => setSelected(p)}>
                Voir les informations
              </button>

            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.image} alt={selected.nom} className="modal-img" />
            <div className="modal-body">
              <span className="produit-categorie">{selected.categorie}</span>
              <h2>{selected.nom}</h2>
              <p className="modal-desc">{selected.description}</p>
              <table className="modal-table">
                <tbody>
                  <tr><td>Marque</td><td>{selected.marque}</td></tr>
                  <tr><td>Prix</td><td><strong>{selected.prix} €</strong></td></tr>
                  <tr><td>Stock</td><td>{selected.stock} unités</td></tr>
                  <tr><td>Garantie</td><td>{selected.garantie}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}
