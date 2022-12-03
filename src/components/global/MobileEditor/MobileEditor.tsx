import { a } from "react-spring";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import { ChartSettings } from "@prisma/client";
import MobilePage from "../../lib/MobilePage/MobilePage";
import { Album } from "../../../styles/types/Albums";
import { useEffect } from "react";
import { Loader as ListLoader } from '../../global/MobileEditor/List/Loader'
import List from "./List/List";
import ViewModeModal from "./ViewModeModal/ViewModeModal";
import ShareTab from "./ShareTab/ShareTab";
import useMobileChartEditor, { UseChartListContext } from "../../../frontend/hooks/singletons/use-mobile-chart-editor";

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
  const { actions, state } = useMobileChartEditor({
    chartUuid,
    chartName,
    context,
    defaultSettings: initialSettings,
    initialList,
  });
  useEffect(() => {
    if (initialList) {
      actions.chart.list.setList(initialList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialList]);
  useEffect(() => {
    if (chartName) {
      actions.chart.setChartTitle(chartName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartName])

  return (
    <MobilePage>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{
          ...state.editor.sheet.bgStyle,
          height: state.editor.sheet.windowHeight
        }}
      >
        {state.chart.settings.state.showTitle ? (
          <Title
            textColor={state.chart.settings.state.textColor}
            isReadOnly={isReadOnly}
            chartTitle={state.chart.chartTitle ?? ''}
            setValue={(value: string) => actions.chart.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
          />
        ) : null}

        {!isLoading ? (
          <List
            list={state.chart.list}
            listMode={state.editor.listMode}
            onRearrangeClick={actions.onRearrangeClick}
            removeAlbumAtIndex={actions.chart.list.removeAlbumAtIndex}
            showAlbums={state.chart.settings.state.showAlbums}
            textColor={state.chart.settings.state.textColor}
          />
        ) : <ListLoader />}

        <ActionBar
          isEditLoading={state.chart.isEditLoading}
          className="-translate-x-4"
          editChart={actions.chart.editChart}
          isLoading={state.chart.isCreateLoading}
          listMode={state.editor.listMode}
          onClickSettings={actions.editor.onClickSettings}
          onClickSearch={actions.editor.onClickSearch}
          onClickDeleteMode={actions.editor.onClickDeleteMode}
          onClickRearrangeMode={actions.editor.onClickRearrangeMode}
          hasNonEmptyList={state.chart.list.length > 0}
          isActive={state.editor.isActive}
          isReadOnly={isReadOnly}
          setIsActive={actions.editor.setIsActive}
          saveChart={actions.chart.saveChart}
        />
      </a.div>

      {state.editor.isActive ? (
        <ShareTab
          chartTitle={state.chart.chartTitle}
          onDecrementColumns={state.chart.settings.actions.onDecrementColumns}
          onIncrementColumns={state.chart.settings.actions.onIncrementColumns}
          onDecrementRows={state.chart.settings.actions.onDecrementRows}
          onIncrementRows={state.chart.settings.actions.onIncrementRows}
          columns={state.chart.settings.state.columns}
          list={state.chart.list} 
          rows={state.chart.settings.state.rows} 
        /> 
      ) : null}
      <MobileSheet
        bind={state.editor.sheet.bind}
        display={state.editor.sheet.display}
        y={state.editor.sheet.y}
      >
        {state.editor.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => actions.chart.list.addAlbumToList(album)}
          />
        )}
        <div style={{ display: state.editor.isSettingsOpen ? 'initial' : 'none' }}>
          <MobileSettings
            isSaveLoading={state.chart.isCreateLoading}
            onSave={actions.chart.saveChart}
            settings={state.chart.settings}
          />
        </div>
        {state.editor.isViewModeActive ? (
          <ViewModeModal
            chartTitle={state.chart.chartTitle}
            onDecrementColumns={state.chart.settings.actions.onDecrementColumns}
            onIncrementColumns={state.chart.settings.actions.onIncrementColumns}
            onDecrementRows={state.chart.settings.actions.onDecrementRows}
            onIncrementRows={state.chart.settings.actions.onIncrementRows}
            columns={state.chart.settings.state.columns}
            list={state.chart.list} 
            rows={state.chart.settings.state.rows} 
          />
        ) : null} 
     </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
