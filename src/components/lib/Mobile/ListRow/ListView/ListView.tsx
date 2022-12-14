import React from 'react';
import { Album } from '../../../../../styles/types/Albums';
import { ROW_HEIGHT } from '../../../../../frontend/hooks/springs/use-disappear-row';

export interface Props {
  album: Album;
  index?: number;
  showAlbums: boolean;
  textColor?: string;
}

export const ListView: React.FC<Props> = ({
  album,
  showAlbums,
  index = 0,
  textColor = null,
}) => (
  <div
    className="
      flex
      w-full justify-between
    "
  >
    {showAlbums && (
      <div
        className="
          flex w-12 
          shrink-0
          basis-1/12 flex-col content-center items-center justify-center text-xs
        "
      >
        <p>{index + 1}</p>
      </div>
    )}
    <div className="basis-2/12 justify-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={ROW_HEIGHT}
        height={ROW_HEIGHT}
        src={album.imageUrl}
        alt={album.artist}
      />
    </div>
    <div
      style={textColor ? { color: textColor } : {}}
      className="flex grow-0 basis-8/12 flex-col content-start justify-end overflow-x-hidden pl-3"
    >
      <p
        style={textColor ? { color: textColor } : {}}
        className="overflow-x-hidden whitespace-nowrap font-sans text-xs"
      >
        {album.artist}
      </p>
      <p
        style={textColor ? { color: textColor } : {}}
        className="overflow-x-hidden whitespace-nowrap text-xs"
      >
        {album.name}
      </p>
    </div>
    <div className="basis-1/12"></div>
  </div>
);

export default ListView;
