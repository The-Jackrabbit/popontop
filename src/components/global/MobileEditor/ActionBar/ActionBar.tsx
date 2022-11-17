import { a, useSpring, config } from "react-spring";
import FilterButton, { ICON_STYLE } from "../../../lib/FilterButton/FilterButton.tsx/FilterButton";
import { ActionOverlay } from "./ActionOverlay/ActionOverlay";
import { 
  ChevronUpDownIcon, 
  CogIcon,
  PlusIcon, 
  TrashIcon,
} from '@heroicons/react/20/solid';
import LogoButton from "./LogoButton/LogoButton";
import { ListRowMode } from "../../../lib/Mobile/ListRow/ListRow";

export interface Props {
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

export const ActionBar: React.FC<Props> = ({
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
  const [actionOverlayOpacity, animateActionOverlayOpacity] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  }));

  const [overlayPosition, animateOverlayPosition] = useSpring(() => ({
    transform: 'translateY(0vh)',
    config: config.stiff
  }));

  const start = () => {
    animateOverlayPosition.start({ transform: 'translateY(-100vh)' });
    animateActionOverlayOpacity.start({ opacity: 0 });
    setIsActive(false);
  };

  const end = () => {
    animateOverlayPosition.start({ transform:  'translateY(0vh)' });
    animateActionOverlayOpacity.start({ opacity: 1 });
  };

  return (
    <>
      <a.div 
        className="
          fixed bottom-0 left-0 -translate-x-4
          p-4
          w-[calc(100vw)]
          justify-between items-center 
          bg-gradient-to-t from-[rgba(200,200,200,0.6)] 
          via-[rgba(200,200,200,0.1)] 
          dark:from-[rgba(0,0,0,0.6)] to-transparent
          flex flex-row
        "
        style={{...actionOverlayOpacity}}
      >
        <FilterButton
          onClick={(e) => {
            e.stopPropagation();
            onClickSettings();
          }}
          hasGradientIndicator={false}
        >
          <CogIcon className={ICON_STYLE} />
        </FilterButton>
        <div className="flex gap-2">
          {hasNonEmptyList && (
            <FilterButton
              isActive={listMode === ListRowMode.DELETE}
              onClick={() => onClickDeleteMode()}
            >
              <TrashIcon className={ICON_STYLE + " p-1"} />
            </FilterButton>
          )}
          <LogoButton
            end={() => end()}
            isActive={isActive}
            start={() => start()}
          />
          {hasNonEmptyList && (
            <FilterButton
              isActive={listMode === ListRowMode.REARRANGE}
              onClick={() => onClickRearrangeMode()}
            >
              <ChevronUpDownIcon className={ICON_STYLE} />
            </FilterButton>
          )}
        </div>
        <FilterButton
          onClick={(e) => {
            e.stopPropagation();
            onClickSearch();
          }}
          hasGradientIndicator={false}
        >
          <PlusIcon className={ICON_STYLE} />
        </FilterButton>
      </a.div>
      <a.div
        className="fixed left-0 bottom-0"
        style={{ ...overlayPosition }}
      >
        <ActionOverlay
          saveChart={saveChart}
          isLoading={isLoading}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onExit={(e: any) => {
            e.stopPropagation()
            end();
          }}
        />
      </a.div>
    </>
  );
};

export default ActionBar;
