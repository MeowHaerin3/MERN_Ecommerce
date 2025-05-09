import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CategorySelect = ({ categories, onCategoryChange, categoryFilter }) => {
  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Category"
      onChange={onCategoryChange}
      value={categoryFilter}
      size="large"
    >
      {categories.map((category) => (
        <Option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
