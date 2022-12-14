import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Album } from '../../../../../styles/types/Albums';

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
