import React from 'react';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';

const EmptyProductState = ({ 
  hasFilters = false,
  onClearFilters
}) => {
  return (
    <Empty
      style={{ margin: '40px 0' }}
      description={
        <span>
          {hasFilters
            ? 'No products match your search criteria'
            : 'No products available'}
        </span>
      }
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    >
      {hasFilters && onClearFilters && (
        <Button 
          icon={<FilterOutlined />} 
          onClick={onClearFilters}
          style={{ marginRight: 8 }}
        >
          Clear Filters
        </Button>
      )}
      
      <Link to="/create">
        <Button type="primary" icon={<PlusOutlined />}>
          Add New Product
        </Button>
      </Link>
    </Empty>
  );
};

export default EmptyProductState;