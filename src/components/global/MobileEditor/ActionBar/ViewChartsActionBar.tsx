import FilterButton, { ICON_STYLE } from "../../../lib/FilterButton/FilterButton.tsx/FilterButton";
import { TrashIcon } from '@heroicons/react/20/solid';
import { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import ActionBarLayout from "./ActionBarLayout";
import ViewChartsClickCircle from "./ActionOverlay/ClickCircle/ViewChartsClickCircle/VIewChartsClickCircle";

export interface Props {
  actionOverlayClassName?: string;
  className?: string;
  isActive: boolean;
  listMode: ListRowMode;
  onClickDeleteMode: () => void;
  setIsActive: (val: boolean) =>  void;
}

export const ViewChartsActionBar: React.FC<Props> = ({
  actionOverlayClassName,
  className = '',
  isActive,
  listMode,
  onClickDeleteMode,
  setIsActive,
}) => (
  <ActionBarLayout
    actionOverlay={<ViewChartsClickCircle />}
    actionOverlayClassName={actionOverlayClassName}
    className={className}
    isActive={isActive}
    leftBadgeButton={
      <FilterButton
        ariaLabel="toggle delete mode"
        isActive={listMode === ListRowMode.DELETE}
        onClick={onClickDeleteMode}
      >
        <TrashIcon className={`${ICON_STYLE} p-1`} />
      </FilterButton>
    }
    setIsActive={setIsActive}
  />
);

export default ViewChartsActionBar;
