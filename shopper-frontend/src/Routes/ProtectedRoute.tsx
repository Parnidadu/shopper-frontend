import React from 'react';
import { useNavigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token'); 
    console.log("isAuthenticate", isAuthenticated)
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }
    return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
