const Config = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:4001',
  cloudinaryUrl: import.meta.env.VITE_PUBLIC_CLOUDINARY_URL,
  stripeKey: import.meta.env.VITE_PUBLIC_STRIPE_KEY,
  paypalClientId: import.meta.env.VITE_PUBLIC_PAYPAL_CLIENT_ID,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default Config;
