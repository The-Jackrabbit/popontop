import FilterButton, { ICON_STYLE } from "../../../lib/FilterButton/FilterButton.tsx/FilterButton";
import { 
  ChevronUpDownIcon, 
  CogIcon,
  PlusIcon, 
  TrashIcon,
} from '@heroicons/react/20/solid';
import { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import ActionBarLayout from "./ActionBarLayout";
import CreateChartClickCircle from "./ActionOverlay/ClickCircle/CreateChartClickCircle/CreateChartClickCircle";

export interface Props {
  actionOverlayClassName?: string;
  className?: string;
  editChart?: () => Promise<string>;
  hasNonEmptyList: boolean;
  isActive: boolean;
  isLoading: boolean;
  listMode: ListRowMode;
  onClickSettings: () => void;
  onClickSearch: () => void;
  onClickDeleteMode: () => void;
  onClickRearrangeMode: () => void;
  saveChart: () => Promise<string>;
  setIsActive: (val: boolean) =>  void;
}

export const CreateChartActionBar: React.FC<Props> = ({
  actionOverlayClassName,
  className = '',
  hasNonEmptyList,
  isActive,
  isLoading,
  listMode,
  onClickDeleteMode,
  onClickRearrangeMode,
  onClickSearch,
  onClickSettings,
  saveChart,
  setIsActive,
}) => {
  const onClickSearchAlbums = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    onClickSearch();
  };

  const onClickChartSettings = (
    event: React.BaseSyntheticEvent<MouseEvent>
  ) => {
    event.stopPropagation();
    onClickSettings();
  };

  return (
    <ActionBarLayout
      actionOverlay={
        <CreateChartClickCircle saveChart={saveChart} isLoading={isLoading} />
      }
      actionOverlayClassName={actionOverlayClassName}
      className={className}
      isActive={isActive}
      leftBadgeButton={
        hasNonEmptyList ? (
          <FilterButton
            ariaLabel="toggle delete mode"
            isActive={listMode === ListRowMode.DELETE}
            onClick={onClickDeleteMode}
          >
            <TrashIcon className={`${ICON_STYLE} p-1`} />
          </FilterButton>
        ) : undefined
      }
      leftCornerButton={
        <FilterButton
          ariaLabel="chart settings"
          hasGradientIndicator={false}
          onClick={onClickChartSettings}
        >
          <CogIcon className={ICON_STYLE} />
        </FilterButton>
      }
      rightBadgeButton={
        hasNonEmptyList ? (
          <FilterButton
            ariaLabel="toggle rearrange mode"
            isActive={listMode === ListRowMode.REARRANGE}
            onClick={onClickRearrangeMode}
          >
            <ChevronUpDownIcon className={ICON_STYLE} />
          </FilterButton>
        ) : undefined
      }
      rightCornerButton={
        <FilterButton
          ariaLabel="search albums"
          onClick={onClickSearchAlbums}
          hasGradientIndicator={false}
        >
          <PlusIcon className={ICON_STYLE} />
        </FilterButton>
      }
      setIsActive={setIsActive}
    />
  );
};

export default CreateChartActionBar;
