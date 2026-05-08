'use client';

// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '@/shared/api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoadingAuth(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
