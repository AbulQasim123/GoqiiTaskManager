import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/login', { email, password });
        const { access_token, user } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setUser(user);
        return user;
    };

    const register = async (data) => {
        const res = await api.post('/register', data);
        const { access_token, user } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setUser(user);
        return user;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (e) { }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);