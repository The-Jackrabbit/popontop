import { a, config, useSpring } from 'react-spring';
import ButtonAccessory from '../../../../lib/ButtonAccessory/ButtonAccessory';

import { useState } from "react";

export interface Props {
  disabled?: boolean;
  onClick: (e: any) => void;
  text: string | React.ReactNode;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  disabled = false,
  onClick,
  text,
  variant = 'regular',
}) => {
  const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      ...config.wobbly,
      bounce: 1.2
    },
  }));
  const onMouseOver = () => animatebuttonStyle.start({scale: 1.1});
  const onMouseLeave = () => animatebuttonStyle.start({scale: 1.0});
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex-grow-0 
    first-of-type:mt-0
    mt-4">
      {isHovered && (
        <ButtonAccessory>
          Save chart    
        </ButtonAccessory>
      )}
      <a.button
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseOut={() => {
          setIsHovered(false);
        }}
        style={{ ...buttonStyle }}
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