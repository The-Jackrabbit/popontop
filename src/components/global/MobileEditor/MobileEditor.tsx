import { NextPage } from "next";
import { useEffect, useState } from "react";
import { a } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import { Album } from "../../../types/Albums";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import MobileSettings from "../DesktopEditor/Sidebar/Settings/MobileSettings";
import AddAlbumButton from "./AddAlbumButton/AddAlbumButton";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import SettingsButton from "./SettingsButton/SettingsButton";

const MobileEditor: NextPage = () => {
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

  useEffect(() => {
    console.log({list})
  }, [list]);

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
            setList((list) =>{
              debugger;
              const newAlbums = [...list];
              newAlbums.splice(index, 1);

              return newAlbums;
            });
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
      <MobileSheet bind={bind} display={display} y={y}>
        <div className="p-3">
          {isSearchOpen && (
            <SearchAlbums
              onClick={(album: Album) => {
                setList((albums) => {
                  const newAlbums = [...albums];
                  newAlbums.push(album);

                  return newAlbums;
                });
              }}
            />
          )}
          {isSettingsOpen && (
            <MobileSettings />
          )}
        </div>
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
