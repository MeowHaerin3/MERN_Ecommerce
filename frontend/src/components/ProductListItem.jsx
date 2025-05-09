import React from 'react';
import { Card, Row, Col, Typography, Button, Space, Tag, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductListItem = ({ 
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

  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Row gutter={16} align="middle">
        <Col xs={24} sm={8} md={6}>
          <div style={{ position: 'relative' }}>
            <img
              alt={product.name}
              src={product.image || 'https://via.placeholder.com/120x120?text=No+Image'}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 6,
              }}
            />
            {product.discount && (
              <div style={{
                position: 'absolute',
                top: 8,
                left: 8,
                background: '#ff4d4f',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 4,
                fontSize: 12
              }}>
                {product.discount}% OFF
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} sm={16} md={18}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {product.name}
                </Title>
                {product.inStock === false && (
                  <Tag color="error">Out of Stock</Tag>
                )}
              </div>
              
              {product.category && (
                <Tag color="processing" style={{ marginBottom: 8 }}>
                  {product.category}
                </Tag>
              )}
              
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f5222d' }}>
                  ${parseFloat(product.price).toFixed(2)}
                </Text>
                {product.discount && (
                  <Text delete type="secondary" style={{ marginLeft: 8 }}>
                    ${parseFloat(product.originalPrice).toFixed(2)}
                  </Text>
                )}
              </div>
              
              {product.rating && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, gap: 4 }}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                    ({product.reviewCount || 0})
                  </Text>
                </div>
              )}
              
              <Text style={{ display: 'block', marginTop: 8 }} ellipsis={{ rows: 2 }}>
                {product.description || 'No description available'}
              </Text>
            </div>
            
            <Space direction="vertical" size="small">
              {onAddToCart && (
                <Button 
                  type="primary" 
                  icon={<ShoppingOutlined />} 
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
              
              <Link to={`/product/${product.id}`}>
                <Button icon={<EyeOutlined />}>View Details</Button>
              </Link>
              
              {onEdit && (
                <Button 
                  icon={<EditOutlined />} 
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
              
              {onDelete && (
                <Popconfirm
                  title="Delete this product?"
                  description="This action cannot be undone"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />}>Delete</Button>
                </Popconfirm>
              )}
            </Space>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductListItem;