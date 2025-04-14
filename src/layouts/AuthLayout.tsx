import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const { Header, Content, Footer } = Layout;

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="logo" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          {t('common.welcome')}
        </div>
        <LanguageSelector />
      </Header>
      <Content style={{ padding: '50px 0' }}>
        <Row justify="center" align="middle">
          <Col xs={22} sm={16} md={12} lg={8}>
            <Card bordered={false} style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              <Outlet />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        MeCAI ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AuthLayout; 