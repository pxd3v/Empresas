import React, { createContext, useCallback, useState } from "react";
import { api } from "../api/api";

interface Session {
  "access-token": string;
  "token-type": string;
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

export interface AuthState {
  "access-token": string;
  "token-type": string;
  client: string;
}

export interface AuthContextData {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const verifyIfIsLoggedIn = (): boolean => {
    const accessToken = localStorage.getItem("@empresas: access-token");
    const tokenType = localStorage.getItem("@empresas: token-type");
    const client = localStorage.getItem("@empresas: client");

    return !!accessToken && !!tokenType && !!client;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(verifyIfIsLoggedIn());
  const [data, setData] = useState<AuthState | {}>(() => {
    const accessToken = localStorage.getItem("@empresas: access-token");
    const tokenType = localStorage.getItem("@empresas: token-type");
    const client = localStorage.getItem("@empresas: client");

    if (verifyIfIsLoggedIn()) {
      return {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
      };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem("@empresas: access-token");
    localStorage.removeItem("@empresas: token-type");
    localStorage.removeItem("@empresas: client");
    setIsLoggedIn(false);

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async (credentials: Credentials): Promise<
    void
  > => {
    const { data, headers, status } = await api.post("/users/auth/sign_in", {
      email: credentials.email,
      password: credentials.password,
    });

    const successResponse = status === 200;

    if (successResponse) {
      const session = headers as Session;
      localStorage.setItem("@empresas: access-token", session["access-token"]);
      localStorage.setItem("@empresas: token-type", session["token-type"]);
      localStorage.setItem("@empresas: client", session.client);
      api.defaults.headers.common = { "access-token": session["access-token"] };
      api.defaults.headers.common = { "token-type": session["token-type"] };
      api.defaults.headers.common = { client: session.client };
      setIsLoggedIn(true);
    } else {
      const { errors } = data as Error;
      throw new Error(errors[0]);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
