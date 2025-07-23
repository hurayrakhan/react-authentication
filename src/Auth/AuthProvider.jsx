import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const login = async (credentials) => {
        try {
            const res = await axios.post('https://dummyjson.com/auth/login', credentials);
            const { accessToken, refreshToken, ...userData } = res.data;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        setAccessToken('');
        setRefreshToken('');
        setUser(null);
    };

    // Refresh token on first load (simulate keeping user logged in)
    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await fetch('https://dummyjson.com/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        refreshToken: refreshToken,
                        expiresInMins: 30
                    }),
                    credentials: 'include',
                });

                const data = await res.json();
                if (data?.accessToken) {
                    setAccessToken(data.accessToken);
                    setUser(data); // optional: data may include user info
                }
            } catch (err) {
                console.error('Token refresh failed:', err);
            }
        };

        if (refreshToken) {
            refresh();
        }
    }, [refreshToken]);

    const authInfo = {
        user,
        accessToken,
        refreshToken,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
