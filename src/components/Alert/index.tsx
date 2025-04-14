import React from 'react';
import { Alert as AntAlert } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import './styles.css';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  message?: React.ReactNode;
  description?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  closeText?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  banner?: boolean;
  messageKey?: string;
  descriptionKey?: string;
  action?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  showIcon = true,
  closable = false,
  closeText,
  icon,
  onClose,
  className = '',
  style,
  banner = false,
  messageKey,
  descriptionKey,
  action,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Translate the message and description if keys are provided
  const translatedMessage = messageKey ? t(`alert.messages.${messageKey}`) : message;
  const translatedDescription = descriptionKey ? t(`alert.descriptions.${descriptionKey}`) : description;
  
  // Translate close text if it's a string
  const translatedCloseText = typeof closeText === 'string' ? t(`alert.actions.${closeText}`) : closeText;
  
  return (
    <AntAlert
      type={type}
      message={translatedMessage}
      description={translatedDescription}
      showIcon={showIcon}
      closable={closable}
      closeText={translatedCloseText}
      icon={icon}
      onClose={onClose}
      className={classNames('custom-alert', `custom-alert-${type}`, className)}
      style={style}
      banner={banner}
      action={action}
      {...rest}
    />
  );
};

export default Alert; 