import React from 'react';
import { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { Album } from '../../../types/Albums';

export interface Props {
  borderColor: string;
  borderSize: number;
  items: Album[];
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
}

const Grid: React.FC<Props> = ({
  // borderColor,
  // borderSize,
  items,
  itemComponent,
  preview = false
}) => {
  return (
    <div
      className={`
        ${preview ? 'scale-95' : ''}
        flex
        flex-wrap
        h-min
        justify-center
      `}
    >
      {items.map((_item, index) => (
        <>
          {itemComponent({ index , x: -1, y: -1 })}
        </>
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
