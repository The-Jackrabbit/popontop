import { a } from "react-spring";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList, { UseChartListContext } from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import MobilePage from "../../lib/MobilePage/MobilePage";
import { Album } from "../../../styles/types/Albums";
import { useEffect } from "react";
import { Loader as ListLoader } from '../../global/MobileEditor/List/Loader'
import List from "./List/List";
import ViewModeModal from "./ViewModeModal/ViewModeModal";
import ShareTab from "./ShareTab/ShareTab";

export interface Props {
  chartName?: string;
  chartUuid?: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings | null;
  isLoading?: boolean;
  isReadOnly?: boolean;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  chartUuid = '',
  context,
  initialList,
  initialSettings = null,
  isLoading = true,
  isReadOnly = false,
}) => {
  const { actions, sheet, state } = useChartList({
    chartUuid,
    chartName,
    context,
    defaultSettings: initialSettings,
    initialList,
  });
  useEffect(() => {
    if (initialList) {
      actions.listMutations.setList(initialList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialList]);
  useEffect(() => {
    if (chartName) {
      actions.setChartTitle(chartName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartName])

  return (
    <MobilePage>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{ ...sheet.bgStyle, height: sheet.windowHeight, }}
      >
        {state.settings.state.showTitle ? (
          <Title
            textColor={state.settings.state.textColor}
            isReadOnly={isReadOnly}
            chartTitle={state.chartTitle ?? ''}
            setValue={(value: string) => actions.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
          />
        ) : null}

        {!isLoading ? (
          <List
            list={state.list}
            listMode={state.listMode}
            onRearrangeClick={actions.onRearrangeClick}
            removeAlbumAtIndex={actions.listMutations.removeAlbumAtIndex}
            showAlbums={state.settings.state.showAlbums}
            textColor={state.settings.state.textColor}
          />
        ) : <ListLoader />}

        <ActionBar
          isEditLoading={state.isEditLoading}
          className="-translate-x-4"
          editChart={actions.editChart}
          isLoading={state.isLoading}
          listMode={state.listMode}
          onClickSettings={actions.onClickSettings}
          onClickSearch={actions.onClickSearch}
          onClickDeleteMode={actions.onClickDeleteMode}
          onClickRearrangeMode={actions.onClickRearrangeMode}
          onClickView={actions.onClickView}
          hasNonEmptyList={state.list.length > 0}
          isActive={state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={actions.setIsActive}
          saveChart={actions.saveChart}
        />
      </a.div>
      <ShareTab
        columns={state.settings.state.columns}
        list={state.list}
        rows={state.settings.state.rows} 
        chartTitle={state.chartTitle}
      /> 
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
        {state.isViewModeActive ? (
          <ViewModeModal
            onDecrementColumns={state.settings.actions.onDecrementColumns}
            onIncrementColumns={state.settings.actions.onIncrementColumns}
            onDecrementRows={state.settings.actions.onDecrementRows}
            onIncrementRows={state.settings.actions.onIncrementRows}
            columns={state.settings.state.columns}
            list={state.list} 
            rows={state.settings.state.rows} 
          />
        ) : null} 
     </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
