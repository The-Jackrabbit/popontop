import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';
import { Album } from '../../../../../types/Albums';
import DraggableAlbum from '../../DragNDrop/Draggable/DraggableAlbum';

export interface Props {
  album: Album;
  index: number;
  borderColor: string;
  borderSizes: string;
  isReadOnly: boolean;
  rowIndex: number;
  columnIndex: number;
}

export const ChartItem: React.FC<Props> = ({
  album,
  borderColor,
  borderSizes,
  index,
  isReadOnly,
  rowIndex,
  columnIndex,
}) => (
  <div
    data-index-row={rowIndex}
    data-index-column={columnIndex}
    data-index-inchart={index}
  >
    <ChartItemDropZone
      borderSizes={borderSizes}
      className="dark:border-neutral-700"
      id={index.toString()}
      index={index}
      style={{
        borderColor,
      }}
    >
      {album.imageUrl ? (
        <DraggableAlbum album={album} index={index} isReadOnly={isReadOnly} />
      ) : null}
    </ChartItemDropZone>
  </div>
);

export default ChartItem;
