import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Album } from '../../../../../../types/Albums';
import { CSS } from '@dnd-kit/utilities';

export type DragSubZone = 'search' | 'chart';

export interface DraggableDataNode<T> {
  data: T;
  index: number;
  origin: DragSubZone;
}

export interface Props {
  className?: string;
  children: React.ReactNode;
  data: DraggableDataNode<Album>;
  id: string;
  isReadOnly?: boolean;
}

const Draggable: React.FC<Props> = ({
  className = '',
  children,
  data,
  id,
  isReadOnly = false,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const draggableButtonProps = isReadOnly
    ? {}
    : {
        ...listeners,
        ...attributes,
        ref: setNodeRef,
        style: {
          transform: CSS.Translate.toString(transform),
        },
      };

  return (
    <button
      {...draggableButtonProps}
      className={className}
      onContextMenu={(e: React.BaseSyntheticEvent) => {
        e.preventDefault();
      }}
    >
      {children}
    </button>
  );
};

export default Draggable;
