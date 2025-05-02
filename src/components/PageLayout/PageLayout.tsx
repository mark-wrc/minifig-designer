import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout = memo(() => (
  <>
    <main>
      <Outlet />
    </main>
    <footer>© 2025 My fucking app</footer>
  </>
));

PageLayout.displayName = 'PageLayout';

export default PageLayout;
