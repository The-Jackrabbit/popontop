// import { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
// import { useDrag, Vector2 } from '@use-gesture/react'
// import clamp from 'lodash.clamp'
// import { isIntentionalXAxisGesture } from '../../../utils/directions';
// import '../../../styles/globals.css';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Album } from '../../../../types/Albums';
import { useDrag } from '@use-gesture/react';
import { isIntentionalXAxisGesture } from '../../../../utils/directions';
import { useRowSwipeActions } from '../../../../frontend/hooks/use-row-swipe-actions';
import { useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: 'end',
}
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: 'start',
}

export interface Props {
  album: Album;
  children: React.ReactNode;
  isLastRowInList?: boolean;
  removeSelfFromList?: () => void;
}

export const ListRow: React.FC<Props> = ({
  album,
  isLastRowInList = true,
  removeSelfFromList = () => undefined,
}) => {
  const {
    isBreakVisible,
    style,
    toggleRowVisibility,
  } = useDisappearRow( {isLastRowInList, onClick: () => undefined });

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
          style={{
            x,
            height,
          }}
        >
          <div className="basis-12 grow-0">
            <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
          </div>

          <div className="grow-[2] content-start justify-end flex flex-col">
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.artist}</p>
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.name}</p>
          </div>

          <div className="grow-0 flex items-center">
            
          </div>
        </animated.div>
      </animated.div>
      {isBreakVisible && (<hr className="my-1 border-neutral-300 dark:border-neutral-600" />)}
    </>
  )
}

export default ListRow;
