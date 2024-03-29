import React, { useEffect } from 'react';
import { MouseEventHandler } from 'react';
import { a, useSpring } from 'react-spring';

export interface Props {
  ariaLabel: string;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
  hasGradientIndicator?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  rounding?: string;
}

export const ICON_STYLE =
  'h-6 w-6 translate-y-[1px] text-neutral-900 dark:text-neutral-50';
export const DEFAULT_CLASSNAME = 'w-8 h-8 p-[2px]';
const fromGradient = 'linear-gradient(0deg, gray 0%, gray 100%)';

const FilterButton: React.FC<Props> = ({
  ariaLabel,
  isActive = false,
  children,
  className = DEFAULT_CLASSNAME,
  hasGradientIndicator = true,
  onClick,
  rounding = 'rounded-full',
}) => {
  const toGradient = hasGradientIndicator
    ? 'linear-gradient(180deg, rgb(251,191,36) 0%, #d946ef 100%)'
    : 'linear-gradient(0deg, gray 0%, gray 100%)';

  const [background, animateBackgroundStyle] = useSpring(() => ({
    bg: fromGradient,
  }));
  const [buttonOverlayOpacity, animateButtonOverlayOpacity] = useSpring(() => ({
    opacity: 0,
  }));

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    onClick(e);
  };

  useEffect(() => {
    animateBackgroundStyle.start({
      bg: !isActive ? fromGradient : toGradient,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <a.button
      aria-label={ariaLabel}
      className={`
        ${className}
        ${rounding}
        relative
        text-black dark:bg-neutral-600
        dark:text-white
      `}
      onClick={onClickButton}
      onPointerDown={() => animateButtonOverlayOpacity.start({ opacity: 1 })}
      onPointerUp={() => animateButtonOverlayOpacity.start({ opacity: 0 })}
      style={{ background: background.bg }}
    >
      <a.div
        className={`
          z-0
          ${rounding}
          bg-neutral-200
          opacity-0
        `}
        style={{ ...buttonOverlayOpacity }}
      />
      <div
        className={`
          h-full w-full bg-white hover:bg-neutral-50
          dark:bg-neutral-900 hover:dark:bg-black ${rounding}
          flex items-center justify-center
          leading-none
        `}
      >
        <p className="-translate-y-[1px]">{children}</p>
      </div>
    </a.button>
  );
};

export default FilterButton;
