import { memo } from 'react';
import { Button } from '../ui/button';
import { ICTAButtonProps } from './CTAButton.types';

const CTAButton = memo<ICTAButtonProps>(({ icon: Icon, ...props }) => (
  <Button {...props}>
    {Icon ? <Icon /> : null}

    {props.children}
  </Button>
));

CTAButton.displayName = 'CTAButton';

export default CTAButton;
