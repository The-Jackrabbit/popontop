import React from "react";
import Image from 'next/image';
import { Album } from '../../../../../styles/types/Albums';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/springs/use-disappear-row";
import { DeleteRowButton } from "../../Row/DeleteRowButton/DeleteRowButton";

export interface Props {
  album: Album;
  index: number;
  onClick: () => void;
  showAlbums: boolean;
  textColor: string;
}

export const DeleteView: React.FC<Props> = ({
  album,
  index,
  onClick,
  showAlbums,
  textColor,
}) => ( 
  <div className="w-full flex justify-between">
    {showAlbums ? (
      <div
        className="
          text-xs
          basis-1/12 
          w-12
          flex flex-col shrink-0 justify-center content-center items-center
        "
      >
        <p>{ index + 1 }</p>
      </div>
    ): null}
    <div className="basis-2/12 justify-start">
      <Image
        width={ROW_HEIGHT}
        height={ROW_HEIGHT}
        src={album.imageUrl}
        alt={album.artist}
      />
    </div>
    <div
      style={textColor? { color: textColor } : {}}
      className="basis-6/12 content-start grow-0 overflow-x-hidden justify-end flex flex-col"
    >
      <p className="font-sans text-xs overflow-x-hidden whitespace-nowrap">
        {album.artist}
      </p>
      <p className="text-xs overflow-x-hidden whitespace-nowrap">
        {album.name}
      </p>
    </div>

    <DeleteRowButton onClick={onClick}/>
  </div>
);

export default DeleteView;
