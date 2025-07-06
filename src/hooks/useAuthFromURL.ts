import { useEffect, useState } from 'react';

export interface AuthData {
  userName?: string;
  userEmail?: string;
}

export const clearAuthData = () => {
  localStorage.removeItem('minifig_userName');
  localStorage.removeItem('minifig_userEmail');
  console.log('Auth data cleared from localStorage');
};

export const useAuthFromURL = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParam = (key: string) => {
      const urlValue = new URLSearchParams(window.location.search).get(key)?.trim();
      const storageValue = localStorage.getItem(`minifig_${key}`)?.trim();
      return urlValue || storageValue || '';
    };

    const userName = getParam('userName');
    const userEmail = getParam('userEmail');

    console.log('Auth check:', { userName, userEmail });

    // if (!userEmail) {
    //   console.log('No email found, redirecting...');
    //   window.location.href = 'https://www.worldofminifigs.com/login';
    //   return;
    // }

    if (userName) localStorage.setItem('minifig_userName', userName);
    if (userEmail) localStorage.setItem('minifig_userEmail', userEmail);

    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);

    setAuthData({
      ...(userName && { userName }),
      ...(userEmail && { userEmail }),
    });

    setIsLoading(false);
  }, []);

  return { authData, isLoading };
};
