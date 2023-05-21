import SearchAlbums from './SearchAlbums/SearchAlbums';
import MobileSettings from './MobileSettings/MobileSettings';
import { ChartSettings } from '@prisma/client';
import MobilePage from '../../lib/MobilePage/MobilePage';
import { Album } from '../../../types/Albums';
import ShareTab from './ShareTab/ShareTab';
import useMobileChartEditor, {
  UseChartListContext,
} from '../../../frontend/hooks/singletons/use-mobile-chart-editor';
import { MobileEditorLayout } from './Layout';
import MobileChart from './ActionBar/MobileChart/MobileChart';

export interface Props {
  chartName?: string;
  chartUuid?: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings;
  isReadOnly?: boolean;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  chartUuid = '',
  context,
  initialList,
  initialSettings,
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
      <MobileEditorLayout
        bind={editor.state.sheet.bind}
        display={editor.state.sheet.display}
        pageContents={
          <MobileChart
            actions={actions}
            chart={chart}
            isReadOnly={isReadOnly}
            editor={editor}
            state={state}
          />
        }
        shareTab={
          <ShareTab
            borderColor={chart.settings.state.borderColor}
            borderSize={chart.settings.state.borderSize}
            chartTitle={chart.state.chartTitle}
            chart={chart}
            list={chart.list.state}
            titleBackgroundColor={chart.settings.state.titleBackgroundColor}
          />
        }
        sheetContents={
          <>
            {editor.state.isSearchOpen ? (
              <SearchAlbums
                onClick={(album) => chart.list.actions.addAlbumToList(album)}
              />
            ) : null}
            {editor.state.isSettingsOpen ? (
              <MobileSettings
                isSaveLoading={chart.state.isCreateLoading}
                onSave={chart.actions.createChart}
                settings={chart.settings}
              />
            ) : null}
          </>
        }
        y={editor.state.sheet.y}
      />
    </MobilePage>
  );
};

export default MobileEditor;
