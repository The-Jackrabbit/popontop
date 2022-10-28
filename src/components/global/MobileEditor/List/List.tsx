import { Album } from "../../../../types/Albums";
import Image from "next/image";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow from "../../../lib/Mobile/ListRow/ListRow";

export interface Props {
  list: Album[];
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  lowerAlbumAtIndex: (index: number) => void;
}

const List: React.FC<Props> = ({ list, removeAlbumAtIndex, advanceAlbumAtIndex, lowerAlbumAtIndex}) => {
  return (
    <div className="pb-[280px] mt-2 h-screen dark:bg-neutral-900  overflow-y-scroll" id="mobile-chart">
      <div className=" overflow-x-hidden">
        {list.map((album, index) => (
          <ListRow
            key={JSON.stringify(album) + index}
            album={album}
            isLastRowInList={index === ALBUM_RESULTS.length - 1}
            removeSelfFromList={() => removeAlbumAtIndex(index)}
          >
          </ListRow>
        ))}
      </div>
    </div>
  );
};

export default List;
