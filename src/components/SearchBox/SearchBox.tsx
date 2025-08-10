import { memo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ISearchBoxProps } from './SearchBox.types';

const SearchBox = memo<ISearchBoxProps>(({ onSearch, placeholder = 'Search...', className }) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch],
  );

  return (
    <div className={cn(className, 'relative')}>
      <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 md:text-white" />

      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        className="pl-8 text-black md:text-white md:border-white md:placeholder:text-white"
      />
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
