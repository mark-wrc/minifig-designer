import { memo } from 'react';
import { IMinifigTabContentProps } from './MinifigTabContent.types';
import { X } from 'lucide-react';
import { MAX_PROJECT_NAME_LENGTH } from '@/constants/Minifig';

const MinifigTabContent = memo<IMinifigTabContentProps>(({ character, onDelete }) => {
  const displayName =
    character.name.length > MAX_PROJECT_NAME_LENGTH
      ? `${character.name.slice(0, MAX_PROJECT_NAME_LENGTH)}...`
      : character.name;

  return (
    <section className="flex gap-6 items-center overflow-y-hidden">
      <X
        width={20}
        height={20}
        className="hover:bg-red-500 active:bg-red-500 active:text-white rounded-full hover:text-white"
        onClick={(e) => onDelete(character._id, e)}
      />
      <p
        className="font-bold text-lg"
        title={character.name.length > MAX_PROJECT_NAME_LENGTH ? character.name : undefined}
      >
        {displayName}
      </p>
    </section>
  );
});

MinifigTabContent.displayName = 'MinifigTabContent';

export default MinifigTabContent;
