import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';
import { Album } from '../../../../../../types/Albums';
import DraggableAlbum from '../../DragNDrop/Draggable/DraggableAlbum';
import { EMPTY_ALBUM } from '../../../../../../constants/empty-album';

export interface Props {
  album: Album;
  index: number;
  borderColor: string;
  isReadOnly: boolean;
}

export const ChartItem: React.FC<Props> = ({
  album,
  borderColor,
  index,
  isReadOnly,
}) => (
  <ChartItemDropZone
    id={index.toString()}
    style={{
      borderColor,
      lineHeight: '0px',
    }}
  >
    {album.imageUrl ? (
      <DraggableAlbum album={album} index={index} isReadOnly={isReadOnly} />
    ) : (
      <DraggableAlbum index={index} isReadOnly={true} album={EMPTY_ALBUM} />
    )}
  </ChartItemDropZone>
);

export default ChartItem;
