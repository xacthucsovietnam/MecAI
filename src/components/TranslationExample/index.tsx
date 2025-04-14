import React from 'react';
import { Typography, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const { Title, Text } = Typography;

const TranslationExample: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={2}>{t('common.welcome')}</Title>
        <LanguageSelector />
      </Space>
      
      <Space direction="vertical">
        <Text>{t('dashboard.title')}: {t('dashboard.summary')}</Text>
        <Text>{t('product.list')}</Text>
      </Space>
      
      <Space>
        <Button type="primary">{t('common.login')}</Button>
        <Button>{t('common.register')}</Button>
      </Space>
    </Space>
  );
};

export default TranslationExample; 