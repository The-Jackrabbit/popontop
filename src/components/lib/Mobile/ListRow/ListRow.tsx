import { a } from '@react-spring/web'
import React from "react";
import { Album } from '../../../../types/Albums';
import { useRowSwipeActions } from '../../../../frontend/hooks/use-row-swipe-actions';
import { ROW_HEIGHT, ROW_HEIGHT_WITH_UNIT, useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';
import ListView from './ListView/ListView';
import RearrangeView, { RowMovementType } from './RearrangeView/RearrangeView';

export enum ListRowMode {
  DELETE = 'DELETE',
  NORMAL = 'NORMAL',
  REARRANGE = 'REARRANGE',
}

export interface Props {
  album: Album;
  isDragged: boolean;
  isLastRowInList?: boolean;
  index?: number;
  isInteractive: boolean;
  mode: ListRowMode;
  textColor: string;
  removeSelfFromList?: () => void;
  onAdvanceAlbumAtIndex: (index: number) => void;
  onLowerAlbumAtIndex: (index: number) => void;
  onRearrangeClick: (rowMovementType: RowMovementType) => void;
  setIsScrollDisabled: (value: boolean) => void;
}

export const ListRow: React.FC<Props> = ({
  album,
  index = 0,
  mode,
  textColor,
  isInteractive,
  isLastRowInList = true,
  onRearrangeClick,
  removeSelfFromList = () => undefined,
  setIsScrollDisabled,
}) => {
  const initialHeight = ROW_HEIGHT;
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

  const { bind, bg, isActionLayerVisible, x } = useRowSwipeActions({
    setIsScrollDisabled,
    leftSwipeAction,
    rightSwipeAction,
  });

  const binding = mode === ListRowMode.NORMAL ? bind() : {};

  return (
    <>
      <a.div
        {...binding}
        className="
          touch-pan-x
          px-6
          relative 
          grid items-center
          origin-[50%_50%_0px]

          overflow-hidden
        "
        style={{ background: bg, ...style }}
      >
        <div
          className={`
            ${isActionLayerVisible ? 'opacity-100' : 'opacity-0'}
            flex justify-between
          `}
        >
          <div>💿</div>
          <div>🗑</div>
        </div>
        <a.div
          className={`
            absolute ${ROW_HEIGHT_WITH_UNIT}
            w-full overflow-hidden 
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between gap-2
            my-0
          `}
          style={isInteractive ? { x } : {}}
        >
          {mode === ListRowMode.NORMAL ? (
            <ListView
              album={album}
              textColor={textColor}
              index={index}
            />
          ) : null}
          {mode === ListRowMode.REARRANGE ? (
            <RearrangeView
              album={album}
              index={index}
              onClick={onRearrangeClick}
            />
          ) : null}
        </a.div>
      </a.div>
       {isBreakVisible && (<hr className="my-1 border-neutral-200 dark:border-transparent" />)}
    </>
  )
}

export default ListRow;
