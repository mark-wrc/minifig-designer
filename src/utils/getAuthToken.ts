export const getAuthToken = (): string | null => {
  const storageKey = 'minifig_token';
  return localStorage.getItem(storageKey);
};
