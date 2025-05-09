import React from 'react';
import { Card, Badge, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const ProductGridItem = ({ 
  product, 
  onAddToCart, 
  onEdit,
  onDelete
}) => {
  // Handle action events with event propagation prevention
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(product);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(product.id);
  };

  // Card actions based on what functions are provided
  const cardActions = [];
  
  if (onAddToCart) {
    cardActions.push(
      <Button key="add" type="primary" size="small" icon={<ShoppingOutlined />} onClick={handleAddToCart}>
        Add to Cart
      </Button>
    );
  }
  
  cardActions.push(
    <Link key="view" to={`/product/${product.id}`}>View Details</Link>
  );
  
  if (onEdit) {
    cardActions.push(
      <Button key="edit" type="text" icon={<EditOutlined />} onClick={handleEdit}>
        Edit
      </Button>
    );
  }
  
  if (onDelete) {
    cardActions.push(
      <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete
      </Button>
    );
  }

  return (
    <Badge.Ribbon
      text={product.discount ? `${product.discount}% OFF` : null}
      color="red"
      style={{ display: product.discount ? 'block' : 'none' }}
    >
      <Card
        hoverable
        style={{
          height: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          transition: 'transform 0.3s ease',
        }}
        styles={{ padding: 16 }}
        cover={
          <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <img
              alt={product.name}
              src={product.image || 'https://via.placeholder.com/240x200?text=No+Image'}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px 12px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              {product.category && (
                <Text style={{ color: 'white', textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold' }}>
                  {product.category}
                </Text>
              )}
              {product.inStock === false && (
                <Badge count="Out of Stock" style={{ backgroundColor: '#ff4d4f' }} />
              )}
            </div>
          </div>
        }
        actions={cardActions.length > 0 ? cardActions : undefined}
      >
        <div style={{ minHeight: 80 }}>
          <Paragraph strong ellipsis={{ rows: 2 }} style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
            {product.name}
          </Paragraph>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5222d' }}>
              ${parseFloat(product.price).toFixed(2)}
            </Text>
            {product.discount && (
              <Text delete type="secondary" style={{ marginLeft: 8 }}>
                ${parseFloat(product.originalPrice).toFixed(2)}
              </Text>
            )}
          </div>
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                ({product.reviewCount || 0})
              </Text>
            </div>
          )}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductGridItem;