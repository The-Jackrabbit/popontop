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

export interface Props {
  hasNonEmptyList: boolean;
  onClickSettings: () => void;
  onClickSearch: () => void;
  onClickRearrangeMode: () => void;
  isActive: boolean;
  isLoading: boolean;
  isRearrangeModeActive: boolean;
  setIsActive: (val: boolean) =>  void;
  saveChart: () => Promise<string>;
}

export const ActionBar: React.FC<Props> = ({
  isActive,
  hasNonEmptyList,
  onClickRearrangeMode,
  isRearrangeModeActive = true,
  onClickSettings,
  onClickSearch,
  setIsActive,
  saveChart,
  isLoading,
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
          w-[calc(100vw)]
          p-4
          justify-between items-center 
          bg-gradient-to-t from-[rgba(200,200,200,0.6)] 
          via-[rgba(200,200,200,0.1)] 
          dark:from-[rgba(0,0,0,0.6)] to-transparent
          absolute bottom-0 left-0
          flex flex-row
        "
        style={{...actionOverlayOpacity}}
      >
       
          <FilterButton
            onClick={(e) => {
              e.stopPropagation();
              onClickSettings();
            }}
          >
           <CogIcon className={ICON_STYLE} />
         </FilterButton>
        <div className="flex gap-2">
          {hasNonEmptyList && (
            <FilterButton onClick={() => undefined}>
              <TrashIcon className={ICON_STYLE + " p-1"} />
            </FilterButton>
          )}
          <LogoButton
            end={() => end()}
            isActive={isActive}
            start={() => start()}
          />
          {hasNonEmptyList && (
            <FilterButton onClick={() => onClickRearrangeMode()}>
              <ChevronUpDownIcon className={ICON_STYLE} />
            </FilterButton>
          )}
        </div>
          <FilterButton
            onClick={(e) => {
              e.stopPropagation();
              onClickSearch();
            }}
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
