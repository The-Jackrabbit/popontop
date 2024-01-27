import { a } from '@react-spring/web';
import React from 'react';
import { Album } from '../../../../types/Albums';
import {
  ROW_HEIGHT,
  ROW_HEIGHT_WITH_UNIT,
  useDisappearRow,
} from '../../../../frontend/hooks/springs/use-disappear-row';
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
  index?: number;
  isLastRowInList?: boolean;
  mode: ListRowMode;
  onClick?: () => void;
  onRearrangeClick?: (rowMovementType: RowMovementType) => void;
  removeSelfFromList?: () => void;
  showEntries: boolean;
  textColor?: string | null;
}

export const ListRow: React.FC<Props> = ({
  album,
  index = 0,
  isLastRowInList = true,
  mode,
  onClick,
  onRearrangeClick,
  removeSelfFromList = () => undefined,
  showEntries,
  textColor,
}) => {
  const initialHeight = ROW_HEIGHT;
  const { style, toggleRowVisibility } = useDisappearRow({
    initialHeight,
    isLastRowInList,
    onClick: () => undefined,
  });

  return (
    <>
      <a.div
        className="
          relative
          mb-2 grid
          origin-[50%_50%_0px] 
          touch-pan-x items-center
          overflow-hidden
          px-6
        "
        style={{ ...style }}
      >
        <div
          className={`
            absolute ${ROW_HEIGHT_WITH_UNIT}
            my-0 flex 
            w-full
            justify-between gap-2
            overflow-hidden text-neutral-900 last-of-type:border-b-0
            dark:text-neutral-50
          `}
        >
          {mode === ListRowMode.NORMAL ? (
            <ListView
              album={album}
              textColor={textColor}
              index={index}
              showEntries={showEntries}
            />
          ) : null}
          {mode === ListRowMode.REARRANGE && onRearrangeClick ? (
            <RearrangeView
              album={album}
              index={index}
              onClick={onRearrangeClick}
              showEntries={showEntries}
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
              showEntries={showEntries}
              textColor={textColor ?? ''}
              onClick={() => {
                removeSelfFromList();
              }}
            />
          ) : null}
        </div>
      </a.div>
      {/* {isBreakVisible && (<hr className="my-1 border-neutral-200 dark:border-transparent" />)} */}
    </>
  );
};

export default ListRow;
