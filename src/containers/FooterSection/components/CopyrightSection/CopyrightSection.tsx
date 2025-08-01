import { memo } from 'react';
import dayjs from 'dayjs';
import { ICopyrightSectionProps } from './CopyrightSection.types';
import { cn } from '@/lib/utils';
import { Divider } from '@/components';

const CopyRightSection = memo<ICopyrightSectionProps>(({ className }) => {
  return (
    <section className={cn(className)}>
      <Divider className="bg-minifig-lavander-blue mt-1" />
      <p className="mt-2 text-sm md:text-base">{`© Copyright World of Minifigs ${dayjs().year()}. All rights reserved`}</p>
    </section>
  );
});

export default CopyRightSection;
