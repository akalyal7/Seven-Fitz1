import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock session
        const storedUser = localStorage.getItem('7fitz_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        const mockUser = {
            id: "u123",
            name: "john",
            email: email,
            avatar: "https://ui-avatars.com/api/?name=Akash&background=random"
        };
        setUser(mockUser);
        localStorage.setItem('7fitz_user', JSON.stringify(mockUser));
        return { success: true };
    };

    const register = (userData) => {
        // Mock register logic
        const mockUser = {
            id: "u" + Math.random().toString(36).substr(2, 9),
            ...userData,
            avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
        };
        setUser(mockUser);
        localStorage.setItem('7fitz_user', JSON.stringify(mockUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('7fitz_user');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
