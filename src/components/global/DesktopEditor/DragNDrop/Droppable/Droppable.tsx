import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Album } from '../../../../../types/Albums';
import { ALBUM_SIZE } from '../../../../../constants/shared-styles';

export interface Props {
  album: Album;
  className?: string;
  children: React.ReactNode;
  style?: object;
  id: string;
}

const Droppable: React.FC<Props> = ({
  className = '',
  children,
  id,
  style,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`
        ${className}
        droppable
        w-[50px] h-[50px]
        ${isOver ? 'bg-green-400' : 'bg-transparent'}
      `}
      style={style}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Droppable;
