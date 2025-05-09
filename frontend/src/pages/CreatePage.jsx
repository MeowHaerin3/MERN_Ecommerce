import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Typography, message, Row, Col, notification } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import { useProductStore } from '../store/product';

const { Title } = Typography;

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductStore();

  const [api, contextHolder] = notification.useNotification(); // Hook for notification

  // Open notification for success
  const openNotification = () => {
    api.open({
      message: 'Product Created Successfully!',
      description: 'Your new product has been successfully added.',
      duration: 3, // Auto close after 3 seconds
      type: 'success',
      style: {
        backgroundColor:'#007d42',
        borderRadius: '8px',
        padding: '15px',
        fontWeight: '500'
      }
    });
  };  

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
  
    const productData = {
      ...values,
      image: values.image || null,
    };
  
    const { success, message: msg } = await createProduct(productData);
    console.log("Success:", success);
    console.log("Message:", msg);
  
    if (success) {
      openNotification(); // Call notification on success
      form.resetFields();
    } else {
      message.error(msg || 'Failed to create product.');
    }
  
    setLoading(false);
  };

  // Handle form errors
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form for errors!');
  };

  return (
    <div className="create-page" style={{ padding: '24px 0' }}>
      {contextHolder} {/* Add this to render the notification container */}
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14} xl={12}>
          <Card>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
              Create New Product
            </Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: 'Please enter product name!' }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
              
              <Form.Item
                name="price"
                label="Product Price"
                rules={[{ required: true, message: 'Please enter product price!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  precision={2}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Enter product price"
                />
              </Form.Item>
              
              <Form.Item
                name="image"
                label="Product Image URL"
                rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
              >
                <Input placeholder="Enter image URL (optional)" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusSquareFilled />}
                  size="large"
                  block
                  loading={loading}
                >
                  Create Product
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreatePage;