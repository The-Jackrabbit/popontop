import { Album } from "../../../../types/Albums";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow from "../../../lib/Mobile/ListRow/ListRow";
import { useState } from "react";

export interface Props {
  currentValue?: number | null;
  isInteractive?: boolean;
  list: Album[];
  textColor: string;
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  lowerAlbumAtIndex: (index: number) => void;
  openRearrangeView: (indexToBeginAltering: number) => void;
}

const List: React.FC<Props> = ({ 
  currentValue = null,
  isInteractive = true ,
  list,
  textColor,
  removeAlbumAtIndex,
  advanceAlbumAtIndex,
  lowerAlbumAtIndex,
  openRearrangeView,
}) => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  return (
    <div className={`
      ${list.length > 10 ? 'pb-[270px]' : ''}
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
            openRearrangeView={() => openRearrangeView(index)}
            isInteractive={isInteractive}
            isLastRowInList={index === ALBUM_RESULTS.length - 1}
            removeSelfFromList={() => removeAlbumAtIndex(index)}
            onAdvanceAlbumAtIndex={() => advanceAlbumAtIndex(index)}
            onLowerAlbumAtIndex={() => lowerAlbumAtIndex(index)}
            setIsScrollDisabled={setIsScrollDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
