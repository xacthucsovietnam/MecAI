import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('common.pageNotFound', 'Sorry, the page you visited does not exist.')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('common.backHome', 'Back Home')}
        </Button>
      }
    />
  );
};

export default NotFound; 