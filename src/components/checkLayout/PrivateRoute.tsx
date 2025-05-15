import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';


interface IPrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return children;
    }else {
        return <Navigate to="/login" replace/>;
    }
};



export default PrivateRoute;