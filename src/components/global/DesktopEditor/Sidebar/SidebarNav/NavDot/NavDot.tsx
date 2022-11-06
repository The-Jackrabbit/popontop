import { useState } from 'react';
import { colorMap } from '../../../../../../constants/colors';
import ButtonWithAccessory, { TOP_POSITION_STYLE } from '../../../../../lib/ButtonWithAccessory/ButtonWithAccessory';

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
    <ButtonWithAccessory
      {...TOP_POSITION_STYLE}
      label={label ?? ''}
      isVisible={isHovered}
    >   
      <div className="relative w-4 h-4">
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </ButtonWithAccessory>
  );
}

export default NavDot;