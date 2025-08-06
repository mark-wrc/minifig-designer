import { memo } from 'react';
import { IMinifigTabContentProps } from './MinifigTabContent.types';
import { X } from 'lucide-react';

const MinifigTabContent = memo<IMinifigTabContentProps>(({ character, onDelete }) => (
  <section className="flex gap-6 items-center overflow-y-hidden">
    <X
      width={20}
      height={20}
      className="hover:bg-red-500 rounded-full hover:text-white"
      onClick={(e) => onDelete(character._id, e)}
    />

    <p className="font-normal text-lg">{character.name}</p>
  </section>
));

MinifigTabContent.displayName = 'MinifigTabContent';

export default MinifigTabContent;
