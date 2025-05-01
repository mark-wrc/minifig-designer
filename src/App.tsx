import { Helmet } from 'react-helmet';
import './App.css';

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

      <h1>World of Minifigs</h1>
      <p>mini-figs.</p>
    </>
  );
}

export default App;
