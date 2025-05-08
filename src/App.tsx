import { HelmetProvider, Helmet } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { createAppRouter } from './lib/routing';

const router = createAppRouter();
function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <HelmetProvider>
        <Helmet>
          <title>My Vite App</title>
          <meta name="description" content="World of Minifigs Builder." />
          <meta
            property="og:title"
            content="World of Minifigs Builder - Create Your Custom Minifigs"
          />
        </Helmet>

        <RouterProvider router={router} />
      </HelmetProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
