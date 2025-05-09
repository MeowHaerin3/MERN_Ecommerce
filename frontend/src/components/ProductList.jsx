import React from 'react';
import ProductListItem from './ProductListItem';

const ProductList = ({ 
  products, 
  onAddToCart,
  onEdit,
  onDelete
}) => {
  return (
    <div style={{ marginTop: 24 }}>
      {products.map((product) => (
        <ProductListItem 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;