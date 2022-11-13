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
import { Album } from "../../../types/Albums";
import clamp from "lodash.clamp";

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
    editor.actions.toggleTitle();
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

    const indexToMoveTo = clamp(index - jumpAmount, 0, list.length - 1);
    listMutations.insertAlbumAtIndex(list[index] as Album, index, indexToMoveTo);
  }

  return (
    <div
      className="overflow-y-hidden flex "
      onScroll={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <a.div
        className="w-screen p-4 overflow-hidden"
        onClick={() => onClickSheetDeadArea()}
        style={{ ...bgStyle, height: windowHeight }}
      >
        {settings.showTitle  ? (

        <Title
          textColor={settings.textColor}
          isReadOnly={readonly}
          chartTitle={editor.state.chartTitle}
          setValue={(value: string) => editor.actions.setChartTitle(value)}
          showIntroduction={
            editor.state.isStarted && editor.state.isFirstCloseDone
          }
          titleHeightStyle={editor.state.titleHeightStyle}
          />
        ) : null}
          
        <List
          list={list}
          listMode={editor.state.listMode}
          onRearrangeClick={onRearrangeClick}
          removeAlbumAtIndex={listMutations.removeAlbumAtIndex}
          showAlbums={settings.showAlbums}
          textColor={settings.textColor}
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
          hasNonEmptyList={list.length > 0}
          isActive={editor.state.isActive}
          setIsActive={editor.actions.setIsActive}
          saveChart={saveChart}
          isRearrangeModeActive={editor.state.listMode === ListRowMode.REARRANGE}
       />
      </a.div>
      <MobileSheet bind={bind} display={display} y={y}>
        {editor.state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => listMutations.addAlbumToList(album)}
          />
        )}
        <div style={{  display: editor.state.isSettingsOpen && settings ?  'initial'    : 'none' }}>

          <MobileSettings
            isSaveLoading={editor.state.isLoading}
            onSave={saveChart}
            settings={settings}
          />
        </div>
      </MobileSheet>
    </div>
  );
};

export default MobileEditor;
