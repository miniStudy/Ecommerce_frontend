import React from 'react';
import productDefaultImg from '../defaultimgs/default_img.png';

const ProductImage = ({ productImg }) => {
  return (
    <img 
      src={`http://127.0.0.1:8000${productImg}`}
      alt="Product"
      onError={(e) => {
        e.target.src = productDefaultImg; // Set the default image on error
      }}
      className="product_img"
    />
  );
};

export default ProductImage;
