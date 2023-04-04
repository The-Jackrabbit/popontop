import React from 'react';
import { Album } from '../../../../types/Albums';
import ChartItem from './ChartItem/ChartItem';
import Grid from '../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';

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
          borderSize={borderSize}
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
