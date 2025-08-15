const Config = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:4001',
  checkoutUrl: import.meta.env.VITE_CHECKOUT_URL || 'http://localhost:5173/checkout',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default Config;
