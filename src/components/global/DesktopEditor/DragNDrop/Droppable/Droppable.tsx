import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Album } from '../../../../../types/Albums';

export interface Props {
  album: Album;
  children: React.ReactNode;
  id: string;
}

const Droppable: React.FC<Props> = ({
  children,
  id,
}) => {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({ id });

  return (
    <div
      className={`
        border border-1 border-neutral-800 dark:border-neutral-300px
        w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-16 lg:h-16
        ${isOver ? 'bg-red-400' : 'bg-transparent'}
      `}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Droppable;