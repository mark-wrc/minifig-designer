import { CTAButton } from '../CTAButton';

const LoginMenu = () => (
  <section className="flex gap-3 items-center">
    <CTAButton variant={null} size={null} className="bg-none px-8 py-2">
      <a href="https://www.worldofminifigs.com/login" rel="noopener noreferrer">
        <span className=" text-white hover:underline text-lg">Login</span>
      </a>
    </CTAButton>
    <CTAButton
      variant="accent"
      size={null}
      className="px-8 py-3 hover:bg-yellow-400 border-l-8 border-l-yellow-600 border-b-6 border-t-6 border-b-transparent border-t-yellow-400 shadow-lg shadow-yellow-500/50  hover:border-l-transparent hover:-translate-x-0.5 hover:border-t-transparent duration-75 transition-all"
    >
      <a href="https://www.worldofminifigs.com/login" rel="noopener noreferrer">
        <span className=" text-black text-lg ">Register</span>
      </a>
    </CTAButton>
  </section>
);
LoginMenu.displayName = 'LoginMenu';

export default LoginMenu;
