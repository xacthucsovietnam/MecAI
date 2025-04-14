import Notification, { NotificationConfig } from '../components/Notification';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook để sử dụng Notification với hỗ trợ ngôn ngữ
 * @returns Các hàm hiển thị notification với i18n đã được tích hợp
 */
const useNotification = () => {
  const { t } = useTranslation();

  const success = (config: NotificationConfig) => {
    const message = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.success');
    
    const description = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return Notification.success({
      ...config,
      message,
      description,
    });
  };

  const error = (config: NotificationConfig) => {
    const message = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.error');
    
    const description = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return Notification.error({
      ...config,
      message,
      description,
    });
  };

  const info = (config: NotificationConfig) => {
    const message = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.info');
    
    const description = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return Notification.info({
      ...config,
      message,
      description,
    });
  };

  const warning = (config: NotificationConfig) => {
    const message = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.warning');
    
    const description = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return Notification.warning({
      ...config,
      message,
      description,
    });
  };

  const open = (config: NotificationConfig) => {
    const message = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message;
    
    const description = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return Notification.open({
      ...config,
      message,
      description,
    });
  };

  /**
   * Hiển thị thông báo Form thành công
   */
  const formSuccess = (messageKey = 'formSuccess', descriptionKey?: string, duration = 4.5) => {
    return success({
      messageKey,
      descriptionKey,
      duration,
    });
  };

  /**
   * Hiển thị thông báo Form thất bại
   */
  const formError = (messageKey = 'formError', descriptionKey?: string, duration = 4.5) => {
    return error({
      messageKey,
      descriptionKey,
      duration,
    });
  };

  /**
   * Hiển thị thông báo API thành công
   */
  const apiSuccess = (messageKey = 'apiSuccess', descriptionKey?: string, duration = 4.5) => {
    return success({
      messageKey,
      descriptionKey,
      duration,
    });
  };

  /**
   * Hiển thị thông báo API thất bại
   */
  const apiError = (messageKey = 'apiError', errorMessage?: string, duration = 4.5) => {
    return error({
      messageKey,
      description: errorMessage,
      duration,
    });
  };

  return {
    success,
    error,
    info,
    warning,
    open,
    formSuccess,
    formError,
    apiSuccess,
    apiError,
    config: Notification.config,
    close: Notification.close,
    destroy: Notification.destroy,
  };
};

export default useNotification; 