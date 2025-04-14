import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import AppRouter from './router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import './App.css';

function App() {
  const { currentLanguage } = useLanguage();
  
  // Set Ant Design locale based on current language
  const antLocale = currentLanguage === 'vi' ? viVN : enUS;

  return (
    <ConfigProvider locale={antLocale}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
