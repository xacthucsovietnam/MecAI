import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../useRedux';
import { useSearchProductsMutation, useSearchProductsAuthMutation } from '../../services/productApi';
import { setSearchParams } from '../../features/product/productSlice';
import { ProductSearchParams } from '../../features/product/productSlice';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

export type SearchType = 'public' | 'auth';

interface UseProductSearchResult {
  loading: boolean;
  handleSearch: (values: ProductSearchParams) => Promise<void>;
  handleReset: () => void;
  initialValues: ProductSearchParams;
}

/**
 * Custom hook for product search functionality
 * @param type - Type of search: 'public' or 'auth'
 * @returns Search related functions and state
 */
export const useProductSearch = (type: SearchType): UseProductSearchResult => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.product);
  
  // Select the appropriate RTK Query hooks based on search type
  const [searchProducts, { isLoading: isPublicLoading }] = useSearchProductsMutation();
  const [searchProductsAuth, { isLoading: isAuthLoading }] = useSearchProductsAuthMutation();
  
  // Determine which loading state to use
  const loading = type === 'public' ? isPublicLoading : isAuthLoading;
  
  // Initial values for the search form
  const initialValues = {
    ten: searchParams.ten || '',
    tenNhom: searchParams.tenNhom || '',
    tenNhomChinh: searchParams.tenNhomChinh || '',
  };
  
  // Handle search form submission
  const handleSearch = async (values: ProductSearchParams) => {
    try {
      // Update search params in Redux
      dispatch(setSearchParams(values));
      
      // Call the appropriate API based on search type
      if (type === 'public') {
        await searchProducts(values).unwrap();
      } else {
        await searchProductsAuth(values).unwrap();
      }
    } catch (err) {
      console.error(`Error searching ${type} products:`, err);
      message.error(t('notification.messages.apiError'));
    }
  };
  
  // Reset the search form and params
  const handleReset = () => {
    dispatch(setSearchParams({}));
  };
  
  // Run initial search if search params exist
  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      if (type === 'public') {
        searchProducts(searchParams);
      } else {
        searchProductsAuth(searchParams);
      }
    }
  }, []);
  
  return {
    loading,
    handleSearch,
    handleReset,
    initialValues,
  };
}; 