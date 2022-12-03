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
  const { actions, childrenNodes, state } = useMobileChartEditor({
    chartUuid,
    chartName,
    context,
    defaultSettings: initialSettings,
    initialList,
  });
  useEffect(() => {
    if (initialList) {
      childrenNodes.chart.childrenNodes.list.actions.setList(initialList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialList]);
  useEffect(() => {
    if (chartName) {
      childrenNodes.chart.actions.setChartTitle(chartName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartName])

  return (
    <MobilePage>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{
          ...childrenNodes.editor.state.sheet.bgStyle,
          height: childrenNodes.editor.state.sheet.windowHeight
        }}
      >
        {childrenNodes.chart.childrenNodes.settings.state.showTitle ? (
          <Title
            textColor={childrenNodes.chart.childrenNodes.settings.state.textColor}
            isReadOnly={isReadOnly}
            chartTitle={childrenNodes.chart.state.chartTitle ?? ''}
            setValue={(value: string) => childrenNodes.chart.actions.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
          />
        ) : null}

        {!isLoading ? (
          <List
            list={childrenNodes.chart.childrenNodes.list.state}
            listMode={childrenNodes.editor.state.listMode}
            onRearrangeClick={actions.onRearrangeClick}
            removeAlbumAtIndex={childrenNodes.chart.childrenNodes.list.actions.removeAlbumAtIndex}
            showAlbums={childrenNodes.chart.childrenNodes.settings.state.showAlbums}
            textColor={childrenNodes.chart.childrenNodes.settings.state.textColor}
          />
        ) : <ListLoader />}

        <ActionBar
          isEditLoading={childrenNodes.chart.state.isEditLoading}
          className="-translate-x-4"
          editChart={childrenNodes.chart.actions.editChart}
          isLoading={childrenNodes.chart.state.isCreateLoading}
          listMode={childrenNodes.editor.state.listMode}
          onClickSettings={childrenNodes.editor.actions.onClickSettings}
          onClickSearch={childrenNodes.editor.actions.onClickSearch}
          onClickDeleteMode={childrenNodes.editor.actions.onClickDeleteMode}
          onClickRearrangeMode={childrenNodes.editor.actions.onClickRearrangeMode}
          hasNonEmptyList={childrenNodes.chart.childrenNodes.list.state.length > 0}
          isActive={childrenNodes.editor.state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={childrenNodes.editor.actions.setIsActive}
          saveChart={childrenNodes.chart.actions.saveChart}
        />
      </a.div>

      {childrenNodes.editor.state.isActive ? (
        <ShareTab
          chartTitle={childrenNodes.chart.state.chartTitle}
          onDecrementColumns={childrenNodes.chart.childrenNodes.settings.actions.onDecrementColumns}
          onIncrementColumns={childrenNodes.chart.childrenNodes.settings.actions.onIncrementColumns}
          onDecrementRows={childrenNodes.chart.childrenNodes.settings.actions.onDecrementRows}
          onIncrementRows={childrenNodes.chart.childrenNodes.settings.actions.onIncrementRows}
          columns={childrenNodes.chart.childrenNodes.settings.state.columns}
          list={childrenNodes.chart.childrenNodes.list.state} 
          rows={childrenNodes.chart.childrenNodes.settings.state.rows} 
        /> 
      ) : null}
      <MobileSheet
        bind={childrenNodes.editor.state.sheet.bind}
        display={childrenNodes.editor.state.sheet.display}
        y={childrenNodes.editor.state.sheet.y}
      >
        {childrenNodes.editor.state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => childrenNodes.chart.childrenNodes.list.actions.addAlbumToList(album)}
          />
        )}
        <div style={{ display: childrenNodes.editor.state.isSettingsOpen ? 'initial' : 'none' }}>
          <MobileSettings
            isSaveLoading={childrenNodes.chart.state.isCreateLoading}
            onSave={childrenNodes.chart.actions.saveChart}
            settings={childrenNodes.chart.childrenNodes.settings}
          />
        </div>
        {childrenNodes.editor.state.isViewModeActive ? (
          <ViewModeModal
            chartTitle={childrenNodes.chart.state.chartTitle}
            onDecrementColumns={childrenNodes.chart.childrenNodes.settings.actions.onDecrementColumns}
            onIncrementColumns={childrenNodes.chart.childrenNodes.settings.actions.onIncrementColumns}
            onDecrementRows={childrenNodes.chart.childrenNodes.settings.actions.onDecrementRows}
            onIncrementRows={childrenNodes.chart.childrenNodes.settings.actions.onIncrementRows}
            columns={childrenNodes.chart.childrenNodes.settings.state.columns}
            list={childrenNodes.chart.childrenNodes.list.state} 
            rows={childrenNodes.chart.childrenNodes.settings.state.rows} 
          />
        ) : null} 
     </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
