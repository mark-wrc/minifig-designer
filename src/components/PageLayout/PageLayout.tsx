import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout = memo(() => (
  <>
    <main>
      <Outlet />
    </main>
  </>
));

PageLayout.displayName = 'PageLayout';

export default PageLayout;
