import React from 'react';
import Image from 'next/image';
import Draggable from '../../DragNDrop/Draggable/Draggable';
import Droppable from '../../DragNDrop/Droppable/Droppable';
import { Album } from '../../../../../styles/types/Albums';

export interface Props {
  album: Album;
  index: number;
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
  rowIndex: number;
  columnIndex: number;
}

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
      className="
      border-neutral-300 dark:border-neutral-600
      border border-1
    w-full h-full 
    "  
    >
      <Droppable
        className="
          border-neutral-300 dark:border-neutral-600
          border border-1
        " 
        id={index.toString()}
        album={album}
        style={{ borderWidth: `${borderSize}px`, borderColor }}
      >
        {album.imageUrl
          ? (
            <Draggable
              data={{ data: album, index, origin: 'chart' }}
              id={`chart-${index.toString()}`}
              isReadOnly={isReadOnly}
              key={`chart-${index.toString()}-key`}
            >
              <Image
                className="w-4 h-4"
                src={album.imageUrl}
                height="100%"
                width="100%"
                alt="profile"
              />
            </Draggable>
          )
          : null
        }
      </Droppable>
    </div>
  );
}

export default ChartItem;
