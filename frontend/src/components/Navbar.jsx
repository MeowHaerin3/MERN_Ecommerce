import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  Input,
  Drawer,
  Badge,
  Dropdown,
  Space,
  Avatar,
  Divider,
  Switch,
  Affix,
  Typography,
  theme
} from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PlusOutlined,
  BulbOutlined,
  BulbFilled,
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

const Navbar = ({ toggleTheme, isDark }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchDrawerVisible, setSearchDrawerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  
  // Use antd's built-in theme tokens
  const { token } = theme.useToken();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setDrawerVisible(false);
    setSearchDrawerVisible(false);
  }, [location]);

  const handleAddClick = () => {
    navigate('/create');
  };

  // Collections submenu
  const collectionsMenu = {
    items: [
      {
        key: 'new',
        label: (
          <Link to="/collections/new">
            <Space>
              <Badge dot color="#52c41a" />
              <span>New Arrivals</span>
            </Space>
          </Link>
        ),
      },
      {
        key: 'trending',
        label: (
          <Link to="/collections/trending">
            <Space>
              <Badge dot color="#f5222d" />
              <span>Trending Now</span>
            </Space>
          </Link>
        ),
      },
      {
        key: 'seasonal',
        label: (
          <Link to="/collections/seasonal">
            <Space>
              <Badge dot color="#1890ff" />
              <span>Seasonal Picks</span>
            </Space>
          </Link>
        ),
      },
    ],
  };

  // User account menu
  const userMenu = {
    items: [
      {
        key: 'account',
        icon: <UserOutlined />,
        label: <Link to="/account">My Account</Link>,
      },
      {
        key: 'orders',
        icon: <ShoppingCartOutlined />,
        label: <Link to="/orders">Orders</Link>,
      },
      {
        key: 'wishlist',
        icon: <HeartOutlined />,
        label: <Link to="/wishlist">Wishlist</Link>,
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: <Link to="/settings">Settings</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        danger: true,
      },
    ],
  };

  const headerStyle = {
    position: 'fixed',
    zIndex: 1000,
    width: '100%',
    padding: '0 24px',
    background: isDark 
      ? (scrolled ? 'rgba(0, 21, 41, 0.9)' : token.colorBgContainer) 
      : (scrolled ? 'rgba(255, 255, 255, 0.9)' : token.colorBgContainer),
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    boxShadow: scrolled ? (isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)') : 'none',
    transition: 'all 0.3s ease',
    height: 'auto',
    lineHeight: 'inherit',
  };

  // Active menu item determination
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return ['home'];
    if (path.includes('/shop')) return ['shop'];
    if (path.includes('/collections')) return ['collections'];
    if (path.includes('/about')) return ['about'];
    if (path.includes('/contact')) return ['contact'];
    return [];
  };

  return (
    <>
      <Header style={headerStyle}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '16px 0',
          }}
        >
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ marginRight: 24 }}>
              <Space className="logo">
                <Title level={4} style={{ margin: 0 }}>
                  SuperNOVA<Text type="success" strong>SHOP</Text>
                </Title>
              </Space>
            </Link>

            {/* Desktop Navigation */}
            <Menu
              mode="horizontal"
              selectedKeys={getSelectedKey()}
              style={{ 
                background: 'transparent', 
                border: 'none',
                display: 'none',
                '@media (min-width: 992px)': {
                  display: 'flex',
                },
              }}
              className="desktop-menu"
              items={[
                {
                  key: 'home',
                  icon: <HomeOutlined />,
                  label: <Link to="/">HOME</Link>,
                },
                {
                  key: 'shop',
                  icon: <ShopOutlined />,
                  label: <Link to="/shop">SHOP</Link>,
                },
                {
                  key: 'collections',
                  icon: <AppstoreOutlined />,
                  label: (
                    <Dropdown menu={collectionsMenu} placement="bottomCenter">
                      <span>
                        COLLECTIONS <DownOutlined style={{ fontSize: 10 }} />
                      </span>
                    </Dropdown>
                  ),
                },
                {
                  key: 'about',
                  icon: <InfoCircleOutlined />,
                  label: <Link to="/about">ABOUT</Link>,
                },
                {
                  key: 'contact',
                  icon: <PhoneOutlined />,
                  label: <Link to="/contact">CONTACT</Link>,
                },
              ]}
            />
          </div>

          {/* Right Side Controls */}
          <Space size="middle">
            {/* Search Button */}
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={() => setSearchDrawerVisible(true)}
              shape="circle"
              size="large"
              className="nav-icon-btn"
            />

            {/* Cart Button */}
            <Badge count={cartCount} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                onClick={() => navigate('/cart')}
                shape="circle"
                size="large"
                className="nav-icon-btn"
              />
            </Badge>

            {/* User Account */}
            <Dropdown menu={userMenu} placement="bottomRight">
              <Button
                type="text"
                icon={<UserOutlined />}
                shape="circle"
                size="large"
                className="nav-icon-btn"
              />
            </Dropdown>

            {/* Theme Toggler */}
            <Button
              type="text"
              icon={isDark ? <BulbFilled /> : <BulbOutlined />}
              onClick={toggleTheme}
              shape="circle"
              size="large"
              className="nav-icon-btn"
            />

            {/* Mobile Menu Button - Only visible on small screens */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              shape="circle"
              size="large"
              className="mobile-menu-btn"
            />
          </Space>
        </div>
      </Header>

      {/* Search Drawer */}
      <Drawer
        title={
          <Title level={4} style={{ margin: 0 }}>
            Search Products
          </Title>
        }
        placement="top"
        height="auto"
        onClose={() => setSearchDrawerVisible(false)}
        open={searchDrawerVisible}
        bodyStyle={{ paddingTop: 24 }}
        headerStyle={{ border: 'none' }}
        destroyOnClose
      >
        <Search
          placeholder="What are you looking for?"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            if (value) {
              navigate(`/search?q=${encodeURIComponent(value)}`);
              setSearchDrawerVisible(false);
            }
          }}
        />
        <div style={{ marginTop: 24 }}>
          <Text type="secondary">Popular searches:</Text>
          <div style={{ marginTop: 12 }}>
            <Space wrap>
              {['New Arrivals', 'Summer Sale', 'Bestsellers', 'Accessories'].map((tag) => (
                <Button key={tag} size="small" onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}>
                  {tag}
                </Button>
              ))}
            </Space>
          </div>
        </div>
      </Drawer>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <Space className="logo">
            <Title level={4} style={{ margin: 0 }}>
              NOVA<Text type="success" strong>SHOP</Text>
            </Title>
          </Space>
        }
        placement="right"
        width="80%"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
        closable={false}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setDrawerVisible(false)}
          />
        }
      >
        <Menu
          mode="vertical"
          selectedKeys={getSelectedKey()}
          style={{ border: 'none' }}
          items={[
            {
              key: 'home',
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: 'shop',
              icon: <ShopOutlined />,
              label: <Link to="/shop">Shop</Link>,
            },
            {
              key: 'collections',
              icon: <AppstoreOutlined />,
              label: 'Collections',
              children: [
                {
                  key: 'new',
                  label: <Link to="/collections/new">New Arrivals</Link>,
                },
                {
                  key: 'trending',
                  label: <Link to="/collections/trending">Trending Now</Link>,
                },
                {
                  key: 'seasonal',
                  label: <Link to="/collections/seasonal">Seasonal Picks</Link>,
                },
              ],
            },
            {
              key: 'about',
              icon: <InfoCircleOutlined />,
              label: <Link to="/about">About</Link>,
            },
            {
              key: 'contact',
              icon: <PhoneOutlined />,
              label: <Link to="/contact">Contact</Link>,
            },
          ]}
        />

        <Divider style={{ margin: '24px 0' }} />

        <div style={{ padding: '0 24px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              block 
              onClick={handleAddClick}
            >
              Add Product
            </Button>
            
            <Button 
              block 
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate('/cart')}
            >
              Cart ({cartCount})
            </Button>
            
            <Button 
              block 
              icon={<UserOutlined />}
              onClick={() => navigate('/account')}
            >
              My Account
            </Button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>Dark Mode</Text>
              <Switch 
                checked={isDark}
                onChange={toggleTheme}
                checkedChildren={<BulbFilled />}
                unCheckedChildren={<BulbOutlined />}  
              />
            </div>
          </Space>
        </div>
      </Drawer>

      {/* Spacer to prevent content from hiding under the fixed header */}
      <div style={{ height: 80 }} />

      {/* CSS for responsive design */}
      <style jsx>{`
        .desktop-menu {
          display: none;
        }
        
        .mobile-menu-btn {
          display: flex;
        }
        
        .add-product-btn {
          display: none;
        }
        
        .add-btn-text {
          display: none;
        }
        
        @media (min-width: 576px) {
          .add-product-btn {
            display: flex;
          }
          
          .add-btn-text {
            display: none;
          }
        }
        
        @media (min-width: 768px) {
          .add-btn-text {
            display: inline;
          }
        }
        
        @media (min-width: 992px) {
          .desktop-menu {
            display: flex;
          }
          
          .mobile-menu-btn {
            display: none;
          }
        }
        
        /* Animations */
        .logo {
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .logo:hover {
          transform: scale(1.05);
        }
        
        .nav-icon-btn {
          transition: all 0.3s ease;
        }
        
        .nav-icon-btn:hover {
          transform: translateY(-2px);
          color: ${isDark ? '#1890ff' : '#1890ff'};
        }
      `}</style>
    </>
  );
};

export default Navbar;