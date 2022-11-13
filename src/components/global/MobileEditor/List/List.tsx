import { Album } from "../../../../types/Albums";
import { ALBUM_RESULTS } from "../../../../constants/test-data/search-results";
import ListRow, { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import { RowMovementType } from "../../../lib/Mobile/ListRow/RearrangeView/RearrangeView";

export interface Props {
  currentValue?: number | null;
  isInteractive?: boolean;
  list: Album[];
  listMode: ListRowMode;
  onRearrangeClick: (rowMovementType: RowMovementType, index: number) => void;
  removeAlbumAtIndex: (index: number) => void;
  showAlbums: boolean;
  textColor: string;
}

const List: React.FC<Props> = ({ 
  currentValue = null,
  isInteractive = true ,
  list,
  listMode,
  onRearrangeClick,
  removeAlbumAtIndex,
  showAlbums,
  textColor,
}) => (
  <div className={`
    ${list.length > 5 ? 'pb-[270px]' : ''}
      h-[calc(100vh_-_10px)]
      overflow-y-scroll
       z-10
    `}
    // style={{scrollb}}
  >
    <div className="overflow-x-hidden">
      {list.map((album, index) => (
        <ListRow
          album={album}
          index={index}
          key={JSON.stringify(album) + index}
          isDragged={currentValue === index}
          isInteractive={isInteractive}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          mode={listMode}
          onRearrangeClick={(rowMovementType: RowMovementType) => 
            onRearrangeClick(rowMovementType, index)
          }
          removeSelfFromList={() => removeAlbumAtIndex(index)}
          showAlbums={showAlbums}
          textColor={textColor}
        />
      ))}
    </div>
  </div>
);


export default List;
