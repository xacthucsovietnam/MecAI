import React from 'react';
import { Modal as AntModal } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import Alert from '../Alert';
import classNames from 'classnames';
import './styles.css';

export type ModalSize = 'small' | 'middle' | 'large';
export type ModalType = 'default' | 'success' | 'info' | 'warning' | 'error';

interface CustomModalProps {
  visible: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okButtonProps?: Record<string, any>;
  cancelButtonProps?: Record<string, any>;
  confirmLoading?: boolean;
  footer?: React.ReactNode;
  width?: number | string;
  centered?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  className?: string;
  modalSize?: ModalSize;
  modalType?: ModalType;
  titleKey?: string;
  okTextKey?: string;
  cancelTextKey?: string;
  destroyOnClose?: boolean;
  afterClose?: () => void;
  alert?: {
    type: 'success' | 'info' | 'warning' | 'error';
    message?: React.ReactNode;
    description?: React.ReactNode;
    messageKey?: string;
    descriptionKey?: string;
    showIcon?: boolean;
  };
}

const getModalWidth = (size: ModalSize): number => {
  switch (size) {
    case 'small':
      return 420;
    case 'middle':
      return 600;
    case 'large':
      return 820;
    default:
      return 520;
  }
};

const Modal: React.FC<CustomModalProps> = ({
  visible,
  title,
  children,
  onOk,
  onCancel,
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
  confirmLoading = false,
  footer,
  width,
  centered = true,
  maskClosable = true,
  closable = true,
  className = '',
  modalSize = 'middle',
  modalType = 'default',
  titleKey,
  okTextKey = 'ok',
  cancelTextKey = 'cancel',
  destroyOnClose = true,
  afterClose,
  alert,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Translate title, okText, and cancelText if keys are provided
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  const translatedOkText = okTextKey ? t(`modal.buttons.${okTextKey}`) : okText || t('modal.buttons.ok');
  const translatedCancelText = cancelTextKey ? t(`modal.buttons.${cancelTextKey}`) : cancelText || t('modal.buttons.cancel');
  
  // Determine button type based on modal type
  const getOkButtonType = (): 'primary' | 'success' | 'warning' | 'danger' => {
    switch (modalType) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'primary';
    }
  };
  
  // Custom footer with our Button component
  const customFooter = footer === undefined ? (
    <div className="custom-modal-footer">
      <Button 
        buttonKey="cancel"
        onClick={onCancel}
        {...cancelButtonProps}
      >
        {translatedCancelText}
      </Button>
      <Button 
        variant={getOkButtonType()}
        buttonKey="confirm"
        onClick={onOk}
        loading={confirmLoading}
        {...okButtonProps}
      >
        {translatedOkText}
      </Button>
    </div>
  ) : footer;
  
  return (
    <AntModal
      open={visible}
      title={translatedTitle}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      footer={customFooter}
      width={width || getModalWidth(modalSize)}
      centered={centered}
      maskClosable={maskClosable}
      closable={closable}
      className={classNames(
        'custom-modal',
        `custom-modal-${modalSize}`,
        `custom-modal-${modalType}`,
        className
      )}
      destroyOnClose={destroyOnClose}
      afterClose={afterClose}
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
          className="custom-modal-alert"
        />
      )}
      {children}
    </AntModal>
  );
};

// Create common modal types for convenience
Modal.success = ({ title, content, titleKey, ...props }: any) => {
  const { t } = useTranslation();
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  return AntModal.success({
    title: translatedTitle,
    content,
    className: 'custom-modal custom-modal-success',
    ...props,
  });
};

Modal.error = ({ title, content, titleKey, ...props }: any) => {
  const { t } = useTranslation();
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  return AntModal.error({
    title: translatedTitle,
    content,
    className: 'custom-modal custom-modal-error',
    ...props,
  });
};

Modal.warning = ({ title, content, titleKey, ...props }: any) => {
  const { t } = useTranslation();
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  return AntModal.warning({
    title: translatedTitle,
    content,
    className: 'custom-modal custom-modal-warning',
    ...props,
  });
};

Modal.info = ({ title, content, titleKey, ...props }: any) => {
  const { t } = useTranslation();
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  return AntModal.info({
    title: translatedTitle,
    content,
    className: 'custom-modal custom-modal-info',
    ...props,
  });
};

Modal.confirm = ({ title, content, titleKey, okTextKey, cancelTextKey, ...props }: any) => {
  const { t } = useTranslation();
  const translatedTitle = titleKey ? t(`modal.titles.${titleKey}`) : title;
  const translatedOkText = okTextKey ? t(`modal.buttons.${okTextKey}`) : props.okText || t('modal.buttons.ok');
  const translatedCancelText = cancelTextKey ? t(`modal.buttons.${cancelTextKey}`) : props.cancelText || t('modal.buttons.cancel');
  
  return AntModal.confirm({
    title: translatedTitle,
    content,
    okText: translatedOkText,
    cancelText: translatedCancelText,
    className: 'custom-modal custom-modal-confirm',
    ...props,
  });
};

export default Modal; 