import { HelmetProvider, Helmet } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store/index';
import { createAppRouter } from './utils';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import { useAuthFromURL } from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import '@/toast.css';

const router = createAppRouter();
const queryClient = new QueryClient();

function App() {
  const { authData } = useAuthFromURL();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider authData={authData}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Helmet>
                <title>Build Custom LEGO Minifigures | World of Minifigs</title>
                <meta name="description" content="World of Minifigs Builder." />
                <meta
                  property="og:title"
                  content="World of Minifigs Builder - Create Your Custom Minifigs"
                />
              </Helmet>
              <RouterProvider router={router} />

              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
                className="toast-container"
                toastClassName="toast-item"
                progressClassName="toast-progress"
              />
            </PersistGate>
          </Provider>
        </AuthProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
