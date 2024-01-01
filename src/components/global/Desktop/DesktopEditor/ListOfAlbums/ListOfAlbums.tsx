import React from 'react';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../types/Albums';
import { CHART_TEMPLATES } from '../../DesktopPreview/DesktopPreview';
import ListColumn from './ListColumn/ListColumn';

export interface Props {
  chart: ChartHookNode;
  columnCount: number;
  list: Album[];
  textColor: string;
}

const ListOfAlbums: React.FC<Props> = ({
  chart,
  columnCount,
  list,
  textColor,
}) => {
  const getStartIndexOfColumn = (columnIndex: number, listLength: number) => {
    const lengthOfColumn = Math.floor(listLength / columnCount);
    return lengthOfColumn * columnIndex;
  };
  const getEndIndexOfColumn = (columnIndex: number, listLength: number) => {
    return getStartIndexOfColumn(columnIndex + 1, listLength) - 1;
  };

  return (
    <div
      className="
        oveflow-x-hidden
        flex
        text-ellipsis whitespace-nowrap pl-8
        text-[rgb(212_212_212)]
        dark:text-neutral-50
      "
      role="list"
    >
      <ListColumn
        chart={chart}
        className={`basis-1/${columnCount} text-ellipsis `}
        key={0 + 'list-column'}
        list={list.slice(
          getStartIndexOfColumn(0, list.length),
          getEndIndexOfColumn(0, list.length) + 1
        )}
        startIndexOfColumn={getStartIndexOfColumn(0, list.length) + 1}
        textColor={textColor}
      />
    </div>
  );
};

export default ListOfAlbums;
