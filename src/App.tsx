import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { createAppRouter } from './lib/routing';

const router = createAppRouter();
function App() {
  return (
    <>
      <Helmet>
        <title>My Vite App</title>
        <meta name="description" content="World of Minifigs Builder." />
        <meta
          property="og:title"
          content="World of Minifigs Builder - Create Your Custom Minifigs"
        />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
