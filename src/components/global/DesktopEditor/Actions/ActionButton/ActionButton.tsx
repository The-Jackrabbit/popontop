import { MouseEventHandler } from 'react';
import ButtonWithAccessory, {
  LEFT_POSITION_STYLE,
} from '../../../../lib/ButtonWithAccessory/ButtonWithAccessory';
import FilterButton from '../../../../lib/FilterButton/FilterButton';

export interface Props {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string | React.ReactNode;
  label: React.ReactNode;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  // disabled = false,
  label,
  onClick,
  text,
  // variant = 'regular',
}) => {
  return (
    <ButtonWithAccessory {...LEFT_POSITION_STYLE} label={label}>
      <FilterButton
        ariaLabel="save chart"
        className="h-12 w-12 p-[2px]"
        rounding="rounded-md"
        onClick={onClick}
        hasGradientIndicator={true}
        isActive={true}
      >
        {text}
      </FilterButton>
    </ButtonWithAccessory>
  );
};

export default ActionButton;
