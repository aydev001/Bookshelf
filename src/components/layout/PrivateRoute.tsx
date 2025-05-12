import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../app/store';


interface IPrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)
    return (
        <>
            {isAuthenticated ? children : <Navigate to={"/login"} />}
        </>
    );
};

export default PrivateRoute;