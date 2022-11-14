import { a } from "react-spring";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import { ListRowMode } from "../../lib/Mobile/ListRow/ListRow";
import MobilePage from "../../lib/MobilePage/MobilePage";

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
  const { actions, sheet, state } = useChartList({
    chartName,
    defaultSettings: initialSettings
  });

  return (
    <MobilePage>
      <a.div
        onClick={() => actions.onClickSheetDeadArea()}
        style={{ ...sheet.bgStyle, height: sheet.windowHeight }}
      >
        {state.settings.showTitle ? (
          <Title
            textColor={state.settings.textColor}
            isReadOnly={readonly}
            chartTitle={state.chartTitle}
            setValue={(value: string) => actions.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
            titleHeightStyle={state.titleHeightStyle}
          />
        ) : null}
        <List
          list={state.list}
          listMode={state.listMode}
          onRearrangeClick={actions.onRearrangeClick}
          removeAlbumAtIndex={actions.listMutations.removeAlbumAtIndex}
          showAlbums={state.settings.showAlbums}
          textColor={state.settings.textColor}
        />
        <ActionBar
          isLoading={state.isLoading}
          onClickSettings={actions.onClickSettings}
          onClickSearch={actions.onClickSearch}
          onClickRearrangeMode={actions.onClickRearrangeMode}
          hasNonEmptyList={state.list.length > 0}
          isActive={state.isActive}
          setIsActive={actions.setIsActive}
          saveChart={actions.saveChart}
          isRearrangeModeActive={state.listMode === ListRowMode.REARRANGE}
        />
      </a.div>
      <MobileSheet bind={sheet.bind} display={sheet.display} y={sheet.y}>
        {state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => actions.listMutations.addAlbumToList(album)}
          />
        )}
        <div style={{ display: state.isSettingsOpen ? 'initial' : 'none' }}>
          <MobileSettings
            isSaveLoading={state.isLoading}
            onSave={actions.saveChart}
            settings={state.settings}
          />
        </div>
      </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
