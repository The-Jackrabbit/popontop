import { colorMap } from '../../../../../../../constants/colors';
import ButtonWithAccessory, {
  TOP_POSITION_STYLE,
} from '../../../../../../lib/ButtonWithAccessory/ButtonWithAccessory';

export interface Props {
  ariaLabel: string;
  className?: string;
  color: Color;
  isActive: boolean;
  label?: string;
  onClick: () => void;
}

export enum Color {
  amber = 'amber',
  green = 'green',
  blue = 'blue',
  rose = 'rose',
  purple = 'purple',
  violet = 'violet',
  fuchsia = 'fuchsia',
}

export const NavDot: React.FC<Props> = ({
  ariaLabel,
  className,
  color,
  isActive,
  label = null,
  onClick,
}) => {
  const activeClasses = colorMap[color];
  return (
    <ButtonWithAccessory {...TOP_POSITION_STYLE} label={label ?? ''}>
      <button
        aria-label={ariaLabel}
        className={`
          ${className ?? '  h-4 w-4 '}
          rounded-full 
          border-2
          shadow-md 
          outline-offset-4 outline-rose-300
          ${isActive ? activeClasses : colorMap.neutral}
        `}
        onClick={() => onClick()}
      />
    </ButtonWithAccessory>
  );
};

export default NavDot;
