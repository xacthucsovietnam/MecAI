import React from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import './styles.css';

const { Option, OptGroup } = Select;

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: SelectOption[];
  groupName?: string;
  key?: string;
}

export interface SelectBoxProps {
  options?: SelectOption[];
  value?: string | string[] | number | number[];
  defaultValue?: string | string[] | number | number[];
  onChange?: (value: any, option: any) => void;
  onSearch?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  placeholderKey?: string;
  notFoundContent?: React.ReactNode;
  notFoundContentKey?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  size?: 'large' | 'middle' | 'small';
  maxTagCount?: number;
  maxTagTextLength?: number;
  className?: string;
  style?: React.CSSProperties;
  optionFilterProp?: string;
  optionLabelProp?: string;
  filterOption?: boolean | ((inputValue: string, option: any) => boolean);
  virtual?: boolean;
  translateOptions?: boolean;
  translationPrefix?: string;
  suffixIcon?: React.ReactNode;
  id?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options = [],
  value,
  defaultValue,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  placeholder,
  placeholderKey,
  notFoundContent,
  notFoundContentKey = 'noData',
  showSearch = true,
  allowClear = true,
  disabled = false,
  loading = false,
  mode,
  size = 'middle',
  maxTagCount,
  maxTagTextLength,
  className = '',
  style,
  optionFilterProp = 'label',
  optionLabelProp,
  filterOption = true,
  virtual = true,
  translateOptions = true,
  translationPrefix = 'selectBox',
  suffixIcon,
  id,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Translate placeholder and notFoundContent
  const translatedPlaceholder = placeholderKey ? t(`${translationPrefix}.placeholders.${placeholderKey}`) : placeholder;
  const translatedNotFoundContent = notFoundContentKey 
    ? t(`${translationPrefix}.messages.${notFoundContentKey}`) 
    : notFoundContent || t(`${translationPrefix}.messages.noData`);
  
  // Process options with translation if needed
  const processOptions = (optionsList: SelectOption[]) => {
    return optionsList.map(option => {
      // Translate option label if needed
      const translatedLabel = translateOptions && typeof option.label === 'string' && option.key
        ? t(`${translationPrefix}.options.${option.key}`)
        : option.label;
      
      // Process nested children if any
      const processedChildren = option.children ? processOptions(option.children) : undefined;
      
      return {
        ...option,
        label: translatedLabel,
        children: processedChildren,
      };
    });
  };
  
  const processedOptions = processOptions(options);
  
  // Group options by groupName if provided
  const groupedOptions: Record<string, SelectOption[]> = {};
  
  processedOptions.forEach(option => {
    if (option.groupName) {
      if (!groupedOptions[option.groupName]) {
        groupedOptions[option.groupName] = [];
      }
      groupedOptions[option.groupName].push(option);
    }
  });
  
  const hasGroups = Object.keys(groupedOptions).length > 0;
  
  // Render option nodes
  const renderOptions = (optionsList: SelectOption[]) => {
    return optionsList
      .filter(option => !option.groupName) // Filter out options that are already in groups
      .map(option => (
        <Option key={option.value} value={option.value} disabled={option.disabled} label={option.label}>
          {option.label}
        </Option>
      ));
  };
  
  // Render option groups
  const renderOptionGroups = () => {
    return Object.keys(groupedOptions).map(groupName => (
      <OptGroup key={groupName} label={groupName}>
        {groupedOptions[groupName].map(option => (
          <Option key={option.value} value={option.value} disabled={option.disabled} label={option.label}>
            {option.label}
          </Option>
        ))}
      </OptGroup>
    ));
  };
  
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSearch={onSearch}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={translatedPlaceholder}
      notFoundContent={loading ? <Spin size="small" /> : translatedNotFoundContent}
      showSearch={showSearch}
      allowClear={allowClear}
      disabled={disabled}
      loading={loading}
      mode={mode}
      size={size}
      maxTagCount={maxTagCount}
      maxTagTextLength={maxTagTextLength}
      className={classNames(
        'custom-select-box',
        `custom-select-box-${size}`,
        { 'custom-select-box-multiple': mode === 'multiple' || mode === 'tags' },
        className
      )}
      style={style}
      optionFilterProp={optionFilterProp}
      optionLabelProp={optionLabelProp}
      filterOption={filterOption}
      virtual={virtual}
      suffixIcon={suffixIcon}
      id={id}
      {...rest}
    >
      {hasGroups ? renderOptionGroups() : renderOptions(processedOptions)}
    </Select>
  );
};

export default SelectBox; 