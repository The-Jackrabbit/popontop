import React from 'react';
import { Album } from '../../../../../types/Albums';
import ListColumn from './ListColumn/ListColumn';

export interface Props {
  columnCount: number;
  list: Album[];
  textColor: string;
}

const ListOfAlbums: React.FC<Props> = ({ columnCount, list, textColor }) => {
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
        text-ellipsis whitespace-nowrap pl-8 text-[9px]
        text-[rgb(212_212_212)]
        dark:text-neutral-50
      "
      role="list"
    >
      {[...new Array(columnCount)].map((_, index) => (
        <ListColumn
          className={`basis-1/${columnCount} overflow-hidden text-ellipsis `}
          key={index + 'list-column'}
          list={list.slice(
            getStartIndexOfColumn(index, list.length),
            getEndIndexOfColumn(index, list.length) + 1
          )}
          startIndexOfColumn={getStartIndexOfColumn(index, list.length) + 1}
          textColor={textColor}
        />
      ))}
    </div>
  );
};

export default ListOfAlbums;
