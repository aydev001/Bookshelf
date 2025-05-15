import { useEffect, type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { checkIsAuthenticated } from '../../app/features/auth/auth.slice';


interface IPrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, authLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(checkIsAuthenticated());
    }, [dispatch]);

    if (authLoading) {
        return <p>Yuklanmoqda...</p>; // yoki loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};



export default PrivateRoute;