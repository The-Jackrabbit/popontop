import { useState } from 'react';

export interface Props {
  children: React.ReactNode;
  className?: string;
  containerPositionStyle: string;
  containerWidthStyle: string;
  label: string | React.ReactNode;
  pointerPositionStyle: string;
}

export const TOP_POSITION_STYLE = {
  containerPositionStyle: 'bottom-[calc(100%_+_0.75rem)]',
  containerWidthStyle: '',
  pointerPositionStyle: 'left-[calc(50%_-_0.375rem)] -translate-y-[0.375rem]',
};

export const LEFT_POSITION_STYLE = {
  containerPositionStyle: 'right-[calc(100%_+_0.75rem)]',
  containerWidthStyle: '',
  pointerPositionStyle:
    'left-full top-1/2 -translate-y-[0.375rem] -translate-x-[0.375rem]',
};

const ButtonWithAccessory: React.FC<Props> = ({
  children,
  className = '',
  containerPositionStyle,
  containerWidthStyle,
  label,
  pointerPositionStyle,
}) => {
  const [isVisible, setIsHovered] = useState(false);

  return (
    <div
      className={`
        ${className}
        relative flex content-center items-center justify-center
        self-center
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isVisible && label !== '' ? (
        <div className={`absolute ${containerPositionStyle}`}>
          <div
            // Bubble content
            className={`
              ${containerWidthStyle}
              overflow-x-hidden whitespace-nowrap
              rounded-xl bg-black
              py-2 pl-4
              pr-4 text-neutral-50 shadow-lg 
              dark:bg-white
              dark:text-neutral-800
            `}
          >
            {label}
          </div>
          <div
            // Caret
            className={`
            absolute ${pointerPositionStyle}
            h-3 w-3
            rotate-45 bg-black
            dark:bg-white
            `}
          />
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default ButtonWithAccessory;
