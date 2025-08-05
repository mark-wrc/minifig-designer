import { memo } from 'react';
import { Button } from '../ui/button';
import { RotatingLines } from 'react-loader-spinner';

import { ICTAButtonProps } from './CTAButton.types';

const CTAButton = memo<ICTAButtonProps>(({ icon: Icon, isLoading, ...props }) => (
  <Button {...props}>
    {Icon ? <Icon /> : null}

    {isLoading ? (
      <RotatingLines
        strokeColor="black"
        width="100"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    ) : (
      <>{props.title && <h1>{props.title}</h1>}</>
    )}

    {props.children}
  </Button>
));

CTAButton.displayName = 'CTAButton';

export default CTAButton;
