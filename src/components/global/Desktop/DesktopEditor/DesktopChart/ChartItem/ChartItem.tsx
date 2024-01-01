import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';
import { Album } from '../../../../../../types/Albums';
import DraggableAlbum from '../../DragNDrop/Draggable/DraggableAlbum';
import { EMPTY_ALBUM } from '../../../../../../constants/empty-album';

export interface Props {
  album: Album;
  index: number;
  borderColor: string;
  albumsInRow: number;
  borderSizes: string;
  isReadOnly: boolean;
}

export const ChartItem: React.FC<Props> = ({
  album,
  albumsInRow,
  borderColor,
  index,
  isReadOnly,
}) => (
  <ChartItemDropZone
    albumsInRow={albumsInRow}
    id={index.toString()}
    index={index}
    style={{
      borderColor,
      lineHeight: '0px',
    }}
  >
    {album.imageUrl ? (
      <DraggableAlbum
        albumsInRow={albumsInRow}
        album={album}
        index={index}
        isReadOnly={isReadOnly}
      />
    ) : (
      <DraggableAlbum
        index={index}
        isReadOnly={true}
        album={EMPTY_ALBUM}
        albumsInRow={albumsInRow}
      />
    )}
  </ChartItemDropZone>
);

export default ChartItem;
