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
      border-neutral-300  dark:border-neutral-600
        flex flex-wrap
        sm:min-w-[400px] sm:max-w-[420px]
        md:min-w-[450px] md:max-w-[470px]
        lg:min-w-[450px] lg:max-w-[470px]
        xl:min-w-[600px] xl:max-w-[620px]
        2xl:min-w-[700px] 2xl:max-w-[720px]
        3xl:min-w-[800px] 3xl:max-w-[800px]
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