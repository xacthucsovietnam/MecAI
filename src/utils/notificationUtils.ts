import { Notification } from '../components';
import { NotificationConfig } from '../components/Notification';

export interface FormNotificationConfig {
  successMessage?: string;
  successDescription?: string;
  errorMessage?: string;
  errorDescription?: string;
  successMessageKey?: string;
  successDescriptionKey?: string;
  errorMessageKey?: string;
  errorDescriptionKey?: string;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  duration?: number;
}

/**
 * Hiển thị thông báo thành công khi submit form
 * @param config Cấu hình thông báo
 */
export const showFormSuccessNotification = (config: FormNotificationConfig) => {
  Notification.success({
    message: config.successMessage,
    description: config.successDescription,
    messageKey: config.successMessageKey || 'formSuccess',
    descriptionKey: config.successDescriptionKey,
    placement: config.placement || 'topRight',
    duration: config.duration || 4.5,
  });
};

/**
 * Hiển thị thông báo lỗi khi submit form
 * @param config Cấu hình thông báo
 * @param error Lỗi từ form hoặc API (tùy chọn)
 */
export const showFormErrorNotification = (config: FormNotificationConfig, error?: any) => {
  let errorDescription = config.errorDescription;
  
  // Nếu có error và là đối tượng có thuộc tính message
  if (error && typeof error === 'object' && error.message) {
    errorDescription = errorDescription || error.message;
  }
  
  Notification.error({
    message: config.errorMessage,
    description: errorDescription,
    messageKey: config.errorMessageKey || 'formError',
    descriptionKey: config.errorDescriptionKey,
    placement: config.placement || 'topRight',
    duration: config.duration || 4.5,
  });
};

/**
 * Hiển thị thông báo API
 * @param type Loại thông báo
 * @param config Cấu hình thông báo
 */
export const showApiNotification = (
  type: 'success' | 'error' | 'info' | 'warning',
  config: NotificationConfig
) => {
  switch (type) {
    case 'success':
      Notification.success(config);
      break;
    case 'error':
      Notification.error(config);
      break;
    case 'info':
      Notification.info(config);
      break;
    case 'warning':
      Notification.warning(config);
      break;
  }
};

export default {
  showFormSuccessNotification,
  showFormErrorNotification,
  showApiNotification,
}; 