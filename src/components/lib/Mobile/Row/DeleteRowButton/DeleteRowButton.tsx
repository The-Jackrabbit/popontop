import { a, config, useSpring } from 'react-spring';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export interface Props {
  className?: string;
  onClick: (event: React.BaseSyntheticEvent<MouseEvent>) => void;
}

export const DeleteRowButton: React.FC<Props> = ({
  className = '',
  onClick,
}) => {
  const [rotateX, animateRotationY] = useSpring(() => ({
    rotateX: '90deg',
    config: config.wobbly,
  }));

  useEffect(() => {
    animateRotationY.start({ rotateX: '0deg' });
  }, [animateRotationY]);

  return (
    <a.button
      className={`
        flex grow-0 basis-3/12 items-center justify-center bg-red-600
        ${className}
      `}
      onClick={onClick}
      style={{ ...rotateX }}
    >
      <XMarkIcon className="h-6 w-6 translate-y-[1px] text-neutral-50" />
    </a.button>
  );
};
