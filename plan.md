# Kế Hoạch Phát Triển Dự Án Frontend Xác Thực Số

## Phần 1: Thiết Lập Dự Án --> OK

### Bước 1: Khởi tạo dự án với Vite và TypeScript --> OK

**Mô tả:** Tạo một dự án React mới sử dụng Vite với template TypeScript.

**Thực hiện:**
```bash
npm create vite@latest . -- --template react-ts
npm install
```

**Prompt:** "Khởi tạo dự án React + TypeScript mới sử dụng Vite với tên mecai-auth-frontend"

### Bước 2: Cài đặt các dependencies cần thiết --> OK

**Mô tả:** Cài đặt tất cả các thư viện cần thiết cho dự án.

**Thực hiện:**
```bash
# UI Library
npm install antd @ant-design/icons

# State Management
npm install @reduxjs/toolkit react-redux

# Routing
npm install react-router-dom

# Internationalization
npm install i18next react-i18next i18next-browser-languagedetector

# HTTP Client
npm install axios

# Utility
npm install dayjs classnames
```

**Prompt:** "Cài đặt các thư viện cần thiết cho dự án bao gồm Ant Design, Redux Toolkit, React Router, i18next và các tiện ích khác"

### Bước 3: Thiết lập cấu trúc thư mục dự án --> OK

**Mô tả:** Tạo các thư mục chính để tổ chức mã nguồn.

**Thực hiện:**
```bash
mkdir -p src/{assets,components,features,hooks,layouts,locales,pages,router,services,store,types,utils}
```

**Cấu trúc thư mục:**
```
src/
├── assets/         # Hình ảnh, fonts, và các tài nguyên tĩnh
├── components/     # Components dùng chung 
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── locales/        # Tài nguyên ngôn ngữ 
├── pages/          # Các trang ứng dụng
├── router/         # Cấu hình định tuyến
├── services/       # RTK Query services
├── store/          # Redux store setup
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

**Prompt:** "Tạo cấu trúc thư mục cho dự án theo mô hình đã định nghĩa trong README.md"

### Bước 4: Cấu hình TypeScript và Vite --> OK

**Mô tả:** Cập nhật tsconfig.json và vite.config.ts với các cài đặt phù hợp.

**Thực hiện:**
1. Chỉnh sửa `tsconfig.json` để thêm các đường dẫn alias và cấu hình TypeScript.
2. Cập nhật `vite.config.ts` để hỗ trợ các alias và các cấu hình build.

**Prompt:** "Cấu hình tsconfig.json và vite.config.ts với các đường dẫn alias và các cài đặt phù hợp cho dự án"

## Phần 2: Thiết Lập Redux, i18n và Routing

### Bước 5: Thiết lập Redux Toolkit và RTK Query --> OK

**Mô tả:** Cấu hình Redux store và các RTK Query services để quản lý state và gọi API.

**Thực hiện:**
1. Tạo cấu trúc Redux store trong thư mục `src/store`:
   - `src/store/index.ts`: Cấu hình Redux store
   - `src/store/rootReducer.ts`: Kết hợp tất cả reducers

2. Thiết lập RTK Query trong thư mục `src/services`:
   - `src/services/apiSlice.ts`: Base API slice cho RTK Query
   - `src/services/authApi.ts`: Service cho xác thực

**Cấu trúc mã nguồn cho Redux:**
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { apiSlice } from '../services/apiSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Prompt:** "Thiết lập Redux Toolkit và RTK Query cho dự án, bao gồm cấu hình store và base API slice"

### Bước 6: Thiết lập i18next cho đa ngôn ngữ --> OK

**Mô tả:** Cấu hình i18next để hỗ trợ Tiếng Việt và Tiếng Anh, với mặc định là Tiếng Việt.

**Thực hiện:**
1. Tạo các file ngôn ngữ trong thư mục `src/locales`:
   - `src/locales/vi/translation.json`: File dịch Tiếng Việt
   - `src/locales/en/translation.json`: File dịch Tiếng Anh

2. Thiết lập i18next trong `src/locales/i18n.ts`

3. Tạo hook custom để chuyển đổi ngôn ngữ trong `src/hooks/useLanguage.ts`

**Cấu trúc mã nguồn cho i18n:**
```typescript
// src/locales/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationVI from './vi/translation.json';
import translationEN from './en/translation.json';

