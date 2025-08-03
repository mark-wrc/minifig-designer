import { AuthConfig, AuthData, AuthHookResult, IUser } from '@/types';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_CONFIG: Required<AuthConfig> = {
  storagePrefix: 'auth_',
  redirectUrl: '/login',
  parameterMap: {
    userName: 'userName',
    userEmail: 'userEmail',
    imageUrl: 'imageUrl',
    token: 'token',
  },
  requiredFields: ['userEmail, token'],
  autoRedirect: false,
};

export const createAuthHook = (config: AuthConfig = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const getStorageKey = (key: string) => `${finalConfig.storagePrefix}${key}`;

  const getParameterValue = (key: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlValue = urlParams.get(key)?.trim();
    const storageValue = localStorage.getItem(getStorageKey(key))?.trim();
    return urlValue || storageValue || '';
  };

  const setStorageValue = (key: string, value: string) => {
    if (value) {
      localStorage.setItem(getStorageKey(key), value);
    }
  };

  const clearAuthData = () => {
    Object.keys(finalConfig.parameterMap).forEach((key) => {
      localStorage.removeItem(getStorageKey(key));
    });
    console.log('Auth data cleared from localStorage');
  };

  const validateRequiredFields = (data: AuthData): boolean => {
    return finalConfig.requiredFields.every((field) => data[field] && data[field].trim() !== '');
  };

  const useAuthFromURL = (): AuthHookResult => {
    const [authData, setAuthData] = useState<{ user: IUser } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const processAuthData = useCallback(() => {
      const data: AuthData = {};
      let hasUrlParams = false;

      Object.entries(finalConfig.parameterMap).forEach(([key, paramName]) => {
        const value = getParameterValue(paramName);
        if (value) {
          data[key] = value;

          const urlValue = new URLSearchParams(window.location.search).get(paramName);
          if (urlValue) {
            hasUrlParams = true;
            setStorageValue(key, value);
          }
        }
      });

      console.log('🔍 Final auth data:', data);
      console.log('🔍 Token specifically:', data.token);

      if (hasUrlParams) {
        window.history.replaceState({}, '', window.location.pathname);
      }

      const isValid = validateRequiredFields(data);

      if (!isValid && finalConfig.autoRedirect) {
        console.log('Required fields missing, redirecting...');
        window.location.href = finalConfig.redirectUrl;
        return;
      }

      console.log('Auth data processed:', data);

      const user: IUser = {
        userName: data.userName || '',
        userEmail: data.userEmail || '',
        imageUrl: data.imageUrl || '',
        token: data.token || '',
      };
      setAuthData(Object.keys(data).length > 0 ? { user } : null);
      setIsLoading(false);
    }, []);

    useEffect(() => {
      processAuthData();
    }, [processAuthData]);

    const isAuthenticated =
      authData !== null && validateRequiredFields(authData.user as unknown as AuthData);
    return {
      authData,
      isLoading,
      clearAuthData,
      isAuthenticated,
    };
  };

  return { useAuthFromURL, clearAuthData };
};

export const { useAuthFromURL, clearAuthData } = createAuthHook({
  storagePrefix: 'minifig_',
  parameterMap: {
    userName: 'userName',
    userEmail: 'userEmail',
    imageUrl: 'imageUrl',
    token: 'token',
  },
  requiredFields: ['userEmail', 'token'],
  autoRedirect: false,
});
