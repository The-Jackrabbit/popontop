import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './DragNDrop/Draggable/Draggable';
import Droppable from './DragNDrop/Droppable/Droppable';
import { Album } from '../../../types/Albums';


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
    <div className='flex max-w-2xl flex-wrap'>
      {containers.map((album, index) => (
        <Droppable
          key={index}
          id={index.toString()}
          album={album}
        >
          {album.name
            ? <Draggable id={index.toString()}>Drag me</Draggable>
            : ''
          }
        </Droppable>
      ))}
    </div>
  );
}

export default DesktopEditor;
