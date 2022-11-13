import React from "react";
import Image from 'next/image';
import { Album } from '../../../../../types/Albums';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/use-disappear-row";
import FilterButton, { ICON_STYLE } from "../../../FilterButton/FilterButton.tsx/FilterButton";
import { PlusIcon } from "@heroicons/react/20/solid";
import { a } from "react-spring";

export interface Props {
  album: Album;
  onClick: () => void;
}

export const SearchView: React.FC<Props> = ({
  album,
  onClick,
}) => (
  <a.div
    className="
      w-full
      flex justify-between
      active:dark:bg-[#121212]
    "
  >
  <div className="basis-2/12 max-w-[60px] justify-start">
    <Image
      height={ROW_HEIGHT}
      width={ROW_HEIGHT}
      src={album.imageUrl}
      alt={album.artist}
    />
  </div>

  <div
    className="
      basis-8/12 grow-0
      overflow-x-hidden
      pl-2
      content-start justify-end flex flex-col
    "
  >
    <p className="text-xs overflow-x-hidden whitespace-nowrap">
      {album.artist}
    </p>
    <p className="text-xs overflow-x-hidden whitespace-nowrap">
      {album.name}
    </p>
  </div>
  <div className="grow-1 shrink-0 basis-1/12"></div>
  <div
    className="basis-3/12 justify-end grow-0 flex items-center" 
    onClick={() => undefined}
  >
    <FilterButton
      fromColor="darkgray"
      toColor="darkgray"
      onClick={onClick}
    >
      <PlusIcon className={ICON_STYLE} />
    </FilterButton>
  </div>
  </a.div>
);

export default SearchView;
