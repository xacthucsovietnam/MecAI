import { 
  Button, 
  Form,
  Card, 
  CardMeta, 
  Alert, 
  Modal, 
  SelectBox, 
  Table,
  Notification
} from '../components';

/**
 * Custom hook để truy cập tất cả UI components
 * Hook này giúp sử dụng một cách nhất quán các common UI components
 * và truy cập dễ dàng hơn thông qua destructuring
 */
const useUIComponents = () => {
  return {
    Button,
    Form,
    Card,
    CardMeta,
    Alert,
    Modal,
    SelectBox,
    Table,
    Notification
  };
};

export default useUIComponents; 