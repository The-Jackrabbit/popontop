import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';
import { getBorderSizes } from '../DesktopChart';

export interface Props {
  index: number;
}

const Loader: React.FC<Props> = ({ index }) => {
  return (
    <div>
      <ChartItemDropZone
        className="animate-pulse"
        id={index.toString()}
        index={index}
        borderSizes={getBorderSizes(index, 10)}
      >
        <div className="h-[118px] w-[118px] border-2 border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
      </ChartItemDropZone>
    </div>
  );
};

export const ChartItemLoader = Loader;
