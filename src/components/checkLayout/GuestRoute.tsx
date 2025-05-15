import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { JSX } from 'react';

interface IGuestRouteProps {
  children: JSX.Element;
}

const GuestRoute = ({ children }: IGuestRouteProps): JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default GuestRoute;
