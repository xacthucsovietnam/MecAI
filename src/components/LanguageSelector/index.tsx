import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import useLanguage from '../../hooks/useLanguage';
import './style.css';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, languageOptions } = useLanguage();

  return (
    <div className="language-selector">
      <Select
        value={currentLanguage}
        onChange={(value) => changeLanguage(value)}
        options={languageOptions}
        bordered={false}
        suffixIcon={<GlobalOutlined />}
        className="language-select"
      />
    </div>
  );
};

export default LanguageSelector; 