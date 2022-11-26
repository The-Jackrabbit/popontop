import FilterButton, { DEFAULT_CLASSNAME, ICON_STYLE } from "../../../lib/FilterButton/FilterButton";
import { 
  ChevronUpDownIcon, 
  CogIcon,
  PlusIcon, 
  TrashIcon,
} from '@heroicons/react/20/solid';
import { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";
import ActionBarLayout from "./ActionBarLayout";
import EditChartClickCircle from "./ActionOverlay/ClickCircle/EditChartClickCircle/EditChartClickCircle";
import ViewChartClickCircle from "./ViewChartClickCircle";
import { EyeIcon } from "@heroicons/react/24/solid";
export interface Props {
  actionOverlayClassName?: string;
  className?: string;
  editChart: () => Promise<string>;
  hasNonEmptyList: boolean;
  isActive: boolean;
  isLoading: boolean;
  isReadOnly: boolean;
  listMode: ListRowMode;
  onClickSettings: () => void;
  onClickSearch: () => void;
  onClickDeleteMode: () => void;
  onClickRearrangeMode: () => void;
  onClickView: () => void;
  setIsActive: (val: boolean) =>  void;
}

export const EditChartActionBar: React.FC<Props> = ({
  actionOverlayClassName,
  className = '',
  editChart,
  hasNonEmptyList,
  isActive,
  isLoading,
  isReadOnly,
  listMode,
  onClickDeleteMode,
  onClickRearrangeMode,
  onClickSearch,
  onClickSettings,
  onClickView,
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
        !isReadOnly
          ? <EditChartClickCircle editChart={editChart} isLoading={isLoading} />
          : <ViewChartClickCircle />
      }
      actionOverlayClassName={actionOverlayClassName}
      className={className}
      isActive={isActive}
      leftBadgeButton={
        hasNonEmptyList && !isReadOnly ? (
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
        !isReadOnly ? (
          <FilterButton
            ariaLabel="chart settings"
            hasGradientIndicator={false}
            onClick={onClickChartSettings}
            >
            <CogIcon className={ICON_STYLE} />
          </FilterButton>
        ) : null
      }
      rightBadgeButton={
        hasNonEmptyList && !isReadOnly ? (
          <div>       
            <FilterButton
              ariaLabel="toggle rearrange mode"
              isActive={listMode === ListRowMode.REARRANGE}
              onClick={onClickRearrangeMode}
            >
              <ChevronUpDownIcon className={ICON_STYLE} />
            </FilterButton>  
            <FilterButton
              ariaLabel="toggle rearrange mode"
              className={`${DEFAULT_CLASSNAME} mx-2`}
              isActive={false}
              onClick={onClickView}
              >
              <EyeIcon className={ICON_STYLE} />
            </FilterButton>
            </div>
        ) : undefined
      }
      rightCornerButton={
        !isReadOnly ? (
          <FilterButton
          ariaLabel="search albums"
          onClick={onClickSearchAlbums}
          hasGradientIndicator={false}
        >
          <PlusIcon className={ICON_STYLE} />
        </FilterButton>
        ) : null
      }
      setIsActive={setIsActive}
    />
  );
};

export default EditChartActionBar;