const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

**Prompt:** "Thiết lập i18next cho đa ngôn ngữ (Tiếng Việt và Tiếng Anh) với các file ngôn ngữ và custom hook để chuyển đổi ngôn ngữ"

### Bước 7: Thiết lập React Router --> OK

**Mô tả:** Cấu hình React Router để quản lý điều hướng trong ứng dụng.

**Thực hiện:**
1. Tạo cấu trúc router trong thư mục `src/router`:
   - `src/router/routes.tsx`: Định nghĩa tất cả các routes
   - `src/router/PrivateRoute.tsx`: Component bảo vệ routes cần xác thực
   - `src/router/PublicRoute.tsx`: Component cho routes công khai

2. Tích hợp router vào `App.tsx`

**Cấu trúc mã nguồn cho Router:**
```typescript
// src/router/routes.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy-loaded components
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute element={<DashboardPage />} />,
  },
  {
    path: '/login',
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: '/register',
    element: <PublicRoute element={<RegisterPage />} />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
```

**Prompt:** "Thiết lập React Router với các routes chính, bao gồm private routes và public routes"

## Phần 3: Phát Triển UI Components và Layouts

### Bước 8: Xây dựng Components dùng chung  --> OK

**Mô tả:** Phát triển các components UI dùng chung trong toàn bộ ứng dụng.

**Thực hiện:**
1. Tạo các base components trong thư mục `src/components`:
   - `src/components/Button`: Button component với các biến thể
   - `src/components/Form`: Form components (Input, Select, etc.)
   - `src/components/Card`: Card component cho hiển thị thông tin
   - `src/components/Alert`: Alert component cho thông báo
   - `src/components/Modal`: Modal component cho dialog
   - `src/components/Table`: Table component cho hiển thị dữ liệu

2. Tạo các interface TypeScript cho components trong `src/types`

**Ví dụ mã nguồn cho Button component:**
```typescript
// src/components/Button/index.tsx
import React from 'react';
import { Button as AntButton } from 'antd';
import classNames from 'classnames';
import { ButtonProps } from '../../types/components';
import './Button.css';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'middle',
  ...rest 
}) => {
  return (
    <AntButton
      className={classNames('custom-button', `custom-button-${variant}`, className)}
      size={size}
      {...rest}
    >
      {children}
    </AntButton>
  );
};

export default Button;
```

**Prompt:** "Phát triển các common UI components dùng chung cho ứng dụng dựa trên Ant Design, bao gồm Button, Form, Card, Alert, Modal và Table components"

### Bước 9: Xây dựng Layouts --> OK

**Mô tả:** Phát triển các layout chính cho ứng dụng.

**Thực hiện:**
1. Tạo các layout trong thư mục `src/layouts`:
   - `src/layouts/MainLayout.tsx`: Layout chính cho người dùng đã đăng nhập
   - `src/layouts/AuthLayout.tsx`: Layout cho trang đăng nhập/đăng ký
   - `src/layouts/ErrorLayout.tsx`: Layout cho trang lỗi

2. Tích hợp các layout với React Router

**Ví dụ mã nguồn cho MainLayout:**
```typescript
// src/layouts/MainLayout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Layout className="main-layout">
      <Header />
      <Layout>
        <Sidebar />
        <Layout>
          <Content className="main-content">
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
```

**Prompt:** "Phát triển các layouts chính cho ứng dụng bao gồm MainLayout, AuthLayout và ErrorLayout, và tích hợp với React Router"

## Phần 4: Phát Triển Tính Năng Xác Thực

### Bước 10: Phát triển tính năng Đăng nhập

