import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  ShoppingOutlined,
  PlusOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useProductStore } from '../store/product';

import SearchFilterBar from '../components/SearchFilterBar';
import ProductList from '../components/ProductList';
import ProductGrid from '../components/ProductGrid';
import EmptyProductState from '../components/EmptyProductState';
import LoadingState from '../components/LoadingState';
import CarouselBanner from '../components/CarouselBanner';

const { Title, Text } = Typography;

const HomePage = () => {
  // Store access
  const { fetchProducts, products, loading, searchProducts } = useProductStore();

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers
  const handleSearch = (value) => setSearchQuery(value);
  const handleSortChange = (value) => setSortBy(value);
  const toggleViewMode = () => setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  const handleCategoryChange = (value) => setCategoryFilter(value);

  // Local sorting
  const sortProductsLocally = (productsToSort, sortOption) => {
    if (!productsToSort || productsToSort.length === 0) return [];

    const sorted = [...productsToSort];
    switch (sortOption) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  // Filter + sort
  const getFilteredProducts = () => {
    if (!products || products.length === 0) return [];

    let filtered = products;
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    return sortProductsLocally(filtered, sortBy);
  };

  const filteredProducts = getFilteredProducts();

  const renderProductDisplay = () => {
    if (loading) return <LoadingState />;
    if (!filteredProducts || filteredProducts.length === 0) {
      return <EmptyProductState hasFilters={searchQuery || categoryFilter !== 'all'} />;
    }

    return viewMode === 'list'
      ? <ProductList products={filteredProducts} />
      : <ProductGrid products={filteredProducts} />;
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Carousel Banner */}
      <div style={{ marginBottom: 32 }}>
        <CarouselBanner />
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <Title level={2} style={{ fontSize: 32, marginBottom: 12 }}>
          <ShoppingOutlined style={{ marginRight: 12 }} />
          Shop Our Collection
        </Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Discover our latest products and best deals
        </Text>
      </div>

      {/* Search & Filter Bar */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <SearchFilterBar
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
            />
          </Col>
          <Col
            xs={24}
            md={8}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              icon={viewMode === 'grid' ? <BarsOutlined /> : <AppstoreOutlined />}
              onClick={toggleViewMode}
              size="large"
              style={{ marginRight: 8 }}
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </Button>
            <Link to="/create">
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Add Product
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Product List/Grid Display */}
      {renderProductDisplay()}
    </div>
  );
};

export default HomePage;