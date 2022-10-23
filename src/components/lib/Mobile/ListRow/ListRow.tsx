// import { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
// import { useDrag, Vector2 } from '@use-gesture/react'
// import clamp from 'lodash.clamp'
// import { isIntentionalXAxisGesture } from '../../../utils/directions';
// import '../../../styles/globals.css';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Album } from '../../../../types/Albums';

export interface Props {
  album: Album;
  children: React.ReactNode;
  isLastRowInList?: boolean;
  removeSelfFromList?: () => void;
}

export const ListRow: React.FC<Props> = ({
  album,
  children,
  isLastRowInList = true,
  removeSelfFromList = () => undefined,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [style, animate] = useSpring(() => ({
    height: "50px",
    onRest: () => {
      setIsBreakVisible(false);
      removeSelfFromList();
    }
  }), []);
 
  /**
   * The HTMLElement.offsetHeight read-only property returns the height of an element,
   * including vertical padding and borders, as an integer.
   */
  // useEffect(() => {
    
  // }, [animate, ref, toggle, isLastRowInList]);

  const toggleRowVisibility = () => {
    animate({
      height: "0px",
    });
  }

  return (
    <>
      <div className="h-full">
        <animated.div
          className={`
            h-8 xs:h-12 sm:h-14 md:h-16 lg:h-18
            overflow-hidden w-full
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between
            gap-2 my-1
          `}
          style={{
            ...style,
          }}
          ref={ref}
        >
          <div className="basis-12 grow-0">
            <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
          </div>

          <div className="grow-[2] content-start justify-end flex flex-col">
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.artist}</p>
            <p className="text-xs overflow-x-hidden whitespace-nowrap">{album.name}</p>
          </div>

          <div className="grow-0 flex items-center">
            <button
              onClick={() => toggleRowVisibility()}
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
      </div>
      {isBreakVisible && (<hr className="border-neutral-300 dark:border-neutral-600" />)}
    </>
  )
}

export default ListRow;

export const getBottomBorderWidth = (toggle: boolean, isLastRowInList: boolean): string => {
  if (isLastRowInList) {
    return '0px'
  }

  return  toggle ? '1px' : '0px';
}