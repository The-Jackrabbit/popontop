import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Album } from '../../../../../types/Albums';

export interface Props {
  album: Album;
  children: React.ReactNode;
  style?: object;
  id: string;
}

const Droppable: React.FC<Props> = ({
  children,
  id,
  style,
}) => {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({ id });

  return (
    <div
      className={`
      border-neutral-800  dark:border-neutral-300
        border border-1
        w-4 h-4 
        sm:w-8 sm:h-8
        md:w-10 md:h-10
        lg:w-12 lg:h-12
        // ${isOver ? 'bg-red-400' : 'bg-transparent'}
      `}
      style={style}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Droppable;