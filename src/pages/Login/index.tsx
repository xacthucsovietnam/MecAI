import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log('Login form submitted:', values);
    // Will be implemented with actual authentication logic
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
          <Button type="primary" htmlType="submit" size="large" block>
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