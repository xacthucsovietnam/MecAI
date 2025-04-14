import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Input, 
  Form, 
  Select, 
  Card, 
  Button, 
  Empty, 
  Spin, 
  Alert,
  Table,
  Tag,
  Image
} from 'antd';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSearchProductsMutation } from '../../../services/productApi';
import { Product } from '../../../features/product/productSlice';
import './styles.css';

const { Option } = Select;

const PublicProductList: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [searchProducts, { isLoading: searchLoading }] = useSearchProductsMutation();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchProducts({
          ten: "",
          tenNhom: "",
          tenNhomChinh: ""
        }).unwrap();
        
        // Xử lý dữ liệu trả về từ BE
        if (response && response.result) {
          setProducts(response.result || []);
          setPagination(prev => ({
            ...prev,
            total: Array.isArray(response.result) ? response.result.length : 0
          }));
        }
      } catch (err) {
        setError(t('error.searchFailed'));
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchProducts, t]);

  // Handle search form submission
  const handleSearch = async (values: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchProducts({
        ten: values.ten || '',
        tenNhom: values.tenNhom || '',
        tenNhomChinh: values.tenNhomChinh || ''
      }).unwrap();
      
      if (response && response.result) {
        setProducts(response.result || []);
        setPagination(prev => ({
          ...prev,
          current: 1,
          total: Array.isArray(response.result) ? response.result.length : 0
        }));
      }
    } catch (err) {
      setError(t('error.searchFailed'));
      console.error('Failed to search products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    form.resetFields();
    handleSearch({});
  };

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  // Định dạng số thành tiền VNĐ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Toggle view mode between table and grid
  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'table' ? 'grid' : 'table');
  };

  // Table columns configuration with responsive design
  const columns = [
    {
      title: t('product.image'),
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: '80px',
      render: (hinhAnh: string) => (
        <Image
          src={hinhAnh || 'https://placehold.co/80x80/png?text=No+Image'}
          alt=""
          width={80}
          height={80}
          fallback="https://placehold.co/80x80/png?text=Error"
          preview={false}
        />
      ),
    },
    {
      title: t('product.name'),
      dataIndex: 'ten',
      key: 'ten',
      render: (ten: string, record: any) => (
        <div>
          <div className="product-name">{ten}</div>
          <div className="product-code">{record.ma}</div>
        </div>
      ),
    },
    {
      title: t('product.price'),
      dataIndex: 'giaBan',
      key: 'giaBan',
      render: (giaBan: number, record: any) => (
        <div>
          <div className="product-price">{formatCurrency(giaBan)}</div>
          {record.giaTruocKm > 0 && (
            <div className="product-old-price">{formatCurrency(record.giaTruocKm)}</div>
          )}
        </div>
      ),
      responsive: ['md' as Breakpoint],
    },
    {
      title: t('product.unit'),
      dataIndex: 'tenDonViTinh',
      key: 'tenDonViTinh',
      width: '100px',
      responsive: ['lg' as Breakpoint],
    },
    {
      title: t('product.category'),
      dataIndex: 'tenNhom',
      key: 'tenNhom',
      render: (tenNhom: string) => <Tag color="blue">{tenNhom}</Tag>,
      responsive: ['lg' as Breakpoint],
    },
    {
      title: t('product.mainCategory'),
      dataIndex: 'tenNhomChinh',
      key: 'tenNhomChinh',
      render: (tenNhomChinh: string) => <Tag color="green">{tenNhomChinh}</Tag>,
      responsive: ['xl' as Breakpoint],
    }
  ];

  return (
    <div className="product-list-container">
      <Card className="product-card">
        {error && (
          <Alert 
            message={t('error.searchFailed')} 
            description={t('error.tryAgain')} 
            type="error" 
            showIcon 
            style={{ marginBottom: 16 }} 
          />
        )}
        
        <div className="search-form-container">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            initialValues={{ ten: "", tenNhom: "", tenNhomChinh: "" }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item name="ten" label={t('product.name')}>
                  <Input 
                    placeholder={t('product.searchName')} 
                    prefix={<SearchOutlined />}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item name="tenNhom" label={t('product.category')}>
                  <Select 
                    placeholder={t('product.selectCategory')}
                    allowClear
                  >
                    <Option value="Rau củ">{t('categories.vegetables')}</Option>
                    <Option value="Thịt">{t('categories.meat')}</Option>
                    <Option value="Cá">{t('categories.fish')}</Option>
                    <Option value="Trái cây">{t('categories.fruit')}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item name="tenNhomChinh" label={t('product.mainCategory')}>
                  <Select 
                    placeholder={t('product.selectMainCategory')}
                    allowClear
                  >
                    <Option value="Rau củ">{t('categories.vegetables')}</Option>
                    <Option value="Thịt">{t('categories.meat')}</Option>
                    <Option value="Cá">{t('categories.fish')}</Option>
                    <Option value="Trái cây">{t('categories.fruit')}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end" gutter={[8, 0]} className="button-row">
              <Col>
                <Button 
                  onClick={handleReset}
                  icon={<ReloadOutlined />}
                >
                  {t('common.reset')}
                </Button>
              </Col>
              <Col>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<SearchOutlined />}
                >
                  {t('common.search')}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="view-toggle">
          <Button onClick={toggleViewMode}>
            {viewMode === 'table' ? t('buttons.viewGrid') : t('buttons.viewTable')}
          </Button>
        </div>

        <div className="table-container">
          {loading || searchLoading ? (
            <div className="loading-container">
              <Spin size="large" />
              <p>{t('common.loading')}</p>
            </div>
          ) : (
            <Table
              dataSource={products}
              columns={columns}
              rowKey="id"
              pagination={{
                ...pagination,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total) => t('pagination.total', { total })
              }}
              onChange={handleTableChange}
              locale={{
                emptyText: <Empty description={t('product.noProducts')} />
              }}
              scroll={{ x: 'max-content' }}
              className="responsive-table"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default PublicProductList; 