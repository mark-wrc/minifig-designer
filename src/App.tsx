import { HelmetProvider, Helmet } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store/index';
import { createAppRouter } from './lib/routing';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AuthProvider } from './context/AuthContext';
import { useAuthFromURL } from './hooks';

// placeholder
const LoadingView = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
  >
    Loading...
  </div>
);

const router = createAppRouter();

function App() {
  const { authData } = useAuthFromURL();

  return (
    <HelmetProvider>
      <AuthProvider authData={authData}>
        <Provider store={store}>
          <PersistGate loading={<LoadingView />} persistor={persistor}>
            <Helmet>
              <title>Build Custom LEGO Minifigures | World of Minifigs</title>
              <meta name="description" content="World of Minifigs Builder." />
              <meta
                property="og:title"
                content="World of Minifigs Builder - Create Your Custom Minifigs"
              />
            </Helmet>

            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
