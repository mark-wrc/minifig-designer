import { CartProject } from '@/types';

const STORAGE_KEY = 'minifig-cart';

export const cartStorage = {
  load: (): Record<string, CartProject> => {
    if (typeof window === 'undefined') return {};

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      return {};
    }
  },

  save: (projects: Record<string, CartProject>): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart storage:', error);
    }
  },
};
