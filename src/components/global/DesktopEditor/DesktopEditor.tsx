import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './DragNDrop/Draggable/Draggable';
import Droppable from './DragNDrop/Droppable/Droppable';
import { Album } from '../../../types/Albums';
import Image from 'next/image';


export const EMPTY_ALBUM: Album = {
  artist: '',
  imageUrl: '',
  lastfmId: '',
  name: '',
};

export const generateBoard = (length = 10, width = 10) => {
  const squares = [];
  for (let i = 0 ; i < length*width ; i++) {
    squares.push({ ...EMPTY_ALBUM });
  }

  return squares;
};

export interface Props {
  containers: Album[];
  borderColor: string;
  backgroundColor?: string;
  borderSize: number;
  // handleDragEnd: () => void;
}



export const DesktopEditor: React.FC<Props> = ({
  containers,
  borderColor,
  backgroundColor,
  borderSize,
  // handleDragEnd,
}) => {
  return (
    <div className="
     flex
     min-w-[20rem]
     sm:min-w-[25rem]
     md:min-w-[35rem]
     lg:min-w-[40rem] lg:max-w-[41rem]
    flex-wrap
    box-content
  " style={{
      backgroundColor,
      borderWidth: `${borderSize}px`,
      borderColor,
    }}>
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
                data={{
                  album,
                  index,
                }}
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

export default DesktopEditor;
