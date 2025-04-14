import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import './AuthLayout.css';

const { Header, Content, Footer } = Layout;

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout className="auth-layout">
      <Header className="auth-header">
        <div className="logo" onClick={() => navigate('/')}>
          MeCAI
        </div>
        <LanguageSelector />
      </Header>
      <Content className="auth-content">
        <Row justify="center" align="middle" className="auth-row">
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            <Card bordered={false} className="auth-card">
              <Outlet />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer className="auth-footer">
        MeCAI ©{new Date().getFullYear()} - {t('footer.allRightsReserved')}
      </Footer>
    </Layout>
  );
};

export default AuthLayout; 