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
  children,
  isLastRowInList = true,
  removeSelfFromList = () => undefined,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [layerActionText, setlayerActionText] = useState('🗑')
  const [style, animate] = useSpring(() => ({
    height: "50px",
    onRest: () => {
      removeSelfFromList();
    }
  }), []);

  const toggleRowVisibility = () => {

    setIsBreakVisible(false);
    animate({
      height: "0px",
    });
  }

  const [{ x, bg, height, justifySelf }, api] = useSpring(() => ({
    x: 0,
    height: 50,
    ...left,
  }))
  const bind = useDrag(({ active, cancel, movement: [mx, my] }) => {
    if (!isIntentionalXAxisGesture(mx, my)) {
      return;
    }

    if (layerActionText === '🗑' && mx > 0) {
      setlayerActionText('ℹ️');
    }

    if (layerActionText === 'ℹ️' && mx < 0) {
      setlayerActionText('🗑');
    }

    const swipelengthThresholdToMoveCard = 50;
    if (!active && mx < 0 && Math.abs(mx) > swipelengthThresholdToMoveCard) {
      toggleRowVisibility();
      setlayerActionText('');
      api.start({
        x: 400,
        height: 0,
        immediate: true,
      });
      cancel();
      return;
    }


    if (!active && mx > 0 && Math.abs(mx) > swipelengthThresholdToMoveCard) {
      alert(JSON.stringify({...album, mx }))
      // cancel();
      api.start({
        x: 0,
        ...(mx < 0 ? left : right),
        immediate: true,
      });
      return;
    }

    api.start({
      x: active ? mx : 0,
      ...(mx < 0 ? left : right),
      immediate: name => active && name === 'x',
    });
  });

  const avSize = x.to({
    map: Math.abs,
    range: [50, 300],
    output: [1, 1],
    extrapolate: 'clamp',
  })

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
        <animated.div style={{ scale: avSize, justifySelf }}>
          {layerActionText}
        </animated.div>
        <animated.div

        ref={ref}
          className={`
            absolute
            bg-neutral-100 dark:bg-neutral-900
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
            {/* <button
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
            </button> */}
          </div>
        </animated.div>
      </animated.div>
      {isBreakVisible && (<hr className="my-1 border-neutral-300 dark:border-neutral-600" />)}
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