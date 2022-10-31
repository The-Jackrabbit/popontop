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
      border-neutral-800  dark:border-neutral-300px
        border border-1
        
        w-8 h-8 
        sm:w-10 sm:h-10
        md:w-[3.5rem] md:h-[3.5rem]
        lg:w-16 lg:h-16
        ${isOver ? 'bg-red-400' : 'bg-transparent'}
      `}
      style={style}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Droppable;