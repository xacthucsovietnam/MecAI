import React from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CheckCircleFilled,
  InfoCircleFilled,
  WarningFilled,
  CloseCircleFilled,
  QuestionCircleFilled
} from '@ant-design/icons';
import './styles.css';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationConfig {
  message?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onClose?: () => void;
  key?: string;
  btn?: React.ReactNode;
  closeIcon?: React.ReactNode;
  messageKey?: string;
  descriptionKey?: string;
}

const getNotificationIcon = (type: NotificationType): React.ReactNode => {
  switch (type) {
    case 'success':
      return <CheckCircleFilled className="custom-notification-icon success" />;
    case 'info':
      return <InfoCircleFilled className="custom-notification-icon info" />;
    case 'warning':
      return <WarningFilled className="custom-notification-icon warning" />;
    case 'error':
      return <CloseCircleFilled className="custom-notification-icon error" />;
    default:
      return <QuestionCircleFilled className="custom-notification-icon info" />;
  }
};

const Notification = {
  open: (config: NotificationConfig) => {
    const { t } = useTranslation();

    // Translate message and description if keys are provided
    const translatedMessage = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message;
    
    const translatedDescription = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return notification.open({
      ...config,
      message: translatedMessage,
      description: translatedDescription,
      className: `custom-notification ${config.className || ''}`,
    });
  },

  success: (config: NotificationConfig) => {
    const { t } = useTranslation();

    // Translate message and description if keys are provided
    const translatedMessage = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.success');
    
    const translatedDescription = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return notification.success({
      ...config,
      message: translatedMessage,
      description: translatedDescription,
      icon: config.icon || getNotificationIcon('success'),
      className: `custom-notification custom-notification-success ${config.className || ''}`,
    });
  },

  info: (config: NotificationConfig) => {
    const { t } = useTranslation();

    // Translate message and description if keys are provided
    const translatedMessage = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.info');
    
    const translatedDescription = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return notification.info({
      ...config,
      message: translatedMessage,
      description: translatedDescription,
      icon: config.icon || getNotificationIcon('info'),
      className: `custom-notification custom-notification-info ${config.className || ''}`,
    });
  },

  warning: (config: NotificationConfig) => {
    const { t } = useTranslation();

    // Translate message and description if keys are provided
    const translatedMessage = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.warning');
    
    const translatedDescription = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return notification.warning({
      ...config,
      message: translatedMessage,
      description: translatedDescription,
      icon: config.icon || getNotificationIcon('warning'),
      className: `custom-notification custom-notification-warning ${config.className || ''}`,
    });
  },

  error: (config: NotificationConfig) => {
    const { t } = useTranslation();

    // Translate message and description if keys are provided
    const translatedMessage = config.messageKey 
      ? t(`notification.messages.${config.messageKey}`) 
      : config.message || t('notification.defaults.error');
    
    const translatedDescription = config.descriptionKey 
      ? t(`notification.descriptions.${config.descriptionKey}`) 
      : config.description;

    return notification.error({
      ...config,
      message: translatedMessage,
      description: translatedDescription,
      icon: config.icon || getNotificationIcon('error'),
      className: `custom-notification custom-notification-error ${config.className || ''}`,
    });
  },

  // Hàm để cấu hình mặc định cho tất cả các notifications
  config: (config: any) => {
    notification.config(config);
  },

  // Hàm để đóng notification theo key
  close: (key: string) => {
    notification.destroy(key);
  },

  // Hàm để đóng tất cả các notifications đang hiển thị
  destroy: () => {
    notification.destroy();
  },
};

export default Notification; 