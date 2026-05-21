import React, { useState } from 'react';
import './Products.css';

const productsData = [
  {
    id: 1,
    name: 'Carte Mère ASUS ROG',
    category: 'CARTE MÈRE',
    price: '2400 Dh',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop',
    stock: '5 unités',
    garantie: '3 ans',
    description: 'Carte mère haut de gamme pour gaming extrême.'
  },
  {
    id: 2,
    name: 'Clavier Mécanique HP',
    category: 'CLAVIER',
    price: '816 Dh',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop',
    stock: '12 unités',
    garantie: '2 ans',
    description: 'Clavier mécanique rétroéclairé RGB, switches Blue, anti-ghosting.'
  },
  {
    id: 3,
    name: 'RAM DDR5 32GB',
    category: 'MÉMOIRE RAM',
    price: '1152 Dh',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop',
    stock: '20 unités',
    garantie: 'Garantie à vie',
    description: 'Mémoire ultra rapide pour des performances optimales.'
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="products-section" id="produits">
      <h2 className="section-title">Nos Produits</h2>
      
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card glass">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-content">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button 
                className="btn-info glass" 
                onClick={() => setSelectedProduct(product)}
              >
                Voir les informations
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Popup */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
            
            <div className="modal-header">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="modal-body">
              <span className="product-category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.description}</p>
              
              <div className="modal-details">
                <div className="detail-row">
                  <span>Marque</span>
                  <strong>{selectedProduct.name.split(' ')[selectedProduct.name.split(' ').length -1] || 'Generic'}</strong>
                </div>
                <div className="detail-row">
                  <span>Prix</span>
                  <strong>{selectedProduct.price}</strong>
                </div>
                <div className="detail-row">
                  <span>Stock</span>
                  <strong>{selectedProduct.stock}</strong>
                </div>
                <div className="detail-row">
                  <span>Garantie</span>
                  <strong>{selectedProduct.garantie}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
