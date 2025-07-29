import { memo } from 'react';
import { User as UserIcon, ArrowRight } from 'lucide-react';
import { ISignInButtonProps } from './SignInButton.types';

const SignInButton = memo<ISignInButtonProps>(({ url }) => (
  <section className="text-white p-4 bg-[#28385880] mb-4 rounded-md flex items-center justify-between cursor-pointer hover:text-yellow-300">
    <div className="flex items-center gap-2">
      <span className="bg-[#283858] rounded-full p-2">
        <UserIcon color="yellow" />
      </span>
      <a href={url}>Sign in </a>
    </div>

    <ArrowRight />
  </section>
));

SignInButton.displayName = 'SignInButton';
export default SignInButton;
