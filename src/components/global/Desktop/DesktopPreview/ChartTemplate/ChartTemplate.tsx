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
      <>
        {row.length === 0 ? (
          <div className="m-4" key={`row-${rowIndex}-empty`} />
        ) : (
          <div className="flex h-min  bg-blue-300" key={`row-${rowIndex}`}>
            {row.map((indexIntoList) =>
              itemComponent({
                indexIntoList,
                lengthOfCurrentRow: row.length,
              })
            )}
          </div>
        )}
      </>
    ))}
  </>
);
