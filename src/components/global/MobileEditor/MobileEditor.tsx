import { NextPage } from "next";
import { useEffect, useState } from "react";
import { a, useSpring } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import { Album } from "../../../types/Albums";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import { trpc } from '../../../utils/trpc';
import MobileSettings from "../DesktopEditor/Sidebar/Settings/MobileSettings/MobileSettings";
import ActionBar from "./ActionBar/ActionBar";
import Title from "./Title/Title";

const height = 667;

const MobileEditor: NextPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [chartTitle, setChartTitle] = useState('My sick ass chart');
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const mutation = trpc.charts.create.useMutation();
  const [list, setList] = useState<Album[]>([]);
  const [style, api] = useSpring(() => ({
    to: { height: '250px' },
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));

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
    toggleTitle();
  });

  const toggleTitle = () => {
    if (isStarted) {
      setIsFirstCloseDone(true);
      api.start({ height: '54px' });
    }
  }

  const saveChart = async (): Promise<string> => {
    const t = { name: chartTitle, albums: list };
    console.log({ t })
    const result = await mutation.mutateAsync(t);

    return result.chart.uuid ?? '';
  }

  const isSheetOpen = isSettingsOpen || isSearchOpen;
  const onCLickSheetDeadArea = () => {
    if (!isSheetOpen) {
      return;
    }
    close();
  };

  return (
    <div className="flex overflow-hidden " style={{ height: windowHeight }}>
      <a.div
        className="w-screen p-4"
        onClick={() => onCLickSheetDeadArea()}
        style={{ ...bgStyle, height: windowHeight }}
      > 
        <Title
          chartTitle={chartTitle}
          setValue={(value: string) => setChartTitle(value)}
          showIntroduction={isStarted && isFirstCloseDone}
          style={style}
        />
        <List
          list={list}
          removeAlbumAtIndex={(index: number) => {
            setList((list) =>{
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
        <ActionBar
          onClickSettings={() => {
            setIsSettingsOpen(true);
            open({ canceled:false });
          }}
          onClickSearch={() => {
            setIsSearchOpen(true);
            open({ canceled:false });
          }}
          onClickTitle={() => toggleTitle()}
       />
      </a.div>
      <MobileSheet bind={bind} display={display} y={y}>
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
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
