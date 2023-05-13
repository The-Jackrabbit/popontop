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
  const { actions, childrenNodes, state } = useMobileChartEditor({
    chartUuid,
    chartName,
    context,
    initialSettings,
    initialList,
  });

  return (
    <MobilePage
      backgroundColor={childrenNodes.chart.settings.state.backgroundColor}
    >
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{
          ...childrenNodes.editor.state.sheet.bgStyle,
          height: childrenNodes.editor.state.sheet.windowHeight,
        }}
      >
        {childrenNodes.chart.settings.state.showTitle ? (
          <Title
            backgroundColor={
              childrenNodes.chart.settings.state.titleBackgroundColor
            }
            textColor={childrenNodes.chart.settings.state.textColor}
            isReadOnly={isReadOnly}
            chartTitle={childrenNodes.chart.state.chartTitle ?? ''}
            setValue={(value: string) =>
              childrenNodes.chart.actions.setChartTitle(value)
            }
            showIntroduction={state.showIntroduction}
          />
        ) : null}

        {!isLoading ? (
          <List
            backgroundColor={childrenNodes.chart.settings.state.backgroundColor}
            list={childrenNodes.chart.list.state}
            listMode={childrenNodes.editor.state.listMode}
            onRearrangeClick={actions.onRearrangeClick}
            removeAlbumAtIndex={
              childrenNodes.chart.list.actions.removeAlbumAtIndex
            }
            showAlbums={childrenNodes.chart.settings.state.showAlbums}
            textColor={childrenNodes.chart.settings.state.textColor}
          />
        ) : (
          <ListLoader />
        )}

        <ActionBar
          isEditLoading={childrenNodes.chart.state.isEditLoading}
          className="-translate-x-4"
          editChart={childrenNodes.chart.actions.editChart}
          isLoading={childrenNodes.chart.state.isCreateLoading}
          listMode={childrenNodes.editor.state.listMode}
          onClickSettings={childrenNodes.editor.actions.onClickSettings}
          onClickSearch={childrenNodes.editor.actions.onClickSearch}
          onClickDeleteMode={childrenNodes.editor.actions.onClickDeleteMode}
          onClickRearrangeMode={
            childrenNodes.editor.actions.onClickRearrangeMode
          }
          hasNonEmptyList={childrenNodes.chart.list.state.length > 0}
          isActive={childrenNodes.editor.state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={childrenNodes.editor.actions.setIsActive}
          saveChart={childrenNodes.chart.actions.saveChart}
        />
      </a.div>

      <ShareTab
        borderColor={childrenNodes.chart.settings.state.borderColor}
        borderSize={childrenNodes.chart.settings.state.borderSize}
        chartTitle={childrenNodes.chart.state.chartTitle}
        chart={childrenNodes.chart}
        list={childrenNodes.chart.list.state}
        titleBackgroundColor={
          childrenNodes.chart.settings.state.titleBackgroundColor
        }
      />

      <MobileSheet
        bind={childrenNodes.editor.state.sheet.bind}
        display={childrenNodes.editor.state.sheet.display}
        y={childrenNodes.editor.state.sheet.y}
      >
        {childrenNodes.editor.state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) =>
              childrenNodes.chart.list.actions.addAlbumToList(album)
            }
          />
        )}
        <div
          style={{
            display: childrenNodes.editor.state.isSettingsOpen
              ? 'initial'
              : 'none',
          }}
        >
          <MobileSettings
            isSaveLoading={childrenNodes.chart.state.isCreateLoading}
            onSave={childrenNodes.chart.actions.saveChart}
            settings={childrenNodes.chart.settings}
          />
        </div>
      </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
