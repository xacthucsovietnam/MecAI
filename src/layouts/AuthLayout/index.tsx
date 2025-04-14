import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Typography, Select, Switch, Button, Space, Dropdown } from 'antd';
import {
  TranslationOutlined,
  BulbOutlined,
  LeftOutlined,
  RightOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './styles.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface AuthLayoutProps {
  // Any specific props for AuthLayout
}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    localStorage.getItem('theme') === 'dark'
  );
  const [rtl, setRtl] = React.useState<boolean>(
    localStorage.getItem('direction') === 'rtl'
  );

  // Handle language change
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // If language is Arabic or other RTL languages, set direction to RTL
    if (value === 'ar') {
      setRtl(true);
      localStorage.setItem('direction', 'rtl');
      document.documentElement.dir = 'rtl';
    } else {
      setRtl(false);
      localStorage.setItem('direction', 'ltr');
      document.documentElement.dir = 'ltr';
    }
  };

  // Handle theme change
  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-mode', checked);
  };

  React.useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
    }

    // Initialize direction from localStorage or language
    const savedDirection = localStorage.getItem('direction');
    if (savedDirection) {
      setRtl(savedDirection === 'rtl');
      document.documentElement.dir = savedDirection;
    } else if (i18n.language === 'ar') {
      setRtl(true);
      document.documentElement.dir = 'rtl';
    }
  }, [i18n.language]);

  // Language dropdown items
  const languageItems = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'ar', label: 'العربية' },
    { key: 'fr', label: 'Français' },
    { key: 'es', label: 'Español' }
  ];

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <Layout className={`auth-layout ${isDarkMode ? 'dark' : 'light'} ${rtl ? 'rtl' : 'ltr'}`}>
      <Header className={`auth-header ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="header-left">
          <Link to="/" className="logo">
            <Title level={4}>MeCAI</Title>
          </Link>
        </div>
        <div className="header-right">
          <Space size="middle">
            {/* Theme Switch */}
            <div className="action-item">
              <Space>
                <BulbOutlined />
                <Switch
                  checked={isDarkMode}
                  onChange={handleThemeChange}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                />
              </Space>
            </div>
            
            {/* Direction Switch */}
            <div className="action-item">
              <Space>
                {rtl ? <RightOutlined /> : <LeftOutlined />}
                <Switch
                  checked={rtl}
                  onChange={(checked) => {
                    setRtl(checked);
                    localStorage.setItem('direction', checked ? 'rtl' : 'ltr');
                    document.documentElement.dir = checked ? 'rtl' : 'ltr';
                  }}
                />
              </Space>
            </div>
            
            {/* Language Selector */}
            <div className="action-item">
              <Dropdown
                menu={{
                  items: languageItems,
                  onClick: ({ key }) => handleLanguageChange(key)
                }}
                placement="bottomRight"
              >
                <Button type="text" icon={<GlobalOutlined />}>
                  {languageItems.find(item => item.key === i18n.language)?.label || 'English'}
                </Button>
              </Dropdown>
            </div>
          </Space>
        </div>
      </Header>

      <Content className={`auth-content ${isDarkMode ? 'dark' : 'light'}`}>
        <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
          <div className="auth-form-container">
            <Outlet />
          </div>
          <div className="auth-illustration">
            {/* Illustration or branding image can be placed here */}
            <img 
              src={isDarkMode ? "/auth-illustration-dark.svg" : "/auth-illustration-light.svg"} 
              alt="Authentication Illustration"
              className="auth-image"
            />
          </div>
        </div>
      </Content>

      <Footer className={`auth-footer ${isDarkMode ? 'dark' : 'light'}`}>
        <Text type="secondary">
          {t('footer.copyright', { year: currentYear, company: 'MeCAI' })}
        </Text>
        <div className="footer-links">
          <Link to="/terms">{t('footer.terms')}</Link>
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <Link to="/help">{t('footer.help')}</Link>
        </div>
      </Footer>
    </Layout>
  );
};

export default AuthLayout; 