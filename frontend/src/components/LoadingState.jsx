import React from 'react';
import { Spin } from 'antd';

const LoadingState = ({ tip = "Loading products..." }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <Spin size="large" tip={tip} />
    </div>
  );
};

export default LoadingState;