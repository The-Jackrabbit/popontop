import React from 'react';
import Image from 'next/image';
import Draggable from '../DragNDrop/Draggable/Draggable';
import Droppable from '../DragNDrop/Droppable/Droppable';
import { Album } from '../../../../types/Albums';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';


export interface Props {
  containers: Album[];
  borderColor: string;
  backgroundColor?: string;
  borderSize: number;
  isReadOnly: boolean;
  numberOfColumns: number;
  numberOfRows: number;
  columnCount?: number;
  rowCount?: number;
}

export const DesktopChart: React.FC<Props> = ({
  containers,
  borderColor,
  backgroundColor,
  borderSize,
  isReadOnly,
  columnCount = 10,
  rowCount = 10,
}) => {
  return (
    <div
      className="
        border-neutral-300 dark:border-neutral-600
        flex flex-wrap flex-row
        w-[min-content]
        box-content
      "
      style={{
        backgroundColor,
        borderWidth: `${borderSize}px`,
        borderColor,
      }}
    >
      {[...new Array(rowCount)].map((v, rowIndex) => (
        <div
          className="flex flex-row"
          id={`editor-row-${rowIndex}`} key={`editor-row-${rowIndex}`}>
          {[...new Array(columnCount)].map((v, columnIndex ) => {
            const index = rowIndex*rowCount + columnIndex;
            const album = containers[index] ?? EMPTY_ALBUM;

            return (
              <div
                data-index-row={rowIndex}
                data-index-column={columnIndex}
                data-index-inchart={index}
                key={`editor-column-${rowIndex}-${columnIndex}`}
              >
                <Droppable
                  className={`
                    border-neutral-300 dark:border-neutral-600
                    border border-1
                    w-[40px] h-[40px]
                    md:w-[50px] md:h-[50px]
                    lg:w-[50x] lg:h-[50px]
                    xl:w-[60px] xl:h-[60px]
                    2xl:w-[60px] 2xl:h-[60px]
                    3xl:w-[80px] 3xl:h-[80px]
                  `}
                  key={`droppable-${index}-key`}
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
          })}
        </div>
      ))}
    </div>
  );
}

export default DesktopChart;