import { clearAuthData } from '@/hooks';
import { createContext, ReactNode, useCallback, useMemo } from 'react';

interface IAuthData {
  userName?: string;
  userEmail?: string;
}

interface IAuthProviderProps {
  children: ReactNode;
  authData: IAuthData;
}

interface AuthContextValue extends IAuthData {
  logout: () => void;
}

// this intended to get user's data to be able to redirect to the minifig Builder Page

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children, authData }: IAuthProviderProps) => {
  const logout = useCallback(() => {
    clearAuthData();
    window.location.href = 'https://www.worldofminifigs.com/login';
  }, []);

  const contextValue = useMemo(
    (): AuthContextValue => ({
      ...authData,
      logout,
    }),
    [authData, logout],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
