import { useState } from 'react';
import { Album } from '../../../../types/Albums';
import { trpc } from '../../../../server/utils/trpc';
import Input from '../../../lib/Input/Input';
import { SearchResults } from './SearchResults/SearchResults';
import {
  SEARCH_TYPES,
  useSearch,
} from '../../../../frontend/hooks/use-chart/use-search';
import NavDot, {
  Color,
} from '../../Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

export interface Props {
  onClick: (album: Album) => void;
}

const SearchAlbums: React.FC<Props> = ({ onClick }) => {
  const { data, onType, searchText, searchType, setSearchType } = useSearch();

  return (
    <div className="bg-red-red-400 h-14 w-full">
      <Input
        isMobile={true}
        value={searchText}
        placeholder={`Search ${searchType}`}
        onChange={(event) => onType(event.target.value)}
      />

      <div className="flex gap-4 pt-4">
        <span>Search for: </span>
        {SEARCH_TYPES.map((currentSearchType) => (
          <button
            key={`option-${currentSearchType}`}
            className="mb-2 flex flex-row"
            onClick={() => setSearchType(currentSearchType)}
          >
            <NavDot
              ariaLabel="option"
              color={
                searchType === currentSearchType ? Color.amber : Color.blue
              }
              isActive={searchType === currentSearchType}
              className="mr-2 h-3 w-3 border-none"
              onClick={() => undefined}
            />
            <p className=" dark:text-neutral-300">{currentSearchType}</p>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <SearchResults
          albums={data ?? []}
          isLoading={false}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default SearchAlbums;
