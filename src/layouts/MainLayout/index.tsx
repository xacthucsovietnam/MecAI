import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Switch, Dropdown, MenuProps } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  BulbOutlined, 
  SettingOutlined,
  GlobalOutlined,
  DashboardOutlined,
  IdcardOutlined,
  ShieldOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useUIComponents } from '../../hooks';
import './styles.css';

const { Header, Sider, Content, Footer } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>('left');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { Notification } = useUIComponents();

  // Set collapsed state based on device size
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  // Theme change effect
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleCollapsed = () => {
    if (isMobile) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    Notification.info({
      message: isDarkTheme ? t('theme.lightEnabled') : t('theme.darkEnabled'),
      duration: 2
    });
  };

  const toggleSidebarPosition = () => {
    setSidebarPosition(prev => prev === 'left' ? 'right' : 'left');
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    Notification.info({
      message: t('language.changed'),
      description: lang === 'vi' ? t('language.vietnamese') : t('language.english'),
      duration: 2
    });
  };

  const handleLogout = () => {
    // Implement logout logic
    Notification.success({
      messageKey: 'logoutSuccess',
      duration: 2
    });
    navigate('/login');
  };

  // Menu items for the sidebar
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: t('dashboard.title'),
    },
    {
      key: '/digitalauth',
      icon: <IdcardOutlined />,
      label: t('digitalAuth.title'),
      children: [
        {
          key: '/digitalauth/list',
          label: t('digitalAuth.list'),
        },
        {
          key: '/digitalauth/create',
          label: t('digitalAuth.create'),
        },
      ],
    },
    {
      key: '/security',
      icon: <ShieldOutlined />,
      label: t('security.title'),
    },
  ];

  // Dropdown menu items for user
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('user.profile'),
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('user.settings'),
      onClick: () => navigate('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
      onClick: handleLogout
    }
  ];

  // Dropdown menu items for language
  const languageMenuItems: MenuProps['items'] = [
    {
      key: 'vi',
      label: t('language.vietnamese'),
      onClick: () => handleLanguageChange('vi')
    },
    {
      key: 'en',
      label: t('language.english'),
      onClick: () => handleLanguageChange('en')
    }
  ];

  const renderSidebar = () => (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={256}
      className={`main-layout-sidebar ${isDarkTheme ? 'dark' : 'light'}`}
    >
      <div className="logo">
        <h2>{collapsed ? 'M' : 'MeCAI'}</h2>
      </div>
      <Menu
        theme={isDarkTheme ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['/digitalauth']}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
      <div className="sidebar-footer">
        <div className="sidebar-settings">
          <Switch
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
        </div>
      </div>
    </Sider>
  );

  return (
    <Layout className={`main-layout ${isDarkTheme ? 'dark' : 'light'}`}>
      {/* Mobile Drawer for Sidebar */}
      {isMobile && (
        <Drawer
          placement={sidebarPosition}
          closable={false}
          onClose={() => setIsMobileDrawerOpen(false)}
          visible={isMobileDrawerOpen}
          bodyStyle={{ padding: 0 }}
          width={256}
          className="mobile-sidebar-drawer"
        >
          {renderSidebar()}
        </Drawer>
      )}

      {/* Desktop Sidebar - Left Position */}
      {!isMobile && sidebarPosition === 'left' && renderSidebar()}

      <Layout className="site-layout">
        <Header className={`main-header ${isDarkTheme ? 'dark' : 'light'}`}>
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              className="trigger-button"
            />
          </div>
          <div className="header-right">
            <div className="header-actions">
              <Switch
                checkedChildren={t('sidebar.right')}
                unCheckedChildren={t('sidebar.left')}
                checked={sidebarPosition === 'right'}
                onChange={toggleSidebarPosition}
                className="action-item position-switch"
              />

              <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
                <Button type="text" icon={<GlobalOutlined />} className="action-item">
                  {i18n.language === 'vi' ? 'VI' : 'EN'}
                </Button>
              </Dropdown>

              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button type="text" icon={<UserOutlined />} className="action-item">
                  {t('user.account')}
                </Button>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content className={`main-content ${isDarkTheme ? 'dark' : 'light'}`}>
          <div className="content-container">
            <Outlet />
          </div>
        </Content>

        <Footer className={`main-footer ${isDarkTheme ? 'dark' : 'light'}`}>
          MeCAI © {new Date().getFullYear()} - {t('footer.copyright')}
        </Footer>
      </Layout>

      {/* Desktop Sidebar - Right Position */}
      {!isMobile && sidebarPosition === 'right' && renderSidebar()}
    </Layout>
  );
};

export default MainLayout; 