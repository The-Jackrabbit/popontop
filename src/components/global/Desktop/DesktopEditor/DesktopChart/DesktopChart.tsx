import React from 'react';
import { Album } from '../../../../../types/Albums';
import ChartItem from './ChartItem/ChartItem';
import Grid from '../../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';

export function getBorderSizes(index: number, totalAlbums: number): string {
  let borderSizes = '';

  if (index % 2 === 0) {
    borderSizes += ' border-l-8';
  } else {
    borderSizes += ' border-l-4';
  }

  if (index % 2 === 1) {
    borderSizes += ' border-r-8';
  } else {
    borderSizes += ' border-r-4';
  }

  if (index < 2) {
    borderSizes += ' border-t-8';
  } else {
    borderSizes += ' border-t-4';
  }

  if (index > 10 - 1 - 2) {
    borderSizes += ' border-b-8';
  } else {
    borderSizes += ' border-b-4';
  }

  return borderSizes; // 'border-l-4 border border-black';
}

export interface Props {
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
  items: Album[];
}

export const DesktopChart: React.FC<Props> = ({
  borderColor,
  borderSize,
  isReadOnly,
  items,
}) => {
  return (
    <Grid
      borderColor={borderColor}
      borderSize={borderSize}
      items={items}
      itemComponent={({ index, x, y }) => (
        <ChartItem
          album={
            items[index] !== undefined ? (items[index] as Album) : EMPTY_ALBUM
          }
          borderColor={borderColor}
          borderSizes={getBorderSizes(index, items.length)}
          index={index}
          isReadOnly={isReadOnly}
          rowIndex={x}
          columnIndex={y}
        />
      )}
    />
  );
};

export default DesktopChart;
