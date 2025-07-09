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

const FooterSection = memo<IFooterSectionProps>(({ onClick }) => {
  const onHandleCartClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <section className=" bg-minifig-brand-end py-6 p-6  ">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Accounts section  */}
        <section className=" grid grid-cols-2">
          <FooterSectionCard className="flex flex-col" title="Account">
            {Accounts.map((item) =>
              item.title === 'cart' ? (
                <div
                  key={item.title}
                  className="flex cursor-pointer mb-4 text-sm font-light text-gray-300"
                  onClick={onHandleCartClick}
                >
                  {item.title}
                </div>
              ) : (
                <FooterLink
                  key={item.title}
                  className="flex cursor-pointer mb-4 text-sm font-light text-gray-300"
                  href={item.link}
                >
                  {item.title}
                </FooterLink>
              ),
            )}
          </FooterSectionCard>
          <FooterSectionCard className="flex flex-col" title="Quick links">
            {QuickLinks.map((item) => (
              <div
                className="cursor-pointer mb-4 text-sm font-light text-gray-300"
                key={item.title}
              >
                {item.title}
              </div>
            ))}
          </FooterSectionCard>
        </section>

        {/* Support section  */}
        <FooterSectionCard title="Support" className="flex flex-col">
          {Support.map((item) => (
            <FooterLink className="flex mb-4 text-gray-300 " href={item.link} key={item.title}>
              {item.title}
            </FooterLink>
          ))}
        </FooterSectionCard>

        {/*  Company description section  */}
        <FooterSectionCard title="World of Minifigs">
          <section>
            <p className="text-sm text-gray-300">{CompanyDescription.description}</p>
            <div className="flex gap-2 mt-4">
              <FooterLink
                href={socialMediaLinks.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className=" bg-minifig-lavander-blue/50 rounded-full p-3"
              >
                <Facebook />
              </FooterLink>
              <FooterLink
                href={socialMediaLinks.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-minifig-lavander-blue/50 rounded-full p-3"
              >
                <Instagram />
              </FooterLink>
            </div>
          </section>
        </FooterSectionCard>
      </div>
    </section>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
