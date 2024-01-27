import React from 'react';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import ListColumn from './ListColumn/ListColumn';

export interface Props {
  chart: ChartHookNode;
  columnCount: number;
  textColor: string | null;
}

const ListOfEntries: React.FC<Props> = ({ chart, columnCount, textColor }) => {
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
      {Array(columnCount)
        .fill(null)
        .map((_, index) => (
          <ListColumn
            key={`list-column-${index}`}
            chart={chart}
            className={`basis-1/${columnCount} text-ellipsis `}
            columnIndex={index}
            columnCount={columnCount}
            textColor={textColor}
          />
        ))}
    </div>
  );
};

export default ListOfEntries;
