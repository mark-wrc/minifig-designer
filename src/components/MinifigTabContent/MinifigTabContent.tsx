import { memo } from 'react';
import { IMinifigTabContentProps } from './MinifigTabContent.types';
import { CTAButton } from '../CTAButton';
import { X } from 'lucide-react';

const MinifigTabContent = memo<IMinifigTabContentProps>(({ character, onDelete }) => (
  <section className="flex justify-between gap-6 items-center overflow-y-hidden">
    <CTAButton
      variant="ghost"
      size="icon"
      className="h-5 w-5 cursor-pointer  hover:bg-red-500 rounded-full hover:text-white font-bold"
      onClick={(e) => onDelete(character._id, e)}
    >
      <X className="h-3 w-3 " />
    </CTAButton>
    <span className="font-normal text-lg">{character.name}</span>
  </section>
));

MinifigTabContent.displayName = 'MinifigTabContent';

export default MinifigTabContent;
