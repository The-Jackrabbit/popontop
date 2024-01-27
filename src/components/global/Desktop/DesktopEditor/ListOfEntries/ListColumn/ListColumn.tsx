import React from 'react';
import { CHART_TEMPLATES } from '../../../../../../constants/chart-types';
import { EMPTY_ALBUM } from '../../../../../../constants/empty-album';
import { ChartHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../../types/Albums';
import ListItem from './ListItem/ListItem';

export interface Props {
  chart: ChartHookNode;
  className: string;
  columnCount: number;
  columnIndex: number;
  textColor: string | null;
}

export const ListColumn: React.FC<Props> = ({
  chart,
  className = '',
  columnCount,
  columnIndex,
  textColor,
}) => {
  const listLength = CHART_TEMPLATES.get(chart.settings.state.chartFormat)?.list
    .count as number;
  const getStartIndexOfColumn = (columnIndex: number, listLength: number) => {
    const lengthOfColumn = Math.floor(listLength / columnCount);
    return lengthOfColumn * columnIndex;
  };
  const getEndIndexOfColumn = (columnIndex: number, listLength: number) => {
    return getStartIndexOfColumn(columnIndex + 1, listLength) - 1;
  };
  const startIndexOfColumn = getStartIndexOfColumn(columnIndex, listLength);
  const endIndexOfColumn = getEndIndexOfColumn(columnIndex, listLength);
  // console.log({
  //   columnIndex,
  //   columnCount,
  //   startIndexOfColumn,
  //   endIndexOfColumn,
  // });
  const listItemsForColumn = [];
  for (
    let index = startIndexOfColumn;
    index <= Math.min(endIndexOfColumn, listLength - 1);
    index++
  ) {
    listItemsForColumn.push(
      <ListItem
        chart={chart}
        key={index + 'list-item'}
        listItem={
          chart.list.state.list[index]
            ? (chart.list.state.list[index] as Album)
            : EMPTY_ALBUM
        }
        index={index + 1}
        textColor={textColor}
      />
    );
  }
  return <div className={className}>{listItemsForColumn}</div>;
};

export default ListColumn;
