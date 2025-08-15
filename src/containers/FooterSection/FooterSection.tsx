import { memo, useCallback } from 'react';
import { FooterSectionCard } from './components';
import {
  Accounts,
  CompanyDescription,
  QuickLinks,
  socialMediaLinks,
  Support,
} from './constants/FooterData';
import { IFooterSectionProps } from './FooterSection.types';
import { Facebook, Instagram } from 'lucide-react';
import { FooterLink } from '@/components';
import CopyRightSection from './components/CopyrightSection/CopyrightSection';

const FooterSection = memo<IFooterSectionProps>(({ onClick }) => {
  const onHandleCartClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <section className=" bg-minifig-brand-end py-6 p-6  ">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto ">
        {/* Accounts section  */}
        <section className=" grid grid-cols-2">
          <FooterSectionCard className="flex flex-col" title="Account">
            {Accounts.map((item) =>
              item.title === 'Cart' ? (
                <div
                  key={item.title}
                  className="flex cursor-pointer mb-4 text-sm font-light"
                  onClick={onHandleCartClick}
                >
                  <p className="translate-all font-semibold duration-150 hover:translate-x-1.5 hover:underline hover:text-yellow-300">
                    {' '}
                    {item.title}
                  </p>
                </div>
              ) : (
                <FooterLink
                  key={item.title}
                  className="flex cursor-pointer mb-4 text-sm font-light "
                  href={item.link}
                >
                  <p className="translate-all duration-150 font-semibold hover:translate-x-1.5 hover:underline hover:text-yellow-300">
                    {item.title}
                  </p>
                </FooterLink>
              ),
            )}
          </FooterSectionCard>
          <FooterSectionCard className="flex flex-col" title="Quick links">
            {QuickLinks.map((item) => (
              <FooterLink
                href={item.link}
                className="cursor-pointer mb-4 text-sm font-light w-fit"
                key={item.title}
              >
                <p className="translate-all duration-150 font-semibold hover:translate-x-1.5 hover:underline hover:text-yellow-300">
                  {item.title}
                </p>
              </FooterLink>
            ))}
          </FooterSectionCard>
        </section>

        {/* Support section  */}
        <FooterSectionCard title="Support" className="flex flex-col">
          {Support.map((item) => (
            <FooterLink className="flex mb-4  " href={item.link} key={item.title}>
              <p className="translate-all duration-150 font-semibold hover:translate-x-1.5 hover:underline hover:text-yellow-300">
                {item.title}
              </p>
            </FooterLink>
          ))}
        </FooterSectionCard>

        {/*  Company description section  */}
        <FooterSectionCard title="World of Minifigs">
          <section>
            <p className="text-sm font-light">{CompanyDescription.description}</p>
            <div className="flex gap-4 mt-4">
              <FooterLink
                href={socialMediaLinks.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className=" bg-blue-600 border-l-blue-700 group border-t-blue-500 hover:border-t-blue-500 border-l-8 active:border-l-transparent active:-translate-x-0.5 active:shadow-md hover:shadow-md border-t-6 border-b-6 border-b-transparent rounded-md p-3 font-semibold hover:border-l-transparent hover:-translate-x-0.5 duration-75 transition-all shadow-lg shadow-blue-500/50"
              >
                <Facebook className="group-hover:-translate-x-1 transition-all duration-75" />
              </FooterLink>
              <FooterLink
                href={socialMediaLinks.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-[#e4405f] border-l-8 border-t-6 group border-b-6 border-b-transparent rounded-md hover:shadow-md border-t-[#a45463] active:border-l-transparent active:-translate-x-0.5 active:shadow-md border-l-[#733c46] p-3  font-semibold hover:bg-[#a45463] hover:border-l-transparent  hover:-translate-x-0.5 shadow-lg shadow-[#a45463] transition-all duration-75"
              >
                <Instagram className="group-hover:-translate-x-1 transition-all duration-75" />
              </FooterLink>
            </div>
          </section>
        </FooterSectionCard>
      </div>

      {/*copyright section */}
      <CopyRightSection className="text-center text-white" />
    </section>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
