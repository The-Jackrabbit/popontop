import React from 'react';
import { MouseEventHandler } from 'react';
import { a, useSpring } from 'react-spring';

export interface Props {
  children: React.ReactNode;
  className?: string;
  fromColor?: string;
  isGradient?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  toColor?: string;
}

export const ICON_STYLE = "h-6 w-6 translate-y-[1px] text-neutral-900 dark:text-neutral-50";

const FilterButton: React.FC<Props> = ({
  children,
  className = 'w-8 h-8 p-[2px]',
  fromColor = 'rgba(255, 0, 0, 1)',
  isGradient = false,
  onClick,
  toColor = 'rgba(0, 0, 255, 1)',
}) => {
  const fromGradient = `linear-gradient(0deg, ${fromColor} 0%, ${toColor} 100%)`;
  const toGradient = `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`;

  const [background, animateBackgroundStyle] = useSpring(() => ({
    bg: fromGradient
  }));
  const [buttonOverlayOpacity, animateButtonOverlayOpacity] = useSpring(() => ({
    opacity: 0
  }));

  return (
    <a.button
      className={` 
        ${className}
        rounded-full
        relative
      text-black dark:text-white
        border-red-300 border-1
        dark:bg-neutral-600
      `}
      onClick={(e) => {
        const newGradient = background.bg.get() === fromGradient
          ? toGradient
          : fromGradient;
        animateBackgroundStyle.start({ bg: newGradient });
        onClick(e);
      }}
      onPointerDown={() => animateButtonOverlayOpacity.start({ opacity: 1 })}
      onPointerUp={() => animateButtonOverlayOpacity.start({ opacity: 0 })}
      // style={{ background: isGradient ? background.bg : '' }}
    >
      <a.div
        className="
          absolute
          -top-1/2
          -bottom-1/2
          -left-1/2
          -right-1/2
          z-0
          rounded-full
          opacity-0
          bg-neutral-200
        "
        style={{ ...buttonOverlayOpacity }}
      />
      <div
        className="
        bg-white hover:bg-neutral-50 dark:bg-neutral-900 hover:dark:bg-black
          w-full h-full rounded-full
          flex justify-center items-center
          leading-none
        "
      >
        <p className="-translate-y-[1px]">{children}</p>
      </div>
    </a.button>
  );
};

export default FilterButton;