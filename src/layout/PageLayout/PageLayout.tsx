import { FooterSection, HeaderSection } from '@/containers';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout = memo(() => (
  <>
    <HeaderSection />
    <main>
      <Outlet />
    </main>
    <FooterSection />
  </>
));

PageLayout.displayName = 'PageLayout';

export default PageLayout;
