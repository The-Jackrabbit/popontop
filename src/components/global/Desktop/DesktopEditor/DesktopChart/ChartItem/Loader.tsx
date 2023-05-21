import React from 'react';
import ChartItemDropZone from '../../DragNDrop/ChartItemDropZone/ChartItemDropZone';
import { getBorderSizes } from '../DesktopChart';

export interface Props {
  index: number;
}

const Loader: React.FC<Props> = ({ index }) => {
  return (
    <ChartItemDropZone
      className="animate-pulse dark:border-neutral-800"
      id={index.toString()}
      index={index}
      borderSizes={getBorderSizes(index)}
    >
      <div className="h-[118px] w-[118px] border-2 dark:border-neutral-800  " />
    </ChartItemDropZone>
  );
};

export const ChartItemLoader = Loader;
