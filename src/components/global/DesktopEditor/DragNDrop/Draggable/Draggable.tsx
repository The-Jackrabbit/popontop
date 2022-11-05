import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export interface Props {
  children: React.ReactNode;
  data: any;
  id: string;
  isReadOnly: boolean;
}

const Draggable: React.FC<Props> = ({
  children,
  data,
  id,
  isReadOnly,
}) =>{
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
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {children}
        </button>
      )
  ;
}

export default Draggable;