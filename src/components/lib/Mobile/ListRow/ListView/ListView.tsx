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
  <>
    <div
      className="
        text-xs 
        flex flex-col basis-4 grow-0 justify-center content-center items-center
      "
    >
      <p>{ index + 1 }</p>
    </div>
    <div className="">
      <Image width={ROW_HEIGHT} height={ROW_HEIGHT} src={album.imageUrl} alt={album.artist} />
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

    <div className="grow-0 flex items-center" />
  </>
);

export default ListView;
