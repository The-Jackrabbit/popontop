import React from 'react';
import Droppable from '../../DragNDrop/Droppable/Droppable';

export interface Props {
  index: number;
}

const Loader: React.FC<Props> = ({ index }) => {
  return (
    <div>
      <Droppable className="animate-pulse" id={index.toString()} index={index}>
        <div className="h-[118px] w-[118px] border-2 border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
      </Droppable>
    </div>
  );
};

export const ChartItemLoader = Loader;
