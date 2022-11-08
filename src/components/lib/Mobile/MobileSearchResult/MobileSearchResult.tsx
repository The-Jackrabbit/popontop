import { animated } from '@react-spring/web'
import React from "react";
import Image from 'next/image';
import { Album } from '../../../../types/Albums';
import { useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';

export interface Props {
  album: Album;
  isLastRowInList: boolean;
  onClick: () => void;
}

export const MobileSearchResult: React.FC<Props> = ({
  album,
  isLastRowInList,
  onClick,
}) => {
  const  {
    isBreakVisible,
    style,
    toggleRowVisibility,
  } = useDisappearRow({
    isLastRowInList,
    onClick,
  });

  return (
    <>
      <animated.div
        style={style}
        className={`
          bg-neutral-100 dark:bg-neutral-800
          overflow-hidden w-full
          last-of-type:border-b-0
          text-neutral-900 dark:text-neutral-50
          flex justify-between
          gap-2 my-0
        `}
      >
        <div className="basis-12 grow-0">
          <Image
            width="50"
            height="50"
            src={album.imageUrl}
            alt={album.artist}
          />
        </div>

        <div className="grow-[2] content-start justify-end flex flex-col">
          <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.artist}</p>
          <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.name}</p>
        </div>

        <div className="basis-[30%] justify-end grow-0 flex items-center" 
            onClick={() => toggleRowVisibility()}>
          <button
            className="
              border
              h-6 w-6 p-0 text-sm
              rounded-full
              hover:bg-rose-300
              border-neutral-400 dark:border-neutral-400 hover:border-rose-300
              text-neutral-400 dark:text-neutral-400 hover:text-neutral-50 
            "
          >
            +
          </button>
        </div>

      </animated.div>
      {isBreakVisible && (<hr className="my-1 border-neutral-300 dark:border-neutral-600" />)}
    </>
  )
}

export default MobileSearchResult;
