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
  onClickSettings: () => void;
  onClickSearch: () => void;
  onClickRearrangeMode: () => void;
  isActive: boolean;
  isLoading: boolean;
  setIsActive: (val: boolean) =>  void;
  saveChart: () => Promise<string>;
}

export const ActionBar: React.FC<Props> = ({
  isActive,
  onClickRearrangeMode,
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
    animateOverlayPosition.start({ transform: 'translateY(-145vh)' });
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
          py-4 px-1
          justify-between items-center 
          bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent
          absolute bottom-0 left-0
          flex flex-row
        "
        style={{...actionOverlayOpacity}}
      >
        <FilterButton
          fromColor="black"
          toColor="black"
          onClick={(e) => {
            e.stopPropagation();
            onClickSettings();
          }}
        >
          <CogIcon className={ICON_STYLE} />
        </FilterButton>
        <div className="flex gap-2">
          <FilterButton onClick={() => undefined}>
            <TrashIcon className={ICON_STYLE} />
          </FilterButton>
          <LogoButton
            end={() => end()}
            isActive={isActive}
            start={() => start()}
          />
          <FilterButton onClick={() => onClickRearrangeMode()}>
            <ChevronUpDownIcon className={ICON_STYLE} />
          </FilterButton>
        </div>
        <FilterButton
          fromColor="black"
          toColor="black"
          onClick={(e) => {
            e.stopPropagation();
            onClickSearch();
          }}
        >
          <PlusIcon className={ICON_STYLE} />
        </FilterButton>
      </a.div>
      <a.div style={{ ...overlayPosition }}>
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
