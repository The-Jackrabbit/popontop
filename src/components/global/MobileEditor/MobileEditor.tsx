import { useState } from "react";
import { a, useSpring } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBarNew } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import ReorderOverlay from "./ReorderOverlay/ReorderOverlay";
import { Album } from "../../../types/Albums";

const height = 667;

export interface Props {
  chartName?: string;
  readonly?: boolean;
  settings?: ChartSettings | null;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  readonly = false,
  settings = null,
}) => {
  const {
    addAlbumToList,
    chartTitle,
    list,
    saveChart,
    removeAlbumAtIndex,
    advanceAlbumAtIndex,
    lowerAlbumAtIndex,
    insertAlbumAtIndex,
    isLoading,
    isStarted,
    setChartTitle,
    backgroundColor,
    setBackgroundColor,
    borderColor,
    setBorderColor,
    borderSize,
    setBorderSize,
    showAlbums,
    setShowAlbums,
    textColor,
    setTextColor,
    showTitle,
    setShowTitle,
  } = useChartList({
    chartName,
    readonly,
    settings,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const [isActive, setIsActive] = useState(true); 
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
      titleHeightAnimation.start({ height: '20x' });
    }
  }

  const onClickSheetDeadArea = () => {
    if (!isSheetOpen) {
      return;
    }
    close();
  };

  const [isRearrangeViewActive, setIsRearrangeViewActive] = useState(false);
  const [currentIndexBeingDragged, setCurrentIndexBeingDragged] = useState(-1);

  const [currentValue, setCurrentValue] = useState(currentIndexBeingDragged);

  const openRearrangeView = (indexToBeginAltering: number) => {
    setCurrentIndexBeingDragged(indexToBeginAltering)
    setCurrentValue(indexToBeginAltering)
    setIsRearrangeViewActive((current) => !current);
  };

  const onPointerUp = () => {
    insertAlbumAtIndex(
      list[currentIndexBeingDragged] as Album,
      currentIndexBeingDragged,
      currentValue,
    )
    setCurrentIndexBeingDragged(-1)
    // setIsRearrangeViewActive(false);
  };

  const onThumbSliderChange = (newValue: number) => {
    // insertAlbumAtIndex(
    //   list[currentIndexBeingDragged] as Album,
    //   currentIndexBeingDragged,
    //   newValue,
    // );
    setCurrentValue(newValue);
    setCurrentIndexBeingDragged(newValue-1)
    // setIsRearrangeViewActive(false);
  };


  const onCancel = () => {
    setCurrentIndexBeingDragged(-1)
    setIsRearrangeViewActive(false);
  };

  return (
    <div
      className="overflow-y-hidden flex "
      style={{ height: windowHeight, backgroundColor: backgroundColor }}
    >
    
      {isRearrangeViewActive ?  (
        <ReorderOverlay
          min={0}
          max={list.length}
          initialValue={currentIndexBeingDragged}
          currentValue={currentValue}
          setCurrentValue={onThumbSliderChange}
          onPointerUp={onPointerUp}
          onCancel={onCancel}
        /> 
      ) : null
      
    }
      <a.div
        className="w-screen p-4 overflow-y-hidden"
        onClick={() => onClickSheetDeadArea()}
        style={{ ...bgStyle, height: windowHeight }}>
     

        <Title
          textColor={textColor}
          isFixed={true}
          isReadOnly={readonly}
          chartTitle={chartTitle}
          setValue={(value: string) => setChartTitle(value)}
          showIntroduction={isStarted && isFirstCloseDone}
          titleHeightStyle={titleHeightStyle}
        />
          
        {/* <div style={{ opacity: !isActive ?  1 : 0, height: '100%'}}> */}
        <List
          textColor={textColor}
          list={list}
          removeAlbumAtIndex={removeAlbumAtIndex}
          advanceAlbumAtIndex={advanceAlbumAtIndex}
          lowerAlbumAtIndex={lowerAlbumAtIndex}
          openRearrangeView={openRearrangeView}
          />
          {/* </div> */}
       <ActionBarNew
       isLoading={isLoading}
          onClickSettings={() => {
            setIsSettingsOpen(true);
            open({ canceled: false });
          }}
          onClickSearch={() => {
            setIsSearchOpen(true);
            open({ canceled: false });
          }}
          isActive={isActive}
          setIsActive={setIsActive}
          saveChart={saveChart}
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
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderSize={borderSize}
            setBorderSize={setBorderSize}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            textColor={textColor}
            setTextColor={setTextColor}
            showTitle={showTitle}
            setShowTitle={setShowTitle}
            listAlbums={showAlbums}
            setListAlbums={setShowAlbums}
          />
        )}
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
