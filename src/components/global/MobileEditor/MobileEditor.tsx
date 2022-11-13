import { a, useSpring } from "react-spring";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import { ListRowMode } from "../../lib/Mobile/ListRow/ListRow";
import { RowMovementType } from "../../lib/Mobile/ListRow/RearrangeView/RearrangeView";

const height = 667;

export interface Props {
  chartName?: string;
  readonly?: boolean;
  initialSettings?: ChartSettings | null;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  readonly = false,
  initialSettings = null,
}) => {
  const {
    list,
    saveChart,
    editor,
    listMutations,
    settings,
  } = useChartList({
    chartName,
    readonly,
    defaultSettings: initialSettings,
  });

  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    to: { height: '250px' },
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    if (editor.state.isStarted) {
      editor.actions.setIsFirstCloseDone(true);
      titleHeightAnimation.start({ height: '20x' });
    }
  };
  const {
    bgStyle,
    bind,
    close,
    display,
    open,
    windowHeight,
    y,
  } = useDragSheetDown(height, () => {
    editor.actions.setIsSettingsOpen(false);
    editor.actions.setIsSearchOpen(false);
    toggleTitle();
  });

  const isSheetOpen = editor.state.isSettingsOpen || editor.state.isSearchOpen;
  const onClickSheetDeadArea = () => {
    if (!isSheetOpen) {
      return;
    }
    close();
  };

  const onRearrangeClick = (rowMovementType: RowMovementType, index: number) => {
    let jumpAmount = 5;
    if (rowMovementType === RowMovementType.UP_ONE) {
      jumpAmount = 1;
    }
    if (rowMovementType === RowMovementType.DOWN_ONE) {
      jumpAmount = -1;
    }
    if (rowMovementType === RowMovementType.DOWN_FIVE) {
      jumpAmount = -5;
    }

    listMutations.swapAlbumsAtIndices(index, index - jumpAmount);
  }

  return (
    <div
      className="overflow-y-hidden flex "
      onScroll={(e) => { e.preventDefault(); e.stopPropagation(); }}
      style={{ height: windowHeight, backgroundColor: settings.backgroundColor }}
    >
      <a.div
        className="w-screen p-4 overflow-hidden"
        onClick={() => onClickSheetDeadArea()}
        style={{ ...bgStyle, height: windowHeight }}
      >
        <Title
          textColor={settings.textColor}
          isFixed={true}
          isReadOnly={readonly}
          chartTitle={settings.chartTitle}
          setValue={(value: string) => settings.setChartTitle(value)}
          showIntroduction={
            editor.state.isStarted && editor.state.isFirstCloseDone
          }
          titleHeightStyle={titleHeightStyle}
        />
          
        <List
          textColor={settings.textColor}
          list={list}
          listMode={editor.state.listMode}
          onRearrangeClick={onRearrangeClick}
          removeAlbumAtIndex={listMutations.removeAlbumAtIndex}
          advanceAlbumAtIndex={listMutations.advanceAlbumAtIndex}
          lowerAlbumAtIndex={listMutations.lowerAlbumAtIndex}
        />
       <ActionBar
          isLoading={editor.state.isLoading}
          onClickSettings={() => {
            editor.actions.setIsSettingsOpen(true);
            open({ canceled: false });
          }}
          onClickSearch={() => {
            editor.actions.setIsSearchOpen(true);
            open({ canceled: false });
          }}
          onClickRearrangeMode={() => {
            editor.actions.setListMode((listMode) => listMode !== ListRowMode.REARRANGE
              ? ListRowMode.REARRANGE
              : ListRowMode.NORMAL
            )
          }}
          isActive={editor.state.isActive}
          setIsActive={editor.actions.setIsActive}
          saveChart={saveChart}
       />
      </a.div>
      <MobileSheet bind={bind} display={display} y={y}>
        {editor.state.isSearchOpen && (
          <SearchAlbums
            onClick={listMutations.addAlbumToList}
          />
        )}
        {editor.state.isSettingsOpen && settings && (
          <MobileSettings
            isSaveLoading={editor.state.isLoading}
            onSave={saveChart}
            settings={settings}
          />
        )}
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
