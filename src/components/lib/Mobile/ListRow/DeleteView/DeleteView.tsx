import React from 'react';
import Image from 'next/image';
import { Album } from '../../../../../types/Albums';
import { ROW_HEIGHT } from '../../../../../frontend/hooks/springs/use-disappear-row';
import { DeleteRowButton } from '../../Row/DeleteRowButton/DeleteRowButton';

export interface Props {
  album: Album;
  index: number;
  onClick: () => void;
  showEntries: boolean;
  textColor: string;
}

export const DeleteView: React.FC<Props> = ({
  album,
  index,
  onClick,
  showEntries,
  textColor,
}) => (
  <div className="flex w-full justify-between">
    {showEntries ? (
      <div
        className="
          flex
          w-12 
          shrink-0
          basis-1/12 flex-col content-center items-center justify-center text-xs
        "
      >
        <p>{index + 1}</p>
      </div>
    ) : null}
    <div className="basis-2/12 justify-start">
      <Image
        width={ROW_HEIGHT}
        height={ROW_HEIGHT}
        src={album.imageUrl}
        alt={album.artist}
      />
    </div>
    <div
      style={textColor ? { color: textColor } : {}}
      className="flex grow-0 basis-6/12 flex-col content-start justify-end overflow-x-hidden pl-3"
    >
      <p className="overflow-x-hidden whitespace-nowrap font-sans text-xs">
        {album.artist}
      </p>
      <p className="overflow-x-hidden whitespace-nowrap text-xs">
        {album.name}
      </p>
    </div>

    <DeleteRowButton onClick={onClick} />
  </div>
);

export default DeleteView;
