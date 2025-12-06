'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import Cookies from 'js-cookie';
import { apiClient } from './api';

// Cookie names
const AUTH_COOKIE_NAME = 'accessToken';
const USER_ID_COOKIE_NAME = 'userId';

// Cookie options - 7 days expiry
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
    expires: 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
};

// User type based on /api/v1/auth/me response
interface User {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    role: 'GUEST' | 'STUDENT' | 'TEACHER' | 'ADMIN';
    isOnboarded: boolean;
    school?: string;
    batch?: string;
    bio?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-apearchive.freeddns.org';

// Helper to get token from cookies
export function getAccessToken(): string | undefined {
    return Cookies.get(AUTH_COOKIE_NAME);
}

// Helper to set auth cookies
export function setAuthCookies(accessToken: string, userId?: string) {
    Cookies.set(AUTH_COOKIE_NAME, accessToken, COOKIE_OPTIONS);
    if (userId) {
        Cookies.set(USER_ID_COOKIE_NAME, userId, COOKIE_OPTIONS);
    }
}

// Helper to clear auth cookies
export function clearAuthCookies() {
    Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
    Cookies.remove(USER_ID_COOKIE_NAME, { path: '/' });
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user profile from API
    const fetchUser = useCallback(async () => {
        const token = getAccessToken();
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.get('/api/v1/auth/me');
            if (response.data?.success && response.data?.data) {
                setUser(response.data.data);
            } else {
                setUser(null);
                clearAuthCookies();
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
            clearAuthCookies();
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Check for token on mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Login - redirect to Google OAuth
    const login = useCallback(() => {
        window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
    }, []);

    // Logout - clear cookies and reset state
    const logout = useCallback(() => {
        clearAuthCookies();
        setUser(null);
    }, []);

    // Refresh user data
    const refreshUser = useCallback(async () => {
        setIsLoading(true);
        await fetchUser();
    }, [fetchUser]);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
