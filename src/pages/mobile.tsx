import type { NextPage } from "next";
import { useState } from "react";
import List from "../components/mobile-editor/List/List";
import Settings from "../components/global/Sidebar/Settings/Settings";
import MobileSheet from "../components/lib/MobileSheet/MobileSheet";
import SettingsButton from "../components/global/MobileEditor/SettingsButton/SettingsButton";
import AddAlbumButton from "../components/global/MobileEditor/AddAlbumButton/AddAlbumButton";
import SearchAlbums from "../components/global/MobileEditor/SearchAlbums/SearchAlbums";
import { a } from '@react-spring/web';
import { useDragSheetDown } from "../frontend/hooks/use-drag-sheet-down";
import HorizontalSwipe from "../components/mobile-editor/HorizontalSwipe/HorizontalSwipe";

const Mobile: NextPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const height = 667;
  const {
    bgStyle,
    bind,
    close,
    display,
    open,
    windowHeight,
    y
  } = useDragSheetDown(height, () => {
    setIsSettingsOpen(false);
    setIsSearchOpen(false);
  });

  return (
    <div className="flex overflow-hidden" style={{ height: windowHeight }}>
      <a.div
        className="w-screen"
        onClick={() => close()}
        style={{ ...bgStyle, height: windowHeight }}
      >
        <List />
        <SettingsButton
          onClick={(e) => {
            e.stopPropagation();
            setIsSettingsOpen(true);
            open({ canceled:false });
          }}
        />
        <AddAlbumButton
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchOpen(true);
            open({ canceled:false });
          }}
        />
      </a.div>
      <a.div
        className={`
          sheet
          w-screen
          z-10 fixed inset-0
          shadow-inner
          mt-8 p-4 pb-28
          overflow-y-scroll
         bg-neutral-100 dark:bg-neutral-800
          rounded-t-2xl
        `}
        style={{ display, y }}
        {...bind()}
      >
        {isSearchOpen && (
          <div className="p-3">
            <SearchAlbums onClick={() => undefined} />
          </div>
        )}
        {isSettingsOpen && (
          <div className="p-3">
            <HorizontalSwipe>

                <h1>swipe right</h1>
                <Settings />
                <h1>hello</h1>

            </HorizontalSwipe>
          </div>
        )}
      </a.div>
    </div>
  );
};

export default Mobile;
