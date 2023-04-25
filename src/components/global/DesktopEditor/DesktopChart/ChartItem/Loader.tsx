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
      />
    </div>
  );
};

export const ChartItemLoader = Loader;
