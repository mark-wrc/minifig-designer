import { memo } from 'react';
import { WOFLogo } from '@/assets/images';

const HeaderSection = memo(() => (
  <div className=" bg-minifig-brand-end py-6 ">
    <div className=" container mx-auto">
      <img src={WOFLogo} className="w-1/10" alt="world of minifigs logo" />
    </div>
  </div>
));

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
