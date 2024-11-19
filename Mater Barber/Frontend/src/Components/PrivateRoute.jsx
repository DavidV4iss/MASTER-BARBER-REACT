import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ roles, element }) => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir a la página de login
    if (!token) {
        console.log("No token found. Redirecting to Login.");
        return <Navigate to="/Login" />;
    }

    let userRole;
    try {
        // Decodifica el token
        const user = JSON.parse(atob(token.split('.')[1]));
        userRole = user.role; // Asigna el rol
        console.log("User role from token:", userRole);
    } catch (error) {
        console.error("Error decoding token", error);
        return <Navigate to="/access-denied" />;
    }

    // Asegúrate de que el rol sea una cadena antes de compararlo
    if (!roles.includes(userRole.toString())) {
        console.log(`Access denied. User role: ${userRole}, required roles: ${roles}`);
        return <Navigate to="/access-denied" />;
    }

    // Si tiene el rol adecuado, renderiza el elemento
    return element;
};

export default PrivateRoute;

