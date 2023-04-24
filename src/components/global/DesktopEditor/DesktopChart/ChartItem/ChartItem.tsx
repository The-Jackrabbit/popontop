import React from 'react';
import Image from 'next/image';
import Draggable from '../../DragNDrop/Draggable/Draggable';
import Droppable from '../../DragNDrop/Droppable/Droppable';
import { Album } from '../../../../../types/Albums';

export interface Props {
  album: Album;
  index: number;
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
  rowIndex: number;
  columnIndex: number;
}

export const EMPTY_SQUARE_BG_GRADIENT = [
  'linear-gradient(to right, rgb(251,191,36), rgb(217,70,239))',
];

export const ChartItem: React.FC<Props> = ({
  album,
  borderColor,
  borderSize,
  index,
  isReadOnly,
  rowIndex,
  columnIndex,
}) => {
  return (
    <div
      data-index-row={rowIndex}
      data-index-column={columnIndex}
      data-index-inchart={index}
    >
      <Droppable
        id={index.toString()}
        index={index}
        album={album}
        style={{
          borderWidth: `${borderSize}px`,
          borderColor,
        }}
      >
        {album.imageUrl ? (
          <Draggable
            data={{ data: album, index, origin: 'chart' }}
            id={`chart-${index.toString()}`}
            isReadOnly={isReadOnly}
            key={`chart-${index.toString()}-key`}
          >
            <Image
              src={album.imageUrl}
              height="100%"
              width="100%"
              alt="profile"
            />
          </Draggable>
        ) : null}
      </Droppable>
    </div>
  );
};

export default ChartItem;
