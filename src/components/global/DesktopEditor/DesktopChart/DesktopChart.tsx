import React from 'react';
import Image from 'next/image';
import Draggable from '../DragNDrop/Draggable/Draggable';
import Droppable from '../DragNDrop/Droppable/Droppable';
import { Album } from '../../../../types/Albums';


export interface Props {
  containers: Album[];
  borderColor: string;
  backgroundColor?: string;
  borderSize: number;
  numberOfColumns: number;
  numberOfRows: number;
}

export const DesktopChart: React.FC<Props> = ({
  containers,
  borderColor,
  backgroundColor,
  borderSize,
}) => {
  return (
    <div
      className="
      border-neutral-800  dark:border-neutral-300
        flex flex-wrap
        min-w-[10rem]
        sm:min-w-[20rem]
        md:min-w-[25rem]
        lg:min-w-[30rem] max-w-[35rem]
        box-content
      "
      style={{
        backgroundColor,
        borderWidth: `${borderSize}px`,
        borderColor,
      }}
    >
      {containers.map((album, index) => (
        <Droppable
          key={index}
          id={index.toString()}
          album={album}
          style={{ borderWidth: `${borderSize}px`, borderColor }}
        >
          {album.imageUrl
            ? (
              <Draggable
                data={{ album, index }}
                id={index.toString()}
                key={index}
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
      ))}
    </div>
  );
}

export default DesktopChart;