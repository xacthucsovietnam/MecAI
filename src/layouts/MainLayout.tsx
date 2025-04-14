import React, { useMemo } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout } from '../features/auth/authSlice';
import type { MenuProps } from 'antd';
import './MainLayout.css';

const { Header, Footer } = Layout;

interface MainLayoutProps {
}

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: React.FC<MainLayoutProps> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };

  // Generate menu items based on authentication status
  const menuItems = useMemo<MenuItem[]>(() => {
    const items: MenuItem[] = [];
    
    // Home item
    items.push({
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">{t('menu.home')}</Link>,
    });
    
    // Dashboard item (only for authenticated users)
    if (isAuthenticated) {
      items.push({
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">{t('dashboard.title')}</Link>
      });
    }
    
    // Products submenu
    const productChildren: MenuItem[] = [];
    
    productChildren.push({
      key: '/products/public',
      label: <Link to="/products/public">{t('menu.publicProducts')}</Link>,
    });
    
    if (isAuthenticated) {
      productChildren.push({
        key: '/products/auth',
        label: <Link to="/products/auth">{t('menu.authProducts')}</Link>,
      });
    }
    
    items.push({
      key: 'products',
      icon: <ShoppingOutlined />,
      label: t('menu.products'),
      children: productChildren
    });
    
    // Logout item (only for authenticated users)
    if (isAuthenticated) {
      items.push({
        key: 'logout',
        icon: <LogoutOutlined />,
        label: t('common.logout'),
        onClick: handleLogout
      });
    }
    
    return items;
  }, [isAuthenticated, t, handleLogout]);

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <div className="logo" onClick={() => navigate('/')}>
          MeCAI
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="main-menu"
        />
        <div className="header-right">
          <LanguageSelector />
          {isAuthenticated ? (
            <Button type="primary" onClick={() => navigate('/profile')}>
              {t('common.profile')}
            </Button>
          ) : (
            <Button type="primary" onClick={handleLogin}>
              {t('common.login')}
            </Button>
          )}
        </div>
      </Header>
      <Layout className="site-layout">
        <div className="layout-content">
          <Outlet />
        </div>
        <Footer className="main-footer">
          <div className="footer-content">
            MeCAI ©{new Date().getFullYear()} - {t('footer.allRightsReserved')}
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 