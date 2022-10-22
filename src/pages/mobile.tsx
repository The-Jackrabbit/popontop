import type { NextPage } from "next";
import { useState } from "react";
import List from "../components/mobile-editor/List/List";
import SettingsButton from "../components/global/MobileEditor/SettingsButton/SettingsButton";
import AddAlbumButton from "../components/global/MobileEditor/AddAlbumButton/AddAlbumButton";
import SearchAlbums from "../components/global/MobileEditor/SearchAlbums/SearchAlbums";
import { a } from '@react-spring/web';
import { useDragSheetDown } from "../frontend/hooks/use-drag-sheet-down";
import MobileSettings from "../components/global/Sidebar/Settings/MobileSettings";
import { Album } from "../types/Albums";

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

  const [list, setList] = useState<Album[]>([]);

  return (
    <div className="flex overflow-hidden " style={{ height: windowHeight }}>
      <a.div
        className="w-screen p-4"
        onClick={() => close()}
        style={{ ...bgStyle, height: windowHeight }}
      >
        <List
          list={list}
          removeAlbumAtIndex={(index: number) => {
            const newAlbums = [...list];
            newAlbums.splice(index, 1);

            setList(newAlbums);
          }}
          advanceAlbumAtIndex={(index: number) => {
            const newAlbums = [...list];
            if (index === 0) {
              return;
            }
            const temp = newAlbums[index] as Album;
            newAlbums[index] = newAlbums[index-1] as Album;
            newAlbums[index - 1] = temp as Album;

            setList(newAlbums);
          }}
          lowerAlbumAtIndex={(index: number) => {
            const newAlbums = [...list];
            if (index === list.length - 1) {
              return;
            }
            const temp = newAlbums[index] as Album;
            newAlbums[index] = newAlbums[index+1] as Album;
            newAlbums[index + 1] = temp as Album;

            setList(newAlbums);
          }}
        />
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
            <SearchAlbums onClick={(album: Album) => {
              const newAlbums = [...list];
              newAlbums.push(album);

              setList(newAlbums);
            }} />
          </div>
        )}
        {isSettingsOpen && (
          <MobileSettings />
        )}
      </a.div>
    </div>
  );
};

export default Mobile;
