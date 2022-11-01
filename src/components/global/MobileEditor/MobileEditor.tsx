import { NextPage } from "next";
import { useEffect, useState } from "react";
import { a, useSpring } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import ActionBar from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList from "../../../frontend/hooks/use-chart-list";
import { useRouter } from 'next/router'

const height = 667;

const MobileEditor: NextPage = () => {
  const {
    addAlbumToList,
    chartTitle,
    list,
    saveChart,
    removeAlbumAtIndex,
    advanceAlbumAtIndex,
    lowerAlbumAtIndex,
    isLoading,
    isStarted,
    setChartTitle,
  } = useChartList();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
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

  const isSheetOpen = isSettingsOpen || isSearchOpen;

  const toggleTitle = () => {
    if (isStarted) {
      setIsFirstCloseDone(true);
      titleHeightAnimation.start({ height: '54px' });
    }
  }

  const onClickSheetDeadArea = () => {
    if (!isSheetOpen) {
      return;
    }
    close();
  };

  const [text, setText] = useState('');
  useEffect(() => {
    setText(window.navigator.userAgent);
  }, []);

  return (
    <div className="flex " style={{ height: windowHeight }}>

      <a.div
        className="w-screen p-4"
        onClick={() => onClickSheetDeadArea()}
        style={{ ...bgStyle, height: windowHeight }}
      > 
        <Title
          chartTitle={chartTitle}
          setValue={(value: string) => setChartTitle(value)}
          showIntroduction={isStarted && isFirstCloseDone}
          titleHeightStyle={titleHeightStyle}
        />
        <List
          list={list}
          removeAlbumAtIndex={removeAlbumAtIndex}
          advanceAlbumAtIndex={advanceAlbumAtIndex}
          lowerAlbumAtIndex={lowerAlbumAtIndex}
        />
        <ActionBar
          onClickSettings={() => {
            setIsSettingsOpen(true);
            open({ canceled: false });
          }}
          onClickSearch={() => {
            setIsSearchOpen(true);
            open({ canceled: false });
          }}
       />
      </a.div>
      <MobileSheet bind={bind} display={display} y={y}>
        {isSearchOpen && (
          <SearchAlbums
            onClick={addAlbumToList}
          />
        )}
        {isSettingsOpen && (
          <MobileSettings
            isSaveLoading={isLoading}
            onSave={saveChart}
          />
        )}
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
