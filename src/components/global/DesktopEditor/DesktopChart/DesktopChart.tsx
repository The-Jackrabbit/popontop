import React from 'react';
import { Album } from '../../../../styles/types/Albums';
import ChartItem from './ChartItem/ChartItem';
import Grid from '../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';

export interface Props {
  backgroundColor?: string;
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
  items: Album[];
  numberOfColumns: number;
  numberOfRows: number;
  size: DOMRect;
}

export const DesktopChart: React.FC<Props> = ({
  backgroundColor,
  borderColor,
  borderSize,
  isReadOnly,
  items,
  numberOfColumns,
  numberOfRows,
  size,
}) => {
  return (
    <Grid
      columns={numberOfColumns}
      itemComponent={
        ({ index, x, y }) => (
          <ChartItem
            album={items[index] !== undefined ? items[index] as Album : EMPTY_ALBUM}
            borderColor={borderColor} 
            borderSize={borderSize}
            index={index}
            isReadOnly={isReadOnly}
            rowIndex={x}
            columnIndex={y}
          /> 
        )
      }
      rows={numberOfRows}
      size={size}
    />
  );
}

export default DesktopChart;