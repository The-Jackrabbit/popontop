import { Album } from '../../../../types/Albums';
import ListRow, { ListRowMode } from '../../../lib/Mobile/ListRow/ListRow';
import { RowMovementType } from '../../../lib/Mobile/ListRow/RearrangeView/RearrangeView';

export interface Props {
  list: Album[];
  listMode: ListRowMode;
  onRearrangeClick: (rowMovementType: RowMovementType, index: number) => void;
  removeAlbumAtIndex: (index: number) => void;
  showAlbums: boolean;
  textColor: string;
}

const List: React.FC<Props> = ({
  list,
  listMode,
  onRearrangeClick,
  removeAlbumAtIndex,
  showAlbums,
  textColor,
}) => (
  <div
    className={`
      ${list.length > 5 ? 'pb-[270px]' : ''}
      z-10
      mt-4
      h-[calc(100vh_-_10px)]
      overflow-y-scroll
    `}
  >
    <div className="overflow-x-hidden">
      {list.map((album, index) => (
        <ListRow
          album={album}
          index={index}
          key={JSON.stringify(album) + index}
          isLastRowInList={index === list.length - 1}
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
