import { NextPage } from "next";
import { useEffect, useState } from "react";
import { a } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import { Album } from "../../../types/Albums";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";

import AddAlbumButton from "./AddAlbumButton/AddAlbumButton";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import SettingsButton from "./SettingsButton/SettingsButton";
import { trpc } from '../../../utils/trpc';
import Link from "next/link";
import MobileSettings from "../DesktopEditor/Sidebar/Settings/MobileSettings/MobileSettings";
import Button from "../../lib/Button/Button";

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

  const mutation = trpc.charts.create.useMutation();
  const saveChart = async (): Promise<string> => {

    const result = await mutation.mutateAsync({ albums: list });

    return result.chart.uuid ?? '';
  }
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
        <div className="w-[calc(100vw_-_2rem)] justify-between items-center absolute bottom-0 flex flex-row">
          <SettingsButton
            onClick={(e) => {
              e.stopPropagation();
              setIsSettingsOpen(true);
              open({ canceled:false });
            }}
          />
          <h1 className="text-2xl">💿popontop</h1>
          <AddAlbumButton
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchOpen(true);
              open({ canceled:false });
            }}
          />
        </div>
      </a.div>
      <MobileSheet bind={bind} display={display} y={y}>
        <>
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
            <MobileSettings
              isSaveLoading={mutation.isLoading}
              onSave={saveChart}
            />
          )}
        </>
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
