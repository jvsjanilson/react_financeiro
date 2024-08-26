import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface AuthContextType {
    isAuthenticated: boolean;
    user: string;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null >(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenJson = JSON.parse(token || '{}');
        if (tokenJson.access) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post("http://localhost/api/token/", {
                username: username,
                password: password,
            });
            localStorage.setItem('token', JSON.stringify(response.data));
            setIsAuthenticated(true);
            setUser(username);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}