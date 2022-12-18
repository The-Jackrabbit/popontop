import React from 'react';
import Image from 'next/image';
import { Album } from '../../../../../styles/types/Albums';
import { ROW_HEIGHT } from '../../../../../frontend/hooks/springs/use-disappear-row';
import FilterButton, { ICON_STYLE } from '../../../FilterButton/FilterButton';
import { PlusIcon } from '@heroicons/react/20/solid';
import { a } from 'react-spring';

export interface Props {
  album: Album;
  onClick: () => void;
}

export const SearchView: React.FC<Props> = ({ album, onClick }) => (
  <a.div
    className="
      flex
      w-full justify-between
      active:dark:bg-[#121212]
    "
  >
    <div className="max-w-[60px] basis-2/12 justify-start">
      <Image
        height={ROW_HEIGHT}
        width={ROW_HEIGHT}
        src={album.imageUrl}
        alt={album.artist}
      />
    </div>

    <div
      className="
      flex grow-0
      basis-8/12
      flex-col
      content-start justify-end overflow-x-hidden pl-2
    "
    >
      <p className="overflow-x-hidden whitespace-nowrap text-xs">
        {album.artist}
      </p>
      <p className="overflow-x-hidden whitespace-nowrap text-xs">
        {album.name}
      </p>
    </div>
    <div className="grow-1 shrink-0 basis-1/12"></div>
    <div
      className="flex grow-0 basis-3/12 items-center justify-end"
      onClick={() => undefined}
    >
      <FilterButton ariaLabel="add album to chart" onClick={onClick}>
        <PlusIcon className={ICON_STYLE} />
      </FilterButton>
    </div>
  </a.div>
);

export default SearchView;
