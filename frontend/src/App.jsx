import React, { useState } from 'react';
import { Layout, ConfigProvider, Button, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { SunFilled, MoonFilled } from '@ant-design/icons';
import Navbar from './components/Navbar';
import './index.css';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';

const { Content, Footer } = Layout;

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm, // Toggle between dark and light theme
      }}
    >
      <Layout
        style={{
          minHeight: '100vh',
          backgroundColor: isDark ? '#001529' : '#ffffff', // Set background color based on theme
        }}
      >
        <Navbar toggleTheme={toggleTheme} isDark={isDark} /> {/* Pass theme toggle function and state to Navbar */}
        <div
            style={{
              borderBottom: `1px solid ${isDark ? '#444' : '#ddd'}`,
              marginBottom: 16,
            }}
          />

        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          MERN Stack E-commerce ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
