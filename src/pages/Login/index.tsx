import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../services/authApi';
import { useAppSelector } from '../../hooks/useRedux';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  // Get the path to redirect to after login
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    // If already authenticated, redirect to home page
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      await login({
        username: values.username,
        password: values.password,
      }).unwrap();
      
      message.success(t('notification.messages.loginSuccess'));
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      message.error(t('notification.messages.loginError'));
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        {t('auth.loginTitle')}
      </Title>
      
      <Divider />
      
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('validation.required') }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder={t('auth.emailPlaceholder')} 
            size="large"
          />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('validation.required') }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.passwordPlaceholder')}
            size="large"
          />
        </Form.Item>
        
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t('auth.rememberMe')}</Checkbox>
          </Form.Item>

          <Link to="/forgot-password" style={{ float: 'right' }}>
            {t('common.forgotPassword')}
          </Link>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block 
            loading={isLoading}
          >
            {t('common.login')}
          </Button>
        </Form.Item>
        
        <div style={{ textAlign: 'center' }}>
          <Text>
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/register">{t('common.register')}</Link>
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default Login; 