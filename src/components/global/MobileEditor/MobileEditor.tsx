import { a } from "react-spring";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList, { UseChartListContext } from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import MobilePage from "../../lib/MobilePage/MobilePage";
import { Album } from "../../../styles/types/Albums";

export interface Props {
  chartName?: string;
  chartUuid: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings | null;
  isReadOnly?: boolean;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  chartUuid = '',
  context,
  initialList,
  initialSettings = null,
  isReadOnly = false,
}) => {
  const { actions, sheet, state } = useChartList({
    chartUuid,
    chartName,
    context,
    defaultSettings: initialSettings,
    initialList,
  });

  return (
    <MobilePage>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{ ...sheet.bgStyle, height: sheet.windowHeight }}
      >
        {state.settings.showTitle ? (
          <Title
            textColor={state.settings.textColor}
            isReadOnly={isReadOnly}
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
          className="-translate-x-4"
          editChart={actions.editChart}
          isLoading={state.isLoading}
          listMode={state.listMode}
          onClickSettings={actions.onClickSettings}
          onClickSearch={actions.onClickSearch}
          onClickDeleteMode={actions.onClickDeleteMode}
          onClickRearrangeMode={actions.onClickRearrangeMode}
          hasNonEmptyList={state.list.length > 0}
          isActive={state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={actions.setIsActive}
          saveChart={actions.saveChart}
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
