import { memo } from 'react';
import { Button } from '../ui/button';
import { RotatingLines } from 'react-loader-spinner';
import { ICTAButtonProps } from './CTAButton.types';

const CTAButton = memo<ICTAButtonProps>(({ icon: Icon, isLoading, title, children, ...props }) => {
  return (
    <Button {...props}>
      {/* Optional Icon */}
      {Icon && <Icon />}

      {isLoading ? (
        <RotatingLines
          strokeColor="black"
          width="100"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        title && <span>{title}</span>
      )}

      {children}
    </Button>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;
