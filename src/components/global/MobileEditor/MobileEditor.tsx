import { NextPage } from "next";
import { useEffect, useState } from "react";
import { a, useSpring } from "react-spring";
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
import { apiBaseUrl } from "next-auth/client/_utils";
import { Input } from "../../lib/Input/Input";


const MobileEditor: NextPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const isSheetOpen = isSettingsOpen || isSearchOpen;
  const [style, api] = useSpring(() => ({
    to: { height: 'initial' },
    config: {
      bounce: 2,
      friction: 20,
      mass:4 ,
      tension: 200,

    },
    delay: 20000,
    onRest: () => {
      debugger
    setfirstClick(true);
    },
  }));
  const [firstClick, setfirstClick] = useState(false);
  const [opacity, opacityApi] = useSpring(() => ({
    to: { opacity: '0' },
    from: { opacity: '1' },
    config: {
      bounce: 0.1,
      friction: 20,
      mass:4,
      tension: 200,
    },
    delay: 500,
    loop: true,
    reverse: true,
  }));
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
    ab();
  });

  const ab = () => {
    changeTitleZone();
  }

  const changeTitleZone = () => {
    if (isStarted) {
      api.start({ height: 'initial'});
      
      // opacityApi.start({ opacity: '0' });
      // opacityApi.start({ opacity: '1' });
    }
  }

  const [list, setList] = useState<Album[]>([]);

  const mutation = trpc.charts.create.useMutation();
  const saveChart = async (): Promise<string> => {

    const result = await mutation.mutateAsync({ albums: list });

    return result.chart.uuid ?? '';
  }
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('My sick ass chart');
  return (
    <div className="flex overflow-hidden " style={{ height: windowHeight }}>
      <a.div
        className="w-screen p-4"
        onClick={() => {
          if (!isSheetOpen) {
            return;
          }
          setfirstClick(true);
          close()
        }}
        style={{ ...bgStyle, height: windowHeight }}
      > 
        <a.div
          style={{ ...style }}
          className={`
            rounded-lg bg-white dark:bg-black sm:px-4 sm:py-3
            px-6 py-4
            overflow-hidden
          `}
        >
          <a.div style={opacity}>
            {isStarted && firstClick ? (
              <div className=" flex justify-between text-lg text-neutral-500 dark:text-neutral-200">
                {!isEditing ? <p>{value}</p> : (<>
                  <Input value={value} onChange={(e) => { setValue(e.target.value) }} placeholder="New title" />
                </>)}

                <button
                onClick={() => {
                  setIsEditing(!isEditing)
                }}
                className="active:outline-rose-300 active:outline outline-offset-2 rounded active:outline-2 outline-solid">✎</button>
              </div>
            ) : (
              <>
               <h1 className="text-3xl">Hi :-)</h1>
                <p className="text-3xl">To get started, click the ➕. Search the name or your favorite albums, and them to your list </p>
              </>
            )}
           </a.div>
        </a.div>
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
          <h1 onClick={() => ab()} className="dark:bg-black px-2 py-1sm:px-4 sm:py-1 rounded-full text-2xl">💿popontop</h1>
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

                  if (albums.length === 0 && newAlbums.length === 1) {
                    setIsStarted(true);
                  }

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
