import { a } from 'react-spring';
import MobileSheet from '../../lib/MobileSheet/MobileSheet';
import SearchAlbums from './SearchAlbums/SearchAlbums';
import MobileSettings from './MobileSettings/MobileSettings';
import { ActionBar } from './ActionBar/ActionBar';
import Title from '../../lib/Title/Title';
import { ChartSettings } from '@prisma/client';
import MobilePage from '../../lib/MobilePage/MobilePage';
import { Album } from '../../../types/Albums';
import { Loader as ListLoader } from '../../global/MobileEditor/List/Loader';
import List from './List/List';
import ViewModeModal from './ViewModeModal/ViewModeModal';
import ShareTab from './ShareTab/ShareTab';
import useMobileChartEditor, {
  UseChartListContext,
} from '../../../frontend/hooks/singletons/use-mobile-chart-editor';

export interface Props {
  chartName?: string;
  chartUuid?: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings;
  isLoading?: boolean;
  isReadOnly?: boolean;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  chartUuid = '',
  context,
  initialList,
  initialSettings,
  isLoading = true,
  isReadOnly = false,
}) => {
  const { actions, chart, editor, state } = useMobileChartEditor({
    chartUuid,
    chartName,
    context,
    initialSettings,
    initialList,
  });

  return (
    <MobilePage backgroundColor={chart.settings.state.backgroundColor}>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{
          ...editor.state.sheet.bgStyle,
          height: editor.state.sheet.windowHeight,
        }}
      >
        {chart.settings.state.showTitle ? (
          <Title
            backgroundColor={chart.settings.state.titleBackgroundColor}
            textColor={chart.settings.state.textColor}
            isReadOnly={isReadOnly}
            chartTitle={chart.state.chartTitle ?? ''}
            setValue={(value: string) => chart.actions.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
          />
        ) : null}

        {!isLoading ? (
          <List
            backgroundColor={chart.settings.state.backgroundColor}
            list={chart.list.state}
            listMode={editor.state.listMode}
            onRearrangeClick={actions.onRearrangeClick}
            removeAlbumAtIndex={chart.list.actions.removeAlbumAtIndex}
            showAlbums={chart.settings.state.showAlbums}
            textColor={chart.settings.state.textColor}
          />
        ) : (
          <ListLoader />
        )}

        <ActionBar
          isEditLoading={chart.state.isEditLoading}
          className="-translate-x-4"
          editChart={chart.actions.editChart}
          isLoading={chart.state.isCreateLoading}
          listMode={editor.state.listMode}
          onClickSettings={editor.actions.onClickSettings}
          onClickSearch={editor.actions.onClickSearch}
          onClickDeleteMode={editor.actions.onClickDeleteMode}
          onClickRearrangeMode={editor.actions.onClickRearrangeMode}
          hasNonEmptyList={chart.list.state.length > 0}
          isActive={editor.state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={editor.actions.setIsActive}
          saveChart={chart.actions.saveChart}
        />
      </a.div>

      <ShareTab
        borderColor={chart.settings.state.borderColor}
        borderSize={chart.settings.state.borderSize}
        chartTitle={chart.state.chartTitle}
        chart={chart}
        list={chart.list.state}
        titleBackgroundColor={chart.settings.state.titleBackgroundColor}
      />

      <MobileSheet
        bind={editor.state.sheet.bind}
        display={editor.state.sheet.display}
        y={editor.state.sheet.y}
      >
        {editor.state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => chart.list.actions.addAlbumToList(album)}
          />
        )}
        <div
          style={{
            display: editor.state.isSettingsOpen ? 'initial' : 'none',
          }}
        >
          <MobileSettings
            isSaveLoading={chart.state.isCreateLoading}
            onSave={chart.actions.saveChart}
            settings={chart.settings}
          />
        </div>
        <ViewModeModal
          backgroundColor={chart.settings.state.backgroundColor}
          titleBackgroundColor={chart.settings.state.titleBackgroundColor}
          borderColor={chart.settings.state.borderColor}
          borderSize={chart.settings.state.borderSize}
          chartTitle={chart.state.chartTitle}
          onDecrementColumns={chart.settings.actions.onDecrementColumns}
          onIncrementColumns={chart.settings.actions.onIncrementColumns}
          onDecrementRows={chart.settings.actions.onDecrementRows}
          onIncrementRows={chart.settings.actions.onIncrementRows}
          columns={chart.settings.state.columns}
          list={chart.list.state}
          rows={chart.settings.state.rows}
        />
      </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
