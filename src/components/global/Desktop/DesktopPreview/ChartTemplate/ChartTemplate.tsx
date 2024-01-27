import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';

export interface Props {
  chart: ChartHookNode;
  isMobile: boolean;
  rows: number[][];
  itemComponent: ({
    indexIntoList,
    lengthOfCurrentRow,
  }: {
    indexIntoList: number;
    lengthOfCurrentRow: number;
  }) => JSX.Element;
}

export const ChartTemplate = ({ itemComponent, rows }: Props) => (
  <>
    {rows.map((row, rowIndex) => (
      <div
        className={
          row.length === 0
            ? 'm-4'
            : 'flex h-min  bg-neutral-200 dark:bg-neutral-800'
        }
        key={row.length === 0 ? `row-${rowIndex}-empty` : `row-${rowIndex}`}
      >
        {row.length === 0 ? null : (
          <>
            {row.map((indexIntoList) =>
              itemComponent({
                indexIntoList,
                lengthOfCurrentRow: row.length,
              })
            )}
          </>
        )}
      </div>
    ))}
  </>
);
