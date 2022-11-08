import { Album } from "../../../../types/Albums";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow from "../../../lib/Mobile/ListRow/ListRow";
import { useState } from "react";

export interface Props {
  isInteractive?: boolean;
  list: Album[];
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  lowerAlbumAtIndex: (index: number) => void;
}

const List: React.FC<Props> = ({ isInteractive = true ,list, removeAlbumAtIndex, advanceAlbumAtIndex, lowerAlbumAtIndex}) => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  return (
    <div className={`
      ${list.length > 10 ? 'pb-[70px]' : ''}
         h-[calc(100vh_-_10px)]
      dark:bg-neutral-900  overflow-y-scroll
      mt-[200px] -translate-y-32 z-10
      `}
      // style={{ overflowY: isScrollDisabled ? 'hidden' :s 'scroll' }}
    >
      <div className="overflow-x-hidden">
        {list.map((album, index) => (
          <ListRow
            key={JSON.stringify(album) + index}
            album={album}
            index={index}
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
