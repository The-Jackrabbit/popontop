import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export interface Props {
  className?: string;
  children: React.ReactNode;
  id: string;
  index: number;
  style?: object;
}

function WavyGradientDiv({
index,
  }: { index: number }) {
  return (
    <div
    className="wavy-gradient hover:visible hover:animate-pulse"
    style={{
      height: '100%',
      backgroundSize: '100% 200%',
      position: 'relative',
      background: EMPTY_SQUARE_BG_GRADIENT[index%EMPTY_SQUARE_BG_GRADIENT.length],
    }}>

    </div>
  );
}

export const EMPTY_SQUARE_BG_GRADIENT = [
  'linear-gradient(to right, rgb(251,191,36), rgb(217,70,239))',
  'linear-gradient(to bottom, var(--color-pink-500), var(--color-blue-500)',
  'linear-gradient(to right, var(--color-orange-500), var(--color-pink-500))',
  'linear-gradient(to right, var(--color-green-500), var(--color-orange-500))',
];

const Droppable: React.FC<Props> = ({
  className = '',
  children,
  id,
  index,
  style,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`
        ${className}
        // DESKTOP_CHART_SQUARE_SIZE
        w-[98px] h-[98px]
        droppable
        ${isOver ? 'bg-green-400' : 'bg-transparent'}
      `}
      style={style}
      ref={setNodeRef}
    >
    {children ? (
      children
    ) : <WavyGradientDiv index={index} /> }
    </div>
  );
};

export default Droppable
