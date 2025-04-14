import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider, message } from 'antd';
import { GoogleOutlined, FacebookOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './styles.css';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - in real app, this would be an API call
      if (values.email === 'demo@example.com' && values.password === 'password') {
        message.success(t('login.loginSuccess'));
        navigate('/dashboard');
      } else {
        message.error(t('login.invalidCredentials'));
      }
    } catch (error) {
      message.error(t('login.loginError'));
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    // Simulate social login
    setTimeout(() => {
      message.info(`${t('login.socialLoginAttempt')} ${provider}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Title level={2}>{t('login.welcomeBack')}</Title>
        <Text type="secondary">{t('login.pleaseSignIn')}</Text>
      </div>

      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('login.emailRequired') },
            { type: 'email', message: t('login.emailInvalid') }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder={t('login.emailPlaceholder')} 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('login.passwordRequired') }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder={t('login.passwordPlaceholder')} 
          />
        </Form.Item>

        <div className="login-form-options">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t('login.rememberMe')}</Checkbox>
          </Form.Item>

          <Link to="/auth/forgot-password" className="forgot-password-link">
            {t('login.forgotPassword')}
          </Link>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
            className="login-button"
          >
            {t('login.signIn')}
          </Button>
        </Form.Item>

        <div className="signup-option">
          <Text>{t('login.noAccount')} </Text>
          <Link to="/auth/register">{t('login.signUp')}</Link>
        </div>

        <Divider plain>{t('login.orContinueWith')}</Divider>

        <div className="social-login">
          <Button 
            icon={<GoogleOutlined />}
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
            className="social-button google"
          >
            Google
          </Button>
          <Button 
            icon={<FacebookOutlined />}
            onClick={() => handleSocialLogin('Facebook')}
            disabled={loading}
            className="social-button facebook"
          >
            Facebook
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login; 