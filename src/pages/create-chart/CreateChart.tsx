import type { NextPage } from 'next';
import { a } from 'react-spring';
import DesktopSidebar from '../../components/global/DesktopEditor/Sidebar/DesktopSidebar';
import { usePageFadeIn } from '../../frontend/hooks/springs/use-page-fade-in';
import Layout from './Layout';
import { DndContext } from '@dnd-kit/core';
import DesktopEditor from '../../components/global/DesktopEditor/DesktopEditor';
import { DraggedAlbum } from '../../frontend/hooks/use-chart/use-chart';
import useDesktopChartEditor from '../../frontend/hooks/singletons/use-desktop-chart-editor';
import DesktopActions from '../../components/global/DesktopEditor/Actions/DesktopActions';
import { Color } from '../../components/global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

const CreateChart: NextPage = () => {
  const { pageOpacity } = usePageFadeIn();
  const {
    actions,
    childrenNodes: { chart },
    state: {
      showOnboardingFlow,
    },
  } = useDesktopChartEditor({});

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
            deleteChart={async () => undefined}
            isChartOwner={true}
            isLoading={chart.state.isCreateLoading || chart.state.isEditLoading}
            onEditPage={false}
            save={chart.actions.saveChart}
            savedChartId={chart.state.savedChartId}
            showOnboardingFlow={showOnboardingFlow}
          />
        }
        backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
        sidebar={
          <a.div style={pageOpacity} className="h-full overflow-x-visible">
            <DesktopSidebar
              isChartOwner={true}
              pageTitle={showOnboardingFlow ? 'getting started' : 'create chart'}
              pageTitleBorderBottom={Color.fuchsia}
              settings={chart.childrenNodes.settings}
              showOnboardingFlow={showOnboardingFlow}
              toggleAlbums={actions.toggleAlbums}
              toggleTitle={actions.toggleTitle}
            />
          </a.div>
        }
        pageContent={
          <a.div style={pageOpacity} className="h-full">
            <DesktopEditor
              chart={chart}
              showOnboardingFlow={showOnboardingFlow}
            />
          </a.div>
        }
      />
    </DndContext>
  );
};

export default CreateChart;
