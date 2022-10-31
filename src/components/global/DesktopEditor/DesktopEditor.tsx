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
  // handleDragEnd: () => void;
}



export const DesktopEditor: React.FC<Props> = ({
  containers,
  // handleDragEnd,
}) => {
  return (
    <div className="
    flex
    bg-blue-300 min-w-[20rem]
    sm:bg-green-400 sm:min-w-[25rem]
    md:bg-red-300 md:min-w-[35rem]
    lg:bg-amber-600 lg:min-w-[40rem] lg:max-w-[41rem]
    flex-wrap
  ">
      {containers.map((album, index) => (
        <Droppable
          key={index}
          id={index.toString()}
          album={album}
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
