import { Album } from "../../../../types/Albums";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow, { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import { useState } from "react";
import { RowMovementType } from "../../../lib/Mobile/ListRow/RearrangeView/RearrangeView";

export interface Props {
  currentValue?: number | null;
  isInteractive?: boolean;
  list: Album[];
  textColor: string;
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  listMode: ListRowMode;
  lowerAlbumAtIndex: (index: number) => void;
  onRearrangeClick: (rowMovementType: RowMovementType, index: number) => void;
}

const List: React.FC<Props> = ({ 
  currentValue = null,
  isInteractive = true ,
  list,
  listMode,
  textColor,
  removeAlbumAtIndex,
  advanceAlbumAtIndex,
  lowerAlbumAtIndex,
  onRearrangeClick,
}) => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  return (
    <div className={`
      ${list.length > 5 ? 'pb-[270px]' : ''}
        h-[calc(100vh_-_10px)]
        overflow-y-scroll
        mt-[200px] -translate-y-32 z-10
      `}
      // style={{scrollb}}
    >
      <div className="overflow-x-hidden">
        {list.map((album, index) => (
          <ListRow
            isDragged={currentValue === index}
            textColor={textColor}
            key={JSON.stringify(album) + index}
            album={album}
            index={index}
            mode={listMode}
            isInteractive={isInteractive}
            isLastRowInList={index === ALBUM_RESULTS.length - 1}
            removeSelfFromList={() => removeAlbumAtIndex(index)}
            onAdvanceAlbumAtIndex={() => advanceAlbumAtIndex(index)}
            onLowerAlbumAtIndex={() => lowerAlbumAtIndex(index)}
            onRearrangeClick={(rowMovementType: RowMovementType) => onRearrangeClick(rowMovementType, index)}
            setIsScrollDisabled={setIsScrollDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
