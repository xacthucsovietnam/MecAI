import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="logo" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          {t('common.welcome')}
        </div>
        <LanguageSelector />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          {/* Sidebar menu will go here */}
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MeCAI ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 