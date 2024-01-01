import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DESKTOP_CHART_SQUARE_SIZE } from '../../../../../../constants/sizes';

export interface Props {
  borderSizes: string;
  className?: string;
  albumsInRow: number;
  children: React.ReactNode;
  id: string;
  index: number;
  style?: object;
}

export const EMPTY_SQUARE_BG_GRADIENT = [
  'linear-gradient(to right, rgb(251,191,36), rgb(217,70,239))',
  'linear-gradient(to bottom, var(--color-pink-500), var(--color-blue-500)',
  'linear-gradient(to right, var(--color-orange-500), var(--color-pink-500))',
  'linear-gradient(to right, var(--color-green-500), var(--color-orange-500))',
];

const ChartItemDropZone: React.FC<Props> = ({
  borderSizes,
  className = '',
  children,
  id,
  style,
  albumsInRow = 2,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`
        ${className}
        ${isOver ? 'bg-green-400' : 'bg-transparent'}
        ${borderSizes}
        box-content
      `}
      style={style}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default ChartItemDropZone;
