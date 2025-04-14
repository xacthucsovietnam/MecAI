import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { 
  FileProtectOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title level={2}>{t('dashboard.title')}</Title>
      
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('digitalAuth.title')}
              value={125}
              prefix={<FileProtectOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('digitalAuth.status') + ': ' + t('common.active')}
              value={98}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('digitalAuth.status') + ': ' + t('common.pending')}
              value={27}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title={t('dashboard.recentActivity')}>
            {/* Activity list will go here */}
            <p>{t('common.loading')}...</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 