import { a } from 'react-spring';
import { useState } from "react";
import { useZoomOnHover } from '../../../../../frontend/hooks/springs/use-zoom-on-hover';
import { MouseEventHandler } from 'react';
import ButtonWithAccessory, { LEFT_POSITION_STYLE } from '../../../../lib/ButtonWithAccessory/ButtonWithAccessory';

export interface Props {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string | React.ReactNode;
  label: React.ReactNode;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  disabled = false,
  label,
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
    <ButtonWithAccessory
      {...LEFT_POSITION_STYLE}
      label={label}
      isVisible={isHovered}
    >   
      <div
        className="
          flex-grow-0 first-of-type:mt-0 mt-0
          relative
        "
      >
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
    </ButtonWithAccessory>
  );
}

export default ActionButton;