import React, { useEffect } from "react";
import Image from 'next/image';
import { Album } from '../../../../../styles/types/Albums';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/use-disappear-row";
import FilterButton, { ICON_STYLE } from "../../../FilterButton/FilterButton.tsx/FilterButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { a, config, useSpring } from "react-spring";

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
}) => {
  const [rotateX, animateRotationY] = useSpring(() => ({
    rotateX: '90deg',
    config: config.wobbly
  }))

  useEffect(() => {
    animateRotationY.start({ rotateX: '0deg' });
  }, [animateRotationY]);

  return (
    <div
      className="
        w-full
        flex justify-between
      "
    >
      {showAlbums && (

      <div
        className="
        text-xs basis-1/12 
          w-12
          flex flex-col shrink-0 justify-center content-center items-center
          "
          >
        <p>{ index + 1 }</p>
      </div>
        )}
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
        <p
          className="font-sans text-xs overflow-x-hidden whitespace-nowrap"
        >
          {album.artist}
        </p>
        <p
          className="text-xs overflow-x-hidden whitespace-nowrap"
        >
          {album.name}
        </p>
      </div>

      <a.button
      className="basis-3/12  justify-center grow-0 flex items-center bg-red-600" 
      onClick={() => onClick()}
      style={{...rotateX}}
      >
      <XMarkIcon className={ICON_STYLE} />
      </a.button>
    </div>
  );
}

export default DeleteView;

