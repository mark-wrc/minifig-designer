export interface IFooterSectionTypes {
  title?: string;
  link?: string;
  description?: string;
  onClick?: () => void;
}

export const Accounts: IFooterSectionTypes[] = [
  { title: 'My Account', link: 'https://www.worldofminifigs.com/profile' },
  { title: 'Login', link: 'https://www.worldofminifigs.com/login' },
  { title: 'Register', link: 'https://www.worldofminifigs.com/register' },
  { title: 'Cart', onClick: undefined },
];

export const QuickLinks: IFooterSectionTypes[] = [
  { title: 'Privacy Policy', link: 'https://www.worldofminifigs.com/privacy-policy' },
  { title: 'Terms of Use', link: 'https://www.worldofminifigs.com/terms-of-use' },
  { title: 'Contact', link: 'https://www.worldofminifigs.com/contact' },
];

export const Support: IFooterSectionTypes[] = [
  { title: 'Lehi, Utah 84043', link: '/' },
  { title: 'brickextremeofficial@gmail.com', link: 'mailto:brickextremeofficial@gmai.com' },
];

export const CompanyDescription: IFooterSectionTypes = {
  description:
    'Follow us on social media to stay updated on new releases, exclusive promotions, and our latest collections.',
};

//social media links
export const socialMediaLinks = {
  facebookLink: 'https://www.facebook.com/theworldofminifigs/',
  instagramLink: 'https://www.instagram.com/theworldofminifigs/',
};
