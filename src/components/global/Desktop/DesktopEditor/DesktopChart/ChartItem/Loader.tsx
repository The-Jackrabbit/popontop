import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';

export interface Props {
  index: number;
}

const Loader: React.FC<Props> = ({ index }) => {
  return (
    <ChartItemDropZone id={index.toString()}>
      <div className="h-[118px] w-[118px] border-2 dark:border-neutral-800  " />
    </ChartItemDropZone>
  );
};

export const ChartItemLoader = Loader;
