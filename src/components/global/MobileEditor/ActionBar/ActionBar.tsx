import { useState } from "react";
import { a, useSpring, animated, config } from "react-spring";
import NavDot, { Color } from "../../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot";
import AddAlbumButton from "../AddAlbumButton/AddAlbumButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import { ActionOverlay } from "./ActionOverlay/ActionOverlay";

export interface Props {
  onClickSettings: () => void;
  onClickSearch: () => void;
  isActive: boolean;
  isLoading: boolean;
  setIsActive: (val: boolean) =>  void;
  saveChart: () => Promise<string>;
}

export const ActionBarNew: React.FC<Props> = ({
  isActive,
  onClickSettings,
  onClickSearch,
  setIsActive,
  saveChart,
  isLoading,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const start  = () => {
    setIsActive(false);
    animateActionOverlayOpacity.start({ opacity: 0 })
    // debugger
    setIsOverlayVisible(true);
    // animateActionOverlayOpacity.start({ opacity: 1 },)
  }

  const end  = () => {
    animateActionOverlayOpacity.start({ opacity: 1 })
    // debugger;
    // animateActionOverlayOpacity.start({
    //   opacity: 0,
    //   // onRest: () =>
    // })
    setIsOverlayVisible(false)
  }

  const [actionOverlayOpacity, animateActionOverlayOpacity] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  }));
  const [hideAnimation, animatehideAnimation] = useState(false);
  return (
    <>
    <a.div 
      className="
        w-[calc(100vw_-_2rem)] 
        justify-between items-center 
        absolute bottom-0 
        flex flex-row
      "
      style={{...actionOverlayOpacity}}
    >
      <SettingsButton
        onClick={(e) => {
          e.stopPropagation();
          onClickSettings();
        }}
      />
      <div

        onClick={() => start()}
        className="grow-1 flex content-center justify-center"
      >
       
        <h1
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
          onClick={end}
          className="
            bg-white dark:bg-black
            px-2 py-1 py-1sm:px-4 sm:py-1
            rounded-full
            relative
            select-none text-lg z-30"
        >
          💿popontop
          {isActive ? (
            <NavDot
              color={Color.fuchsia}
              isActive={true}
              onClick={() => undefined}
              className="animate-bounce absolute top-[-4px] right-[-2px]"
              label="asdfasdf"
            />
          ): null}
        </h1>
      </div>
      <AddAlbumButton
        onClick={(e) => {
          e.stopPropagation();
          onClickSearch();
        }}
      />
    </a.div>
     <a.div
     className="-translate-y-12"
   >
    <ActionOverlay
      saveChart={saveChart}
      isLoading={isLoading}
      onExit={(e: any) => {
        e.stopPropagation()
        end();
        animatehideAnimation(true);
      }}
    />     
   </a.div>
   </>
  );
};

