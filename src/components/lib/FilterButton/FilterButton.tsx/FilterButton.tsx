import React, { useState } from 'react';
import { MouseEventHandler } from 'react';
import { a, useSpring } from 'react-spring';

export interface Props {
  children: React.ReactNode;
  className?: string;
  defaultIsActive?: boolean;
  hasGradientIndicator?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ICON_STYLE = "h-6 w-6 translate-y-[1px] text-neutral-900 dark:text-neutral-50";

const FilterButton: React.FC<Props> = ({
  children,
  className = 'w-8 h-8 p-[2px]',
  defaultIsActive = false,
  hasGradientIndicator = true,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(defaultIsActive);
  const fromGradient = `linear-gradient(0deg, gray 0%, gray 100%)`;
  const toGradient = hasGradientIndicator
    ? 'linear-gradient(180deg, red 0%, blue 100%)'
    : 'linear-gradient(0deg, gray 0%, gray 100%)';

  const [background, animateBackgroundStyle] = useSpring(() => ({
    bg: fromGradient
  }));
  const [buttonOverlayOpacity, animateButtonOverlayOpacity] = useSpring(() => ({
    opacity: 0
  }));

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

    animateBackgroundStyle.start({
      bg: isActive ? fromGradient : toGradient,
    });
    setIsActive(!isActive);
    onClick(e);
  };

  return (
    <a.button
      className={` 
        ${className}
        rounded-full
        relative
      text-black dark:text-white
        dark:bg-neutral-600
      `}
      onClick={onClickButton}
      onPointerDown={() => animateButtonOverlayOpacity.start({ opacity: 1 })}
      onPointerUp={() => animateButtonOverlayOpacity.start({ opacity: 0 })}
      style={{ background:  background.bg }}
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