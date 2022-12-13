import FilterButton, { ICON_STYLE } from "../../../lib/FilterButton/FilterButton";
import { 
  ChevronUpDownIcon, 
  TrashIcon,
} from '@heroicons/react/20/solid';
import { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import ActionBarLayout from "./ActionBarLayout";
import CreateChartClickCircle from "./ActionOverlay/ClickCircle/CreateChartClickCircle/CreateChartClickCircle";
import SearchButton from "./ChartButtons/SearchButton/SearchButton";
import SettingsButton from "./ChartButtons/SettingsButton/SettingsButton";


export interface Props {
  actionOverlayClassName?: string;
  className?: string;
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
  const onClickSearchAlbums = () => {
    // event.stopPropagation();
    onClickSearch();
  };

  const onClickChartSettings = (
    // event: React.BaseSyntheticEvent<MouseEvent>
  ) => {
    // event.stopPropagation();
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
      leftCornerButton={<SettingsButton onClick={onClickChartSettings} />}
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
      rightCornerButton={<SearchButton onClick={onClickSearchAlbums} />}
      setIsActive={setIsActive}
    />
  );
};

export default CreateChartActionBar;
