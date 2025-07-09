import { memo } from 'react';
import { IFooterLinkProps } from './FooterLink.types';
import { cn } from '@/lib/utils';

const FooterLink = memo<IFooterLinkProps>(({ children, className, ...props }) => (
  <a {...props} className={cn('flex cursor-pointer w-fit mb-2 text-sm font-light', className)}>
    {children}
  </a>
));

FooterLink.displayName = 'FooterLink';

export default FooterLink;
