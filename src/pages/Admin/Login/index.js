import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import AdminHeader from '../../../components/AdminHeader';

const { Content } = Layout;

export default function Admin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('@admin-ninjastic/token');

    if (token) {
      history.push('/admin');
    }
  }, []);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    if (e.target.type === 'password' && e.key !== 'Enter') {
      return;
    }

    if (!password) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/admin/auth', { password });

      localStorage.setItem(
        '@admin-ninjastic/token',
        response.data.message.token
      );

      setLoading(false);
      history.push('/admin');
    } catch (error) {
      if (error.response.data && error.response.data.type === 'error') {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }
  }

  return (
    <Layout>
      <AdminHeader />
      <Layout>
        <Content style={{ paddingTop: 48 }}>
          <Form layout="vertical" style={{ maxWidth: 350, margin: 'auto' }}>
            <Form.Item label="Password">
              <Input
                type="password"
                size="large"
                onChange={handlePasswordChange}
                onKeyPress={handleLogin}
                value={password}
              />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
