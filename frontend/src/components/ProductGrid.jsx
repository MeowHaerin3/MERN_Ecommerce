import React from 'react';
import { Row, Col } from 'antd';
import ProductGridItem from './ProductGridItem';

const ProductGrid = ({ 
  products, 
  onAddToCart,
  onEdit,
  onDelete
}) => {
  return (
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <ProductGridItem 
            product={product} 
            onAddToCart={onAddToCart}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;