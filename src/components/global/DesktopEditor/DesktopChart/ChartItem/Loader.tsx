import React from 'react';
import Droppable from '../../DragNDrop/Droppable/Droppable';

export interface Props {
  index: number;
}

const Loader: React.FC<Props> = ({
  index,
}) => {
  return (
    <div>
      <Droppable

        className="animate-pulse"
        id={index.toString()}
        index={index}
      >
        <div className='bg-neutral-800 w-[98px] h-[98px] border-neutral-700 border-2' />
      </Droppable>
    </div>
  );
};

export const ChartItemLoader = Loader;