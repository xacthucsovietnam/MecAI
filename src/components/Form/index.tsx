import React from 'react';
import { Form as AntForm, Input, InputNumber, DatePicker, Switch, Radio, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import SelectBox from '../SelectBox';
import Notification from '../Notification';
import './styles.css';

const { Item } = AntForm;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

export interface FormProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'middle' | 'large';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  form?: any;
  name?: string;
  children?: React.ReactNode;
  className?: string;
  scrollToFirstError?: boolean;
  requiredMark?: boolean | 'optional';
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  successMessageKey?: string;
  errorMessageKey?: string;
}

export interface FormItemProps {
  label?: React.ReactNode;
  name?: string;
  rules?: any[];
  children?: React.ReactNode;
  valuePropName?: string;
  className?: string;
  tooltip?: string;
  extra?: React.ReactNode;
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  dependencies?: string[];
}

export interface InputProps {
  placeholder?: string;
  type?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface TextAreaProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  allowClear?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const CustomForm: React.FC<FormProps> = ({
  layout = 'horizontal',
  size = 'middle',
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  initialValues,
  onFinish,
  onFinishFailed,
  form,
  name,
  children,
  className = '',
  scrollToFirstError = true,
  requiredMark = true,
  showSuccessNotification = false,
  showErrorNotification = false,
  successMessage,
  errorMessage,
  successMessageKey,
  errorMessageKey,
}) => {
  const handleFinish = (values: any) => {
    if (onFinish) {
      onFinish(values);
    }

    if (showSuccessNotification) {
      Notification.success({
        message: successMessage,
        messageKey: successMessageKey || 'formSuccess',
        duration: 3,
      });
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    if (onFinishFailed) {
      onFinishFailed(errorInfo);
    }

    if (showErrorNotification) {
      Notification.error({
        message: errorMessage,
        messageKey: errorMessageKey || 'formError',
        description: errorInfo.errorFields?.[0]?.errors?.[0],
        duration: 5,
      });
    }
  };

  return (
    <AntForm
      layout={layout}
      size={size}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={initialValues}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      form={form}
      name={name}
      className={`custom-form ${className}`}
      scrollToFirstError={scrollToFirstError}
      requiredMark={requiredMark}
    >
      {children}
    </AntForm>
  );
};

const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  rules,
  children,
  valuePropName,
  className = '',
  tooltip,
  extra,
  labelCol,
  wrapperCol,
  dependencies,
}) => {
  const { t } = useTranslation();
  
  // Translate the label
  const translatedLabel = label ? typeof label === 'string' ? t(`form.labels.${label}`) : label : undefined;
  
  // Translate the placeholder in children if it's an input
  let translatedChildren = children;
  
  if (React.isValidElement(children)) {
    const childProps = children.props as Record<string, any>;
    if (childProps.placeholder && typeof childProps.placeholder === 'string') {
      const newProps = {
        ...childProps,
        placeholder: t(`form.placeholders.${childProps.placeholder}`),
      };
      translatedChildren = React.cloneElement(children, newProps);
    }
  }
  
  return (
    <Item
      label={translatedLabel}
      name={name}
      rules={rules}
      valuePropName={valuePropName}
      className={`custom-form-item ${className}`}
      tooltip={tooltip}
      extra={extra}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      dependencies={dependencies}
    >
      {translatedChildren}
    </Item>
  );
};

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  type = 'text',
  size = 'middle',
  disabled = false,
  addonBefore,
  addonAfter,
  prefix,
  suffix,
  allowClear = true,
  maxLength,
  value,
  onChange,
  onPressEnter,
  className = '',
}) => {
  const { t } = useTranslation();
  const translatedPlaceholder = placeholder ? t(`form.placeholders.${placeholder}`) : undefined;
  
  return (
    <Input
      placeholder={translatedPlaceholder}
      type={type}
      size={size}
      disabled={disabled}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      prefix={prefix}
      suffix={suffix}
      allowClear={allowClear}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      className={`custom-input ${className}`}
    />
  );
};

const CustomTextArea: React.FC<TextAreaProps> = ({
  placeholder,
  size = 'middle',
  disabled = false,
  allowClear = true,
  rows = 4,
  autoSize,
  maxLength,
  value,
  onChange,
  className = '',
}) => {
  const { t } = useTranslation();
  const translatedPlaceholder = placeholder ? t(`form.placeholders.${placeholder}`) : undefined;
  
  return (
    <TextArea
      placeholder={translatedPlaceholder}
      disabled={disabled}
      allowClear={allowClear}
      rows={rows}
      autoSize={autoSize}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={`custom-textarea ${className} custom-textarea-${size}`}
    />
  );
};

export {
  CustomForm as Form,
  FormItem,
  CustomInput as Input,
  CustomTextArea as TextArea,
  InputNumber,
  DatePicker,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  SelectBox,
};

export default {
  Form: CustomForm,
  Item: FormItem,
  Input: CustomInput,
  TextArea: CustomTextArea,
  InputNumber,
  DatePicker,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  SelectBox,
}; 