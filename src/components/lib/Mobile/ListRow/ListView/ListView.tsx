import React from "react";
import Image from 'next/image';
import { Album } from '../../../../../types/Albums';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/use-disappear-row";

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
  <div
      className="
        w-full
        flex justify-between
      "
    >
    <div
      className="
        text-xs basis-1/12 
        w-12
        flex flex-col shrink-0 justify-center content-center items-center
      "
    >
      <p>{ index + 1 }</p>
    </div>
    <div className="basis-2/12 justify-start">
      <Image width={ROW_HEIGHT} height={ROW_HEIGHT} src={album.imageUrl} alt={album.artist} />
    </div>
    <div
      style={{ color: textColor }}
      className="basis-8/12 content-start grow-0 overflow-x-hidden justify-end flex flex-col"
    >
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
    <div className="basis-1/12"></div>
  </div>
);

export default ListView;
