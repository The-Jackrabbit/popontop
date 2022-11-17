import { a } from '@react-spring/web'
import React from "react";
import { Album } from '../../../../styles/types/Albums';
import { useRowSwipeActions } from '../../../../frontend/hooks/use-row-swipe-actions';
import { ROW_HEIGHT, ROW_HEIGHT_WITH_UNIT, useDisappearRow } from '../../../../frontend/hooks/use-disappear-row';
import ListView from './ListView/ListView';
import RearrangeView, { RowMovementType } from './RearrangeView/RearrangeView';
import SearchView from './SearchView/SearchView';
import DeleteView from './DeleteView/DeleteView';

export enum ListRowMode {
  DELETE = 'DELETE',
  NORMAL = 'NORMAL',
  REARRANGE = 'REARRANGE',
  SEARCH = 'SEARCH',
}

export interface Props {
  album: Album;
  isDragged: boolean;
  isLastRowInList?: boolean;
  index?: number;
  isInteractive: boolean;
  mode: ListRowMode;
  textColor?: string;
  removeSelfFromList?: () => void;
  onClick?: () => void;
  onRearrangeClick?: (rowMovementType: RowMovementType) => void;
  showAlbums: boolean;
}

export const ListRow: React.FC<Props> = ({
  album,
  index = 0,
  isInteractive,
  isLastRowInList = true,
  mode,
  onClick,
  onRearrangeClick,
  removeSelfFromList = () => undefined,
  showAlbums,
  textColor,
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
              showAlbums={showAlbums}
            />
          ) : null}
          {mode === ListRowMode.REARRANGE && onRearrangeClick ? (
            <RearrangeView
              album={album}
              index={index}
              onClick={onRearrangeClick}
              showAlbums={showAlbums}
            />
          ) : null}
           {mode === ListRowMode.SEARCH && onClick ? (
            <SearchView
              album={album}
              onClick={() => {
                onClick();
                toggleRowVisibility();
              }}
            />
          ) : null}
          {mode === ListRowMode.DELETE ? (
            <DeleteView
              album={album}
              index={index}
              showAlbums={showAlbums}
              textColor={textColor ?? ''}
              onClick={() => {
                removeSelfFromList();
              }}
            />
          ) : null}
          
        </a.div>
      </a.div>
       {isBreakVisible && (<hr className="my-1 border-neutral-200 dark:border-transparent" />)}
    </>
  )
}

export default ListRow;
