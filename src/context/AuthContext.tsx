import { clearAuthData } from '@/hooks';
import { IUser } from '@/types';
import { createContext, ReactNode, useCallback, useMemo } from 'react';

interface IAuthData {
  user: IUser | undefined; // temporarily undefined
}

interface IAuthProviderProps {
  children: ReactNode;
  authData: IAuthData | null;
}

interface AuthContextValue extends IAuthData {
  logout: () => void;
  getToken: () => string | null;
}

// this intended to get user's data to be able to redirect to the minifig Builder Page

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children, authData }: IAuthProviderProps) => {
  const logout = useCallback(() => {
    clearAuthData();
    window.location.href = 'https://www.worldofminifigs.com/login';
  }, []);

  const getToken = useCallback(() => {
    return authData?.user?.token || null;
  }, [authData]);

  const contextValue = useMemo(
    (): AuthContextValue => ({
      user: authData?.user,
      logout,
      getToken,
    }),
    [authData?.user, getToken, logout],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