**Mô tả:** Xây dựng trang và logic đăng nhập.

**Thực hiện:**
1. Tạo API service cho authentication trong `src/services/authApi.ts`
2. Tạo slice redux cho quản lý auth state trong `src/features/auth/authSlice.ts`
3. Phát triển Login page trong `src/pages/Login/index.tsx`

**Prompt:** "Phát triển tính năng đăng nhập bao gồm API service, Redux slice và trang Login với form đăng nhập"

### Bước 11: Phát triển tính năng Đăng ký

**Mô tả:** Xây dựng trang và logic đăng ký.

**Thực hiện:**
1. Mở rộng auth service để hỗ trợ đăng ký
2. Phát triển Register page trong `src/pages/Register/index.tsx`

**Prompt:** "Phát triển tính năng đăng ký bao gồm mở rộng auth service và trang Register với form đăng ký"

### Bước 12: Phát triển tính năng Quên mật khẩu

**Mô tả:** Xây dựng trang và logic quên mật khẩu.

**Thực hiện:**
1. Mở rộng auth service để hỗ trợ quên mật khẩu
2. Phát triển ForgotPassword page trong `src/pages/ForgotPassword/index.tsx`

**Prompt:** "Phát triển tính năng quên mật khẩu bao gồm mở rộng auth service và trang ForgotPassword"

## Phần 5: Phát Triển Tính Năng Xác Thực Số

### Bước 13: Phát triển Dashboard

**Mô tả:** Xây dựng trang Dashboard để hiển thị tổng quan về các xác thực số.

**Thực hiện:**
1. Tạo API service cho xác thực số trong `src/services/digitalAuthApi.ts`
2. Phát triển Dashboard page trong `src/pages/Dashboard/index.tsx`

**Prompt:** "Phát triển trang Dashboard hiển thị tổng quan về các xác thực số với các biểu đồ và bảng dữ liệu"

### Bước 14: Phát triển tính năng Quản lý xác thực số

**Mô tả:** Xây dựng các trang để quản lý xác thực số.

**Thực hiện:**
1. Phát triển trang danh sách xác thực số trong `src/pages/DigitalAuth/List.tsx`
2. Phát triển trang tạo mới xác thực số trong `src/pages/DigitalAuth/Create.tsx`
3. Phát triển trang chi tiết xác thực số trong `src/pages/DigitalAuth/Details.tsx`

**Prompt:** "Phát triển tính năng quản lý xác thực số bao gồm trang danh sách, tạo mới và chi tiết xác thực số"

## Phần 6: Hoàn Thiện và Triển Khai

### Bước 15: Tối ưu hóa ứng dụng

**Mô tả:** Tối ưu hiệu suất và trải nghiệm người dùng.

**Thực hiện:**
1. Thêm code splitting và lazy loading
2. Tối ưu hóa build với Vite
3. Thêm Error Boundary
4. Cấu hình PWA (nếu cần)

**Prompt:** "Tối ưu hóa ứng dụng với code splitting, lazy loading, error boundary và tối ưu build"

### Bước 16: Kiểm thử

**Mô tả:** Thêm kiểm thử cho ứng dụng.

**Thực hiện:**
1. Cài đặt các dependencies kiểm thử: Vitest, React Testing Library
2. Viết unit tests cho components và hooks
3. Viết integration tests cho các tính năng chính

**Prompt:** "Thêm unit tests và integration tests cho ứng dụng sử dụng Vitest và React Testing Library"

### Bước 17: Triển khai ứng dụng

**Mô tả:** Chuẩn bị và triển khai ứng dụng lên môi trường production.

**Thực hiện:**
1. Cấu hình biến môi trường cho các môi trường khác nhau
2. Build ứng dụng cho production
3. Triển khai lên hosting service (Netlify, Vercel, etc.)

**Prompt:** "Chuẩn bị và triển khai ứng dụng lên môi trường production, bao gồm cấu hình biến môi trường và hướng dẫn build" 