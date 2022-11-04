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
        border-neutral-300 dark:border-neutral-600
        border border-1
        w-4 h-4 
        sm:w-[40px] sm:h-[40px]
        md:w-[45px] md:h-[45px]
        lg:w-[45px] lg:h-[45px]
        xl:w-[60px] xl:h-[60px]
        2xl:w-[70px] 2xl:h-[70px]
        3xl:w-[80px] 3xl:h-[80px]
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