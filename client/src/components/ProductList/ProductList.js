import React, { useState, useEffect } from 'react';
import './ProductList.css';

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:1337/products');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleCardClick = (productId) => {
    setExpandedProductId((prevId) => (prevId === productId ? null : productId));
  };

  const handleCloseClick = (event, productId) => {
    event.stopPropagation();
    setExpandedProductId(null);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          className={`product-card ${expandedProductId === product._id ? 'expanded' : ''}`}
          key={product._id}
          onClick={() => handleCardClick(product._id)}
        >
          <img src={product.image} alt={product.title} className="product-image" />
          <h1 className='product-price'>₹{product.price}</h1>
          <h2 className="product-title">{product.title}</h2>
          {expandedProductId === product._id && (
            <div className="product-details">
              <p className="product-description">{product.description}</p>
              <button className="close-button" onClick={(e) => handleCloseClick(e, product._id)}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
