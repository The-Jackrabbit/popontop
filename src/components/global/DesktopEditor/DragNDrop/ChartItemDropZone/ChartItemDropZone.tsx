import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export interface Props {
  borderSizes: string;
  className?: string;
  children: React.ReactNode;
  id: string;
  index: number;
  style?: object;
}

function WavyGradientDiv() {
  return (
    <div
      className="wavy-gradient hover:visible hover:animate-pulse"
      style={{
        height: '100%',
        backgroundSize: '100% 200%',
        position: 'relative',
        // background: EMPTY_SQUARE_BG_GRADIENT[index%EMPTY_SQUARE_BG_GRADIENT.length],
      }}
    ></div>
  );
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
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`
        ${className}
        // DESKTOP_CHART_SQUARE_SIZE
        ChartItemDropZone 
        h-[118px]
        w-[118px]
        ${isOver ? 'bg-green-400' : 'bg-transparent'}
        ${borderSizes}
        box-content
      `}
      style={style}
      ref={setNodeRef}
    >
      {children ? children : <WavyGradientDiv />}
    </div>
  );
};

export default ChartItemDropZone;
