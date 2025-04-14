# Hệ Thống Xác Thực Số - Frontend

Dự án Frontend cho hệ thống Xác Thực Số, được xây dựng với các công nghệ hiện đại.

## Công Nghệ Sử Dụng

- React + TypeScript
- Vite (Công cụ build nhanh)
- Ant Design (UI framework)
- Redux Toolkit (Quản lý state)
- RTK Query (Data fetching & caching)
- React Router (Điều hướng)
- i18next + react-i18next (Đa ngôn ngữ: Tiếng Việt & Tiếng Anh)

## Cài Đặt

```bash
# Cài đặt dependencies
npm install

# Khởi chạy môi trường development
npm run dev

# Build cho production
npm run build

# Preview bản build
npm run preview
```

## Cấu Trúc Dự Án

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

## Tính Năng

- Xác thực người dùng (Đăng nhập/Đăng ký)
- Quản lý xác thực số
- Đa ngôn ngữ (Tiếng Việt/Tiếng Anh)
- Giao diện responsive
- Dark/Light theme

## Liên Hệ

Vui lòng liên hệ [contact@example.com](mailto:contact@example.com) để biết thêm thông tin.
