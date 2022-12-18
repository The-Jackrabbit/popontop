import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export interface Props {
  columns: number;
  itemComponent: ({
    index,
    x,
    y,
  }: {
    index: number;
    x: number;
    y: number;
  }) => JSX.Element;
  preview?: boolean;
  rows: number;
  size: DOMRect;
}

const Grid: React.FC<Props> = ({
  columns,
  itemComponent,
  preview = false,
  rows,
  size,
}) => {
  const [squareWidth, setSquareWidth] = useState(40);
  useEffect(() => {
    const containerWidth = size.width;
    const containerHeight = size.height;
    const minDimension = Math.floor(
      Math.min(containerWidth / columns, containerHeight / rows)
    );
    setSquareWidth(minDimension === 0 ? 40 : minDimension);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, rows]);

  const emptyRows = useMemo(() => [...new Array(rows)], [rows]);
  const emptyColumns = useMemo<undefined[]>(
    () => [...new Array(columns)],
    [columns]
  );

  return (
    <div
      id="container"
      className={`
        ${preview ? 'scale-95' : ''}
        flex h-full items-stretch
        justify-center
        overflow-x-hidden
        overflow-y-hidden align-middle
      `}
    >
      {emptyColumns.map((_, y) => (
        <div className="x" key={`row-${y}`}>
          {emptyRows.map((_, x) => {
            const index = x + columns * y;
            return (
              <div
                className="value"
                key={`item-${index}`}
                style={{ width: squareWidth, height: squareWidth }}
              >
                {itemComponent({ index, x, y })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;

export function useSize(target: HTMLDivElement | null) {
  const [size, setSize] = useState<DOMRect>();

  useLayoutEffect(() => {
    target && setSize(target.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}
