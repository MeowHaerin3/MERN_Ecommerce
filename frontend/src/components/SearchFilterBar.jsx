import React from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

// Mock categories - in a real app, fetch these from an API or pass as props
const CATEGORIES = ['all', 'electronics', 'clothing', 'home', 'books'];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
  { value: 'rating', label: 'Highest Rated' }
];

const SearchFilterBar = ({ 
  onSearch, 
  onCategoryChange, 
  onSortChange,
  categoryFilter = 'all',
  sortBy = 'newest',
  categories = CATEGORIES
}) => {
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col xs={24} md={14}>
        <Search
          placeholder="Search products..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          style={{ width: '100%' }}
        />
      </Col>
      <Col xs={12} md={5}>
        <Select
          style={{ width: '100%' }}
          placeholder="Category"
          onChange={onCategoryChange}
          value={categoryFilter}
          size="large"
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={12} md={5}>
        <Select
          style={{ width: '100%' }}
          placeholder="Sort by"
          onChange={onSortChange}
          value={sortBy}
          size="large"
        >
          {SORT_OPTIONS.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default SearchFilterBar;