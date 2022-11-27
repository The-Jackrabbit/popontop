import { PaintBrushIcon } from "@heroicons/react/20/solid";
import FilterButton, { ICON_STYLE } from "../../../../../lib/FilterButton/FilterButton";

export interface Props {
  onClick: () => void;
}

export const SettingsButton: React.FC<Props> = ({ onClick }) => (
  <FilterButton
    ariaLabel="chart settings"
    hasGradientIndicator={false}
    onClick={onClick}
  >
    <PaintBrushIcon className={ICON_STYLE + ' p-1'} />
  </FilterButton>
);

export default SettingsButton;
