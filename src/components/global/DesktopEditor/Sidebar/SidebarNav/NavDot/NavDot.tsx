import { useState } from 'react';
import { a, config, useSpring } from 'react-spring';
import { colorMap } from '../../../../../../constants/colors';
import ButtonAccessory from '../../../../../lib/ButtonAccessory/ButtonAccessory';

export interface Props {
  className?: string;
  color: Color;
  isActive: boolean;
  label?: string;
  onClick: () => void;
}

export enum Color {
  amber  = 'amber',
  green  = 'green',
  blue  = 'blue',
  rose  = 'rose',
  purple  = 'purple',
  violet  = 'violet',
  fuchsia  = 'fuchsia',
}

export const NavDot: React.FC<Props> = ({
  className,
  color,
  isActive,
  label = null,
  onClick,
}) => {
  const activeClasses = colorMap[color];
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative w-4 h-4">
      {isHovered && label && (
        <div className="absolute -top-12 -left-[50px] w-[120px]">
          <div
            // Bubble content
            className="
              dark:bg-white bg-black
              z-50
              dark:text-neutral-800 text-neutral-50
              pl-4 pr-4 py-2 
              rounded-xl
              shadow-lg
              text-center
            "
          >
            {label}   
          </div>
          <div
            // Caret
            className="
              translate-x-[52px]
              -translate-y-1/2
              bg-black dark:bg-white
              h-3 w-3 rotate-45
            "
          >
          </div>
        </div>
      )}
       
      <button
        className={`
          ${className ?? ''}
          border-2 
          w-4 h-4 rounded-full
          shadow-md 
          outline-offset-4 outline-rose-300
          ${isActive ? activeClasses : colorMap.neutral}
        `}
        onClick={() => onClick()}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      />
    </div>
  );
}

export default NavDot;