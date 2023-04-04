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

const CreateChart: NextPage = () => {
  const { pageOpacity } = usePageFadeIn();
  debugger;
  const {
    actions,
    childrenNodes: { chart },
    state,
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
            isLoading={chart.state.isCreateLoading || chart.state.isEditLoading}
            save={chart.actions.saveChart}
            savedChartId={chart.state.savedChartId}
          />
        }
        backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
        sidebar={
          <a.div style={pageOpacity} className="h-full overflow-x-visible">
            <DesktopSidebar
              settings={chart.childrenNodes.settings}
              toggleAlbums={actions.toggleAlbums}
              toggleTitle={actions.toggleTitle}
            />
          </a.div>
        }
        pageContent={
          <a.div style={pageOpacity} className="h-full">
            <DesktopEditor
              chart={chart}
              titleStyle={state.titleStyle}
            />
          </a.div>
        }
      />
    </DndContext>
  );
};

export default CreateChart;
