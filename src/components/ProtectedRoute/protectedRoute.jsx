import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export default function ProtectedHome({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
}





