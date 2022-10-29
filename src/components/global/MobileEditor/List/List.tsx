import { Album } from "../../../../types/Albums";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow from "../../../lib/Mobile/ListRow/ListRow";

export interface Props {
  isInteractive?: boolean;
  list: Album[];
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  lowerAlbumAtIndex: (index: number) => void;
}

const List: React.FC<Props> = ({ isInteractive = true ,list, removeAlbumAtIndex, advanceAlbumAtIndex, lowerAlbumAtIndex}) => {
  // const overflowSetting = list.length > 10 ? ' overflow-y-scroll' : '';
  return (
    <div className="pb-[280px] mt-2 h-screen dark:bg-neutral-900  overflow-y-scroll" id="mobile-chart">
      <div className=" overflow-x-hidden">
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
          />
        ))}
      </div>
    </div>
  );
};

export default List;
