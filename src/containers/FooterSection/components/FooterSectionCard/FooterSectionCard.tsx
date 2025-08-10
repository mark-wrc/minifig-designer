import { memo } from 'react';
import { IFooterSectionCardProps } from './FooterSectionCard.types';
import { cn } from '@/lib/utils';

const FooterSectonCard = memo<IFooterSectionCardProps>(({ title, children, className }) => (
  <section className={cn(className, 'text-white')}>
    <h1 className=" after:bg-yellow-300 after:w-15 after:h-[2px] after:block text-xl my-4">
      {title}
    </h1>

    <div>{children}</div>
  </section>
));

FooterSectonCard.displayName = 'FooterSectionCard';

export default FooterSectonCard;
