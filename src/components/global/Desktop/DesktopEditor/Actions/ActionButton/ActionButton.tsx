import { MouseEventHandler } from 'react';
import ButtonWithAccessory, {
  LEFT_POSITION_STYLE,
} from '../../../../../lib/ButtonWithAccessory/ButtonWithAccessory';
import FilterButton from '../../../../../lib/FilterButton/FilterButton';

export interface Props {
  disabled?: boolean;
  hasGradientIndicator?: boolean;
  label: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string | React.ReactNode;
}

export const ActionButton: React.FC<Props> = ({
  // disabled = false,
  hasGradientIndicator = true,
  label,
  onClick,
  text,
}) => (
  <ButtonWithAccessory {...LEFT_POSITION_STYLE} label={label}>
    <FilterButton
      ariaLabel="save chart"
      className="h-12 w-12 p-[2px] shadow-lg"
      rounding="rounded-full"
      onClick={onClick}
      hasGradientIndicator={hasGradientIndicator}
      isActive={true}
    >
      {text}
    </FilterButton>
  </ButtonWithAccessory>
);

export default ActionButton;
