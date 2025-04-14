import React from 'react';
import { Button as AntButton } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import * as Icons from '@ant-design/icons';
import './styles.css';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'link' | 'text';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonIconPosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Icons;
  iconPosition?: ButtonIconPosition;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: ButtonType;
  htmlType?: ButtonType;
  id?: string;
  buttonKey?: 'back' | 'confirm' | 'cancel' | 'accept' | 'submit' | string;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'middle',
  icon,
  iconPosition = 'left',
  block = false,
  disabled = false,
  loading = false,
  onClick,
  className,
  type = 'button',
  htmlType = 'button',
  id,
  buttonKey,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Get predefined text if buttonKey is provided
  let buttonText = children;
  if (buttonKey) {
    buttonText = t(`buttons.${buttonKey}`);
  }
  
  // Map our variants to Ant Design's types
  const getButtonType = (): "primary" | "link" | "text" | "default" | "dashed" => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'link':
        return 'link';
      case 'text':
        return 'text';
      default:
        return 'default';
    }
  };
  
  // Get predefined icon for button types
  const getButtonIcon = () => {
    if (icon) {
      const IconComponent = Icons[icon as keyof typeof Icons];
      return <IconComponent />;
    }
    
    if (buttonKey) {
      switch (buttonKey) {
        case 'back':
          return <Icons.ArrowLeftOutlined />;
        case 'confirm':
          return <Icons.CheckOutlined />;
        case 'cancel':
          return <Icons.CloseOutlined />;
        case 'accept':
          return <Icons.CheckCircleOutlined />;
        case 'submit':
          return <Icons.SendOutlined />;
        default:
          return null;
      }
    }
    
    return null;
  };
  
  const buttonIcon = getButtonIcon();
  
  // Apply danger style for danger variant
  const isDanger = variant === 'danger';
  
  return (
    <AntButton
      className={classNames(
        'custom-button',
        `custom-button-${variant}`,
        {
          'custom-button-block': block,
          [`custom-button-${size}`]: size,
        },
        className
      )}
      type={getButtonType()}
      danger={isDanger}
      size={size}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType as any}
      id={id}
      {...rest}
    >
      {buttonIcon && iconPosition === 'left' && (
        <span className="button-icon button-icon-left">{buttonIcon}</span>
      )}
      {buttonText}
      {buttonIcon && iconPosition === 'right' && (
        <span className="button-icon button-icon-right">{buttonIcon}</span>
      )}
    </AntButton>
  );
};

export default CustomButton; 