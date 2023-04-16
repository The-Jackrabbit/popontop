import { ChartSettings } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { a } from 'react-spring';
import DesktopEditor from '../../components/global/DesktopEditor/DesktopEditor';
import { usePageFadeIn } from '../../frontend/hooks/springs/use-page-fade-in';
import { Album } from '../../types/Albums';
import { trpc } from '../../utils/trpc';
import Layout from '../create-chart/Layout';
import { genUuid } from '../mobile/charts/[uuid]';
import useDesktopChartEditor from '../../frontend/hooks/singletons/use-desktop-chart-editor';
import DesktopSidebar from '../../components/global/DesktopEditor/Sidebar/DesktopSidebar';
import { Color } from '../../components/global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import DesktopActions from '../../components/global/DesktopEditor/Actions/DesktopActions';
import { DndContext } from '@dnd-kit/core';
import { DraggedAlbum } from '../../frontend/hooks/use-chart/use-chart';

const ApiWrapper: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  const isDoneLoading =
    data && data?.albums?.length > 0 && data.name && data.settings;

  if (!isDoneLoading) {
    return null;
  }

  return (
    <Chart
      albums={data.albums}
      chartName={data.name}
      chartUuid={uuid as string}
      isChartOwner={!data.isReadOnly}
      settings={data.settings}
    />
  );
};

const Chart = ({
  albums,
  chartName,
  chartUuid,
  isChartOwner,
  settings,
}: {
  albums: Album[];
  chartName: string;
  chartUuid: string;
  isChartOwner: boolean;
  settings: ChartSettings | null;
}) => {
  const { pageOpacity } = usePageFadeIn();
  const {
    actions,
    childrenNodes: { chart },
  } = useDesktopChartEditor({
    initialList: albums,
    chartName,
    chartUuid,
    defaultSettings: settings,
  });

  return (
    <DndContext
      autoScroll={false}
      onDragStart={(event) => {
        chart.childrenNodes.list.actions.setDraggedAlbum(
          event.active.data.current as DraggedAlbum
        );
      }}
      onDragEnd={(args) => {
        chart.childrenNodes.list.actions.handleDragEnd(args);
      }}
    >
      <Layout
        actions={
          <DesktopActions
            isChartOwner={isChartOwner}
            isLoading={chart.state.isCreateLoading || chart.state.isEditLoading}
            save={chart.actions.editChart}
            savedChartId={chart.state.savedChartId}
          />
        }
        backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
        pageContent={
          <a.div style={pageOpacity} className="h-full">
            <DesktopEditor
              chart={chart}
              // listStyles={state.listStyle}
              readonly={false}
            />
          </a.div>
        }
        sidebar={
          <a.div style={pageOpacity} className="h-full overflow-x-visible">
            <DesktopSidebar
              isChartOwner={isChartOwner}
              pageTitleBorderBottom={Color.blue}
              pageTitle={isChartOwner ? "edit chart" : "viewing chart"}
              settings={chart.childrenNodes.settings}
              toggleAlbums={actions.toggleAlbums}
              toggleTitle={actions.toggleTitle}
            />
          </a.div>
        }
      />
    </DndContext>
  );
};

export default ApiWrapper;
