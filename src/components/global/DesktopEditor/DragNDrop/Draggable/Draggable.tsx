import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Album } from '../../../../../styles/types/Albums';
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
  children,
  className = '',
  data,
  id,
  isReadOnly = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
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
      className: "interactive " + className,
    };
  
  return (
    <button
      {...draggableButtonProps}
      onClick={() => {
        console.log({ draggableButtonProps });
      }}
    >
      {children}
    </button>
  );
}

export default Draggable;