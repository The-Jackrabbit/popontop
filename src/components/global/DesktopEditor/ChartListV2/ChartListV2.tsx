import React from 'react';
import { Album } from '../../../../styles/types/Albums';
import ListColumn from './ListColumn/ListColumn';

export interface Props {
  columnCount: number;
  list: Album[];
}

const ChartListV2: React.FC<Props> = ({ columnCount, list }) => {
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
        text-ellipsis whitespace-nowrap text-[9px] dark:text-neutral-50
      "
      role="list"
    >
      {[...new Array(columnCount)].map((_, index) => (
        <ListColumn
          key={index + 'list-column'}
          list={list.slice(
            getStartIndexOfColumn(index, list.length),
            getEndIndexOfColumn(index, list.length) + 1
          )}
          startIndexOfColumn={getStartIndexOfColumn(index, list.length) + 1}
        />
      ))}
    </div>
  );
};

export default ChartListV2;
