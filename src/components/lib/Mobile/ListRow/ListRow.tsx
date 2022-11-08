import { animated } from '@react-spring/web'
import React, { useState } from "react";
import Image from 'next/image';
import { Album } from '../../../../types/Albums';
import { useRowSwipeActions } from '../../../../frontend/hooks/use-row-swipe-actions';
import { useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';

export interface Props {
  album: Album;
  isLastRowInList?: boolean;
  index?: number;
  isInteractive: boolean;
  removeSelfFromList?: () => void;
  onAdvanceAlbumAtIndex: (index: number) => void;
  onLowerAlbumAtIndex: (index: number) => void;
  setIsScrollDisabled: (value: boolean) => void;
  toggleRearrangeView: () => void;
}

export const ListRow: React.FC<Props> = ({
  album,
  index = 0,
  isInteractive,
  isLastRowInList = true,
  onAdvanceAlbumAtIndex,
  onLowerAlbumAtIndex,
  removeSelfFromList = () => undefined,
  setIsScrollDisabled,
  toggleRearrangeView,
}) => {
  const {
    isBreakVisible,
    style,
    toggleRowVisibility,
  } = useDisappearRow( { frequency: 10 , isLastRowInList, onClick: () => undefined });

  const leftSwipeAction = () => {
    toggleRowVisibility();
    removeSelfFromList();
  };

  const rightSwipeAction = () => {
    alert(JSON.stringify(album));
  };

  const {
    bind,
    layerActionText,
    x, bg, height, justifySelf,
  } = useRowSwipeActions({
    setIsScrollDisabled,
    leftSwipeAction,
    rightSwipeAction,
  });

  return (
    <>
      <animated.div 
        {...bind()}
        className="
          touch-pan-x
          px-6 h-12
          relative 
          grid items-center
          origin-[50%_50%_0px]
        "
        style={{
          background: bg,
          ...style,
        }}
      >
        <animated.div style={{ justifySelf }}>
          {layerActionText}
        </animated.div>
        <animated.div
          className={`
            absolute
            bg-neutral-50 dark:bg-neutral-900
            h-[50px]
            overflow-hidden w-full
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between
            gap-2 my-0
          `}
          style={isInteractive ? {
            x,
            height,
          }: {}}
        >
          <div className="text-xs basis-4 grow-0 flex flex-col justify-center content-center items-center">
            {isInteractive ?
            <button onClick={() => onAdvanceAlbumAtIndex(index)}>▲</button>
            : null}
            <p>{index+1}</p>
            {isInteractive ? <button onClick={() => onLowerAlbumAtIndex(index)}>▼</button> : null}
          </div>
          <div className="basis-12 grow-0">
            <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
          </div>

          <div className="grow-[2] content-start justify-end flex flex-col">
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.artist}</p>
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.name}</p>
          </div>

          <div
            className="grow-0 flex items-center"
            onClick={toggleRearrangeView}
          >
            🧤
          </div>
        </animated.div>
      </animated.div>
      {isBreakVisible && (<hr className="my-1 border-neutral-200 dark:border-neutral-800" />)}
    </>
  )
}

export default ListRow;
