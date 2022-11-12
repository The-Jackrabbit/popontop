import { a } from '@react-spring/web'
import React from "react";
import { Album } from '../../../../types/Albums';
import { useRowSwipeActions } from '../../../../frontend/hooks/use-row-swipe-actions';
import { useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';
import ListView from './ListView/ListView';

export interface Props {
  album: Album;
  isDragged: boolean;
  isLastRowInList?: boolean;
  index?: number;
  isInteractive: boolean;
  textColor: string;
  removeSelfFromList?: () => void;
  onAdvanceAlbumAtIndex: (index: number) => void;
  onLowerAlbumAtIndex: (index: number) => void;
  setIsScrollDisabled: (value: boolean) => void;
  openRearrangeView:  (index: number) => void;
}

export const ListRow: React.FC<Props> = ({
  album,
  index = 0,
  textColor,
  isInteractive,
  isLastRowInList = true,
  onAdvanceAlbumAtIndex,
  onLowerAlbumAtIndex,
  removeSelfFromList = () => undefined,
  setIsScrollDisabled,
  openRearrangeView,
}) => {
  const initialHeight = 50;
  const { isBreakVisible, style, toggleRowVisibility } = useDisappearRow({
    initialHeight,
    isLastRowInList,
    onClick: () => undefined
  });

  const leftSwipeAction = () => {
    toggleRowVisibility();
    removeSelfFromList();
  };

  const rightSwipeAction = () => {
    alert(JSON.stringify(album));
  };

  const { bind, bg, x } = useRowSwipeActions({
    setIsScrollDisabled,
    leftSwipeAction,
    rightSwipeAction,
  });

  return (
    <>
      <a.div 
        {...bind()}
        className="
          touch-pan-x
          px-6
          relative 
          grid items-center
          origin-[50%_50%_0px]
          bg-neutral-900
          overflow-hidden
        "
        style={{ background: bg, ...style }}
      >
        <div className='flex justify-between'>
          <div>💿</div>
          <div>🗑</div>
        </div>
        <a.div
          className="
            absolute h-[55px]
            bg-neutral-200 dark:bg-neutral-900
            w-full overflow-hidden 
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between gap-2
            my-0
          "
          style={isInteractive ? { x } : {}}
        >
          <ListView
            album={album}
            textColor={textColor}
            index={index}
          />
        </a.div>
      </a.div>
       {isBreakVisible && (<hr className="my-1 border-neutral-200 dark:border-transparent" />)}
    </>
  )
}

export default ListRow;
