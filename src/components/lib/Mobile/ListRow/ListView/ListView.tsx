import React from "react";
import Image from 'next/image';
import { Album } from '../../../../../types/Albums';

export interface Props {
  album: Album;
  index?: number;
  textColor: string;
}

export const ListView: React.FC<Props> = ({
  album,
  index = 0,
  textColor,
}) => (
  <>
    <div
      className="
        text-xs 
        flex flex-col basis-4 grow-0 justify-center content-center items-center
      "
    >
      {/* {isInteractive ?
        // <button onClick={() => onAdvanceAlbumAtIndex(index)}>▲</button>
        : null
      } */}
      <p>{ index + 1 }</p>
      {/* {isInteractive
        ? <button onClick={() => onLowerAlbumAtIndex(index)}>▼</button>
        : null
      } */}
    </div>
    <div className="basis-12 grow-0">
      <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
    </div>

    <div
      style={{ color: textColor }}
      className="grow-[2] content-start justify-end flex flex-col">
      <p
        style={{ color: textColor }}
        className="font-sans text-xs overflow-x-hidden whitespace-nowrap"
      >
        {album.artist}
      </p>
      <p
        style={{ color: textColor }}
        className="text-xs overflow-x-hidden whitespace-nowrap"
      >
        {album.name}
      </p>
    </div>

    <div
      className="grow-0 flex items-center"
      // onClick={() => openRearrangeView(index)}
    >
      {/* 🧤 */}
    </div>
  </>
);

export default ListView;
