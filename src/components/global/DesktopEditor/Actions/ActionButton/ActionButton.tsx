import { a } from 'react-spring';
import { useState } from "react";
import { useZoomOnHover } from '../../../../../frontend/hooks/springs/use-zoom-on-hover';
import { MouseEventHandler } from 'react';

export interface Props {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string | React.ReactNode;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  disabled = false,
  onClick,
  text,
  variant = 'regular',
}) => {
  const {
    zoomOnHoverStyle,
    onMouseLeave,
    onMouseOver,
  } = useZoomOnHover();

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="
        flex-grow-0 first-of-type:mt-0 mt-0
        relative
      "
    >
      {isHovered && (
        <div className="absolute -left-[120px]">
          <div
            // Bubble content
            className="
              dark:bg-white bg-black
              dark:text-neutral-800 text-neutral-50
              pl-4 pr-4 py-2 
              rounded-xl
              shadow-lg
            "
          >
            Save chart
          </div>
          <div
            // Caret
            className="
              translate-x-[6.2rem]
              -translate-y-[150%]
              bg-black dark:bg-white
              h-3 w-3
              py-2 rotate-45
            "
          />
        </div>
      )}
      <a.button
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ ...zoomOnHoverStyle }}
        disabled={disabled}
        className={`
          shadow-sm rounded-lg
          dark:shadow-neutral-700
          w-12 h-12
          text-2xl
          leading-none
          outline-2 outline-rose-200
          focus-within:outline  dark:text-neutral-50 
          text-neutral-600
          ${disabled
            ? 'cursor-default bg-neutral-100 border-2 border-neutral-100'
            : ''
          }
          ${variant === 'primary' && !disabled
            ? 'bg-rose-400 active:bg-rose-500 '
            : 'bg-white dark:bg-black '
          }
        `}
        onClick={(e) => !disabled && onClick(e)}
      >
        {text}
      </a.button>
    </div>
  );
}

export default ActionButton;