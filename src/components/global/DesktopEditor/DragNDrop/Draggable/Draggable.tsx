import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Album } from '../../../../../types/Albums';

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
}) =>{
  debugger
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
    data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  
  return isReadOnly
    ? (
        <button>
          {children}
        </button>
      )
    : (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={"interactive " + className}>
          {children}
        </button>
      )
  ;
}

export default Draggable;