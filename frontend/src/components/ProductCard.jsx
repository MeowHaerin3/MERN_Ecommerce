import React from 'react';
import { Card, Typography, Tooltip, Badge, Tag, Button, Divider, Popconfirm } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  ShoppingCartOutlined,
  HeartOutlined,
  StarFilled
} from '@ant-design/icons';

const { Text } = Typography;

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onAddToCart,
  onView,
  style,
  showActions = true,
  hoverable = true
}) => {
  const fallbackImage = "https://via.placeholder.com/240x160?text=No+Image";
  
  // Handle optional actions
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };
  
  const handleView = (e) => {
    e.stopPropagation();
    if (onView) onView(product.id);
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(product);
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(product.id);
  };

  // Calculate discount percentage if both prices are available
  const hasDiscount = product.originalPrice && product.price < product.originalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Render stars for rating
  const renderRating = () => {
    if (!product.rating) return null;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
        <div style={{ color: '#fadb14', display: 'flex', marginRight: 4 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarFilled 
              key={i} 
              style={{ 
                fontSize: '12px', 
                color: i < Math.round(product.rating) ? '#fadb14' : '#f0f0f0'
              }} 
            />
          ))}
        </div>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          ({product.reviewCount || 0})
        </Text>
      </div>
    );
  };

  // Card actions based on what functions are provided
  const cardActions = [];
  
  if (showActions) {
    if (onView) {
      cardActions.push(
        <Tooltip title="View Details" key="view">
          <EyeOutlined onClick={handleView} />
        </Tooltip>
      );
    }
    
    if (onAddToCart) {
      cardActions.push(
        <Tooltip title="Add to Cart" key="cart">
          <ShoppingCartOutlined onClick={handleAddToCart} />
        </Tooltip>
      );
    }
    
    if (onEdit) {
      cardActions.push(
        <Tooltip title="Edit Product" key="edit">
          <EditOutlined onClick={handleEdit} />
        </Tooltip>
      );
    }
    
    if (onDelete) {
      cardActions.push(
        <Popconfirm
          title="Delete this product?"
          description="This action cannot be undone"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
        >
          <Tooltip title="Delete Product" key="delete">
            <DeleteOutlined style={{ color: '#ff4d4f' }} />
          </Tooltip>
        </Popconfirm>
      );
    }
  }

  return (
    <Badge.Ribbon
      text={discountPercentage ? `${discountPercentage}% OFF` : null}
      color="red"
      style={{ display: discountPercentage ? 'block' : 'none' }}
    >
      <Card
        hoverable={hoverable}
        style={{
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          ...style
        }}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt={product.name}
              src={product.image || fallbackImage}
              style={{
                height: 180,
                width: '100%',
                objectFit: 'cover',
              }}
            />
            
            {/* Category tag */}
            {product.category && (
              <Tag 
                color="processing" 
                style={{ 
                  position: 'absolute', 
                  top: 10, 
                  left: 10,
                  borderRadius: '4px'
                }}
              >
                {product.category}
              </Tag>
            )}
            
            {/* Inventory status */}
            {product.inventory !== undefined && product.inventory <= 0 && (
              <div 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Tag color="error" style={{ fontSize: '16px', padding: '4px 8px' }}>
                  OUT OF STOCK
                </Tag>
              </div>
            )}
            
            {/* Wishlist button */}
            <Button
              type="default"
              shape="circle"
              icon={<HeartOutlined />}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        }
        actions={cardActions.length > 0 ? cardActions : undefined}
      >
        <div style={{ padding: '4px 0' }}>
          <Text strong ellipsis={{ tooltip: product.name }} style={{ fontSize: '16px', display: 'block' }}>
            {product.name}
          </Text>
          
          {renderRating()}
          
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
              ${Number(product.price).toFixed(2)}
            </Text>
            
            {hasDiscount && (
              <Text delete type="secondary" style={{ marginLeft: 8 }}>
                ${Number(product.originalPrice).toFixed(2)}
              </Text>
            )}
          </div>
          
          {product.description && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <Text type="secondary" ellipsis={{ rows: 2, tooltip: product.description }}>
                {product.description}
              </Text>
            </>
          )}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCard;