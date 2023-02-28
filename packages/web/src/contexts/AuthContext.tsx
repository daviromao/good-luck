import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface AuthContextData {
  signed: boolean;
  login: (data: { user: any; token: string }) => void;
  logout: () => Promise<void>;
  user?: any;
  token?: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState<string>();

  const login = useCallback(
    (data: { user: any; token: string }) => {
      localStorage.setItem('auth:user', JSON.stringify(data.user));
      localStorage.setItem('auth:token', data.token);

      setUser(data.user);
      setToken(data.token);
    },
    [setUser, setToken],
  );

  const logout = useCallback(async () => {
    localStorage.removeItem('auth:user');
    localStorage.removeItem('auth:token');

    setUser(undefined);
    setToken(undefined);
  }, [setUser, setToken]);

  const handleRehydrateUserData = useCallback(() => {
    const storedUser = localStorage.getItem('auth:user');
    const storedToken = localStorage.getItem('auth:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      logout();
    }
  }, [setUser, setToken, logout]);

  useEffect(() => {
    handleRehydrateUserData();
  }, [handleRehydrateUserData]);

  const signed = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider value={{ signed, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
