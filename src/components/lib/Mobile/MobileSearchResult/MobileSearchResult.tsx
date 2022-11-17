import { animated } from '@react-spring/web'
import React from "react";
import { Album } from '../../../../styles/types/Albums';
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
          bg-neutral-100 dark:bg-transparent
          overflow-hidden w-full
          last-of-type:border-b-0
          text-neutral-900 dark:text-neutral-50
          flex justify-between
          gap-2 my-0
        `}
      >
      </animated.div>
      {isBreakVisible && (<hr className="my-1 border-neutral-300 dark:border-neutral-600" />)}
    </>
  )
}

export default MobileSearchResult;
