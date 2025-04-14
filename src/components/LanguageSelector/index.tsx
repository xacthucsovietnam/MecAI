import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="language-selector">
      <GlobalOutlined className="language-icon" />
      <Select
        defaultValue={i18n.language}
        onChange={handleChange}
        options={[
          { value: 'en', label: 'English' },
          { value: 'vi', label: 'Tiếng Việt' },
        ]}
        variant="borderless"
        dropdownMatchSelectWidth={false}
        className="language-select"
      />
    </div>
  );
};

export default LanguageSelector; 