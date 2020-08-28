import React, { createContext, useCallback, useState } from 'react';
import { api } from '../api/api';
import { exception } from 'console';

interface Session {
  'access-token': string;
  'token-type': string;
  client: string;
}

interface Error {
  success: boolean;
  errors: string[];
}

interface Credentials {
  email: string;
  password: string;
}
export interface AuthContextData {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const verifyIfIsLoggedIn = (): boolean => {
        const accessToken = localStorage.getItem('@empresas: access-token');
        const tokenType = localStorage.getItem('@empresas: token-type');
        const client = localStorage.getItem('@empresas: client');

        return !!accessToken && !!tokenType && !!client;
    };
    const [isLoggedIn, setIsLoggedIn] = useState(verifyIfIsLoggedIn());

    const signOut = useCallback(() => {
        localStorage.removeItem('@empresas: access-token');
        localStorage.removeItem('@empresas: token-type');
        localStorage.removeItem('@empresas: client');
        setIsLoggedIn(false);
    }, []);

    const signIn = useCallback(async (credentials: Credentials): Promise<
    void
  > => {
        await api.post('/users/auth/sign_in', {
            email: credentials.email,
            password: credentials.password,
        }).then((response) => {
            const session = response.headers as Session;
            localStorage.setItem('@empresas: access-token', session['access-token']);
            localStorage.setItem('@empresas: token-type', session['token-type']);
            localStorage.setItem('@empresas: client', session.client);
            api.defaults.headers.common = { 'access-token': session['access-token'], 'token-type': session['token-type'], client: session.client, uid: credentials.email};
            setIsLoggedIn(true);
        }).catch((err: Error) => {throw err.errors[0];});
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
