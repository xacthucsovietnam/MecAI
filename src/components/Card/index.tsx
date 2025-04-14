import React from 'react';
import { Card as AntCard } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Alert from '../Alert';
import './styles.css';

const { Meta } = AntCard;

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  onClick?: () => void;
  titleKey?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  alert?: {
    type: 'success' | 'info' | 'warning' | 'error';
    message?: React.ReactNode;
    description?: React.ReactNode;
    messageKey?: string;
    descriptionKey?: string;
    showIcon?: boolean;
  };
}

export interface CardMetaProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleKey?: string;
  descriptionKey?: string;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  extra,
  children,
  bordered = true,
  hoverable = false,
  loading = false,
  size = 'default',
  cover,
  actions,
  className = '',
  headStyle,
  bodyStyle,
  style,
  onClick,
  titleKey,
  variant = 'default',
  alert,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Translate the title if titleKey is provided
  const translatedTitle = titleKey ? t(`card.titles.${titleKey}`) : title;
  
  return (
    <AntCard
      title={translatedTitle}
      extra={extra}
      bordered={bordered}
      hoverable={hoverable}
      loading={loading}
      size={size}
      cover={cover}
      actions={actions}
      className={classNames(
        'custom-card',
        `custom-card-${variant}`,
        { 'custom-card-clickable': !!onClick },
        className
      )}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          description={alert.description}
          messageKey={alert.messageKey}
          descriptionKey={alert.descriptionKey}
          showIcon={alert.showIcon !== false}
          className="custom-card-alert"
        />
      )}
      {children}
    </AntCard>
  );
};

const CustomCardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className = '',
  titleKey,
  descriptionKey,
}) => {
  const { t } = useTranslation();
  
  // Translate the title and description if keys are provided
  const translatedTitle = titleKey ? t(`card.titles.${titleKey}`) : title;
  const translatedDescription = descriptionKey ? t(`card.descriptions.${descriptionKey}`) : description;
  
  return (
    <Meta
      avatar={avatar}
      title={translatedTitle}
      description={translatedDescription}
      className={`custom-card-meta ${className}`}
    />
  );
};

export { CustomCard as Card, CustomCardMeta as CardMeta };
export default { Card: CustomCard, Meta: CustomCardMeta }; 