import React, { useState, useEffect } from 'react';
import { Table as AntTable, Row, Col, Empty, Radio, Dropdown, Button as AntButton, Menu, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { AppstoreOutlined, BarsOutlined, SettingOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import classNames from 'classnames';
import Button from '../Button';
import { Card } from '../Card';
import './styles.css';

export type TableViewMode = 'table' | 'card';
export type TableSize = 'small' | 'middle' | 'large';

export interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  visible?: boolean;
  sortable?: boolean;
  render?: (text: any, record: any, index: number) => React.ReactNode;
  width?: number | string;
  fixed?: boolean | 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  className?: string;
  sorter?: ((a: any, b: any) => number) | boolean | { compare: (a: any, b: any) => number; multiple: number };
  defaultSortOrder?: 'ascend' | 'descend';
  titleKey?: string;
}

export interface CardViewField {
  label: string;
  key: string;
  visible?: boolean;
  render?: (text: any, record: any, index: number) => React.ReactNode;
  span?: number;
  labelKey?: string;
}

export interface TableProps {
  columns: TableColumn[];
  dataSource: any[];
  cardFields?: CardViewField[];
  rowKey?: string;
  loading?: boolean;
  pagination?: any;
  size?: TableSize;
  scroll?: { x?: number | string; y?: number | string };
  bordered?: boolean;
  showHeader?: boolean;
  title?: (currentPageData: any[]) => React.ReactNode;
  footer?: (currentPageData: any[]) => React.ReactNode;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  onRow?: (record: any, index?: number) => any;
  rowClassName?: (record: any, index: number) => string;
  emptyText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  defaultViewMode?: TableViewMode;
  allowViewModeSwitch?: boolean;
  allowColumnCustomization?: boolean;
  allowSorting?: boolean;
  titleKey?: string;
  emptyTextKey?: string;
  cardLayout?: 'vertical' | 'horizontal';
  cardGutter?: [number, number];
  cardSpan?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
  showSorterTooltip?: boolean;
  sortDirections?: ('ascend' | 'descend')[];
  locale?: Record<string, any>;
  rowSelection?: any;
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  cardFields,
  rowKey = 'id',
  loading = false,
  pagination = { pageSize: 10, showSizeChanger: true },
  size = 'middle',
  scroll,
  bordered = false,
  showHeader = true,
  title,
  footer,
  onChange,
  onRow,
  rowClassName,
  emptyText,
  emptyTextKey = 'noData',
  className = '',
  style,
  defaultViewMode = 'table',
  allowViewModeSwitch = true,
  allowColumnCustomization = true,
  allowSorting = true,
  titleKey,
  cardLayout = 'vertical',
  cardGutter = [16, 16],
  cardSpan = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 },
  showSorterTooltip = true,
  sortDirections = ['ascend', 'descend'],
  locale,
  rowSelection,
  ...rest
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<TableViewMode>(defaultViewMode);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [visibleCardFields, setVisibleCardFields] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend');
  
  // Initialize visible columns and card fields
  useEffect(() => {
    const initialVisibleColumns = columns
      .filter(col => col.visible !== false)
      .map(col => col.key);
    setVisibleColumns(initialVisibleColumns);
    
    if (cardFields) {
      const initialVisibleCardFields = cardFields
        .filter(field => field.visible !== false)
        .map(field => field.key);
      setVisibleCardFields(initialVisibleCardFields);
    } else {
      // If cardFields not provided, use columns as default
      const defaultCardFields = columns
        .filter(col => col.visible !== false)
        .map(col => col.dataIndex);
      setVisibleCardFields(defaultCardFields);
    }
  }, [columns, cardFields]);
  
  // Translate column titles and card field labels
  const translateColumnTitle = (column: TableColumn) => {
    return column.titleKey ? t(`table.columns.${column.titleKey}`) : column.title;
  };
  
  const translateCardFieldLabel = (field: CardViewField) => {
    return field.labelKey ? t(`table.fields.${field.labelKey}`) : field.label;
  };
  
  // Filter columns based on visibility
  const getVisibleColumns = () => {
    return columns
      .filter(col => visibleColumns.includes(col.key))
      .map(col => ({
        ...col,
        title: translateColumnTitle(col),
      }));
  };
  
  // Get card fields for rendering
  const getCardFields = () => {
    if (cardFields) {
      return cardFields
        .filter(field => visibleCardFields.includes(field.key))
        .map(field => ({
          ...field,
          label: translateCardFieldLabel(field),
        }));
    }
    
    // Create card fields from columns if not provided
    return columns
      .filter(col => visibleCardFields.includes(col.dataIndex))
      .map(col => ({
        label: translateColumnTitle(col),
        key: col.dataIndex,
        render: col.render,
      }));
  };
  
  // Handle view mode change
  const handleViewModeChange = (e: RadioChangeEvent) => {
    setViewMode(e.target.value);
  };
  
  // Apply sorting to data
  const getSortedData = () => {
    if (!sortField || !allowSorting) return dataSource;
    
    return [...dataSource].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'ascend' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      // Handle number sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
      }
      
      // Default comparison
      return sortOrder === 'ascend' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue > bValue ? -1 : 1);
    });
  };
  
  // Empty text
  const translatedEmptyText = emptyTextKey ? t(`table.messages.${emptyTextKey}`) : emptyText || t('table.messages.noData');
  
  // Table title
  const translatedTitle = titleKey ? t(`table.titles.${titleKey}`) : undefined;
  
  // Render table view
  const renderTableView = () => {
    return (
      <AntTable
        columns={getVisibleColumns()}
        dataSource={getSortedData()}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        size={size}
        scroll={scroll}
        bordered={bordered}
        showHeader={showHeader}
        title={title || (titleKey ? () => translatedTitle : undefined)}
        footer={footer}
        onChange={onChange}
        onRow={onRow}
        rowClassName={rowClassName}
        locale={{ emptyText: translatedEmptyText }}
        className={classNames('custom-table', className)}
        style={style}
        showSorterTooltip={showSorterTooltip}
        sortDirections={sortDirections}
        rowSelection={rowSelection}
        {...rest}
      />
    );
  };
  
  // Render card view
  const renderCardView = () => {
    const fields = getCardFields();
    const sortedData = getSortedData();
    
    if (sortedData.length === 0) {
      return <Empty description={translatedEmptyText} />;
    }
    
    return (
      <Row gutter={cardGutter} className="custom-table-card-view">
        {sortedData.map((record, recordIndex) => (
          <Col key={record[rowKey] || recordIndex} {...cardSpan}>
            <Card
              className={classNames(
                'custom-table-card',
                rowClassName && rowClassName(record, recordIndex)
              )}
              hoverable
              onClick={() => onRow && onRow(record, recordIndex)}
              variant="default"
              bordered
              size="default"
            >
              <Row gutter={[8, 8]} className={`custom-table-card-content-${cardLayout}`}>
                {fields.map((field, fieldIndex) => (
                  <Col
                    key={fieldIndex}
                    span={field.span || (cardLayout === 'vertical' ? 24 : 12)}
                    className="custom-table-card-field"
                  >
                    <span className="custom-table-card-field-label">{field.label}:</span>
                    <span className="custom-table-card-field-value">
                      {field.render
                        ? field.render(record[field.key], record, recordIndex)
                        : record[field.key]}
                    </span>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  
  // Column customization menu
  const columnMenu = (
    <Menu>
      {columns.map(column => (
        <Menu.Item key={column.key}>
          <div className="custom-table-column-item">
            <input
              type="checkbox"
              checked={visibleColumns.includes(column.key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setVisibleColumns(prev => [...prev, column.key]);
                } else {
                  setVisibleColumns(prev => prev.filter(key => key !== column.key));
                }
              }}
            />
            <span>{translateColumnTitle(column)}</span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  
  // Sorting menu
  const sortingMenu = (
    <Menu>
      {columns.filter(col => col.sortable !== false).map(column => (
        <Menu.Item key={column.dataIndex}>
          <div className="custom-table-sort-item">
            <span>{translateColumnTitle(column)}</span>
            <Space>
              <AntButton
                size="small"
                type={sortField === column.dataIndex && sortOrder === 'ascend' ? 'primary' : 'default'}
                icon={<SortAscendingOutlined />}
                onClick={() => {
                  setSortField(column.dataIndex);
                  setSortOrder('ascend');
                }}
              />
              <AntButton
                size="small"
                type={sortField === column.dataIndex && sortOrder === 'descend' ? 'primary' : 'default'}
                icon={<SortDescendingOutlined />}
                onClick={() => {
                  setSortField(column.dataIndex);
                  setSortOrder('descend');
                }}
              />
            </Space>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  
  return (
    <div className="custom-table-container">
      {/* Table toolbar */}
      <div className="custom-table-toolbar">
        {title && title([])}
        {titleKey && <div className="custom-table-title">{translatedTitle}</div>}
        
        <div className="custom-table-actions">
          {allowSorting && (
            <Dropdown overlay={sortingMenu} trigger={['click']}>
              <Button 
                variant="secondary"
                size="small"
                icon="SettingOutlined"
                className="custom-table-action-button"
                buttonKey="sort"
              />
            </Dropdown>
          )}
          
          {allowColumnCustomization && (
            <Dropdown overlay={columnMenu} trigger={['click']}>
              <Button 
                variant="secondary"
                size="small"
                icon="SettingOutlined"
                className="custom-table-action-button"
                buttonKey="customize"
              />
            </Dropdown>
          )}
          
          {allowViewModeSwitch && (
            <Radio.Group
              value={viewMode}
              onChange={handleViewModeChange}
              optionType="button"
              buttonStyle="solid"
              size="small"
            >
              <Radio.Button value="table">
                <BarsOutlined /> {t('table.viewMode.table')}
              </Radio.Button>
              <Radio.Button value="card">
                <AppstoreOutlined /> {t('table.viewMode.card')}
              </Radio.Button>
            </Radio.Group>
          )}
        </div>
      </div>
      
      {/* Table content */}
      <div className="custom-table-content">
        {viewMode === 'table' ? renderTableView() : renderCardView()}
      </div>
    </div>
  );
};

export default Table; 