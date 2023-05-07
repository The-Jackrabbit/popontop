import type { NextPage } from 'next';
import { a } from 'react-spring';
import DesktopSidebar from '../../components/global/DesktopEditor/Sidebar/DesktopSidebar';
import { usePageFadeIn } from '../../frontend/hooks/springs/use-page-fade-in';
import Layout from './Layout';
import { DndContext } from '@dnd-kit/core';
import DesktopEditor from '../../components/global/DesktopEditor/DesktopEditor';
import { DraggedAlbum } from '../../frontend/hooks/use-chart/use-chart';
import useDesktopChartEditor from '../../frontend/hooks/singletons/use-desktop-chart-editor';
import { Color } from '../../components/global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import {
  CloudArrowUpIcon,
  ArrowRightIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import ActionButton from '../../components/global/DesktopEditor/Actions/ActionButton/ActionButton';
import ProfileCircle from '../../components/global/DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import { ICON_STYLE } from '../../components/lib/FilterButton/FilterButton';
import LoadingBouncer from '../../components/lib/LoadingBouncer/LoadingBouncer';
import { DesktopActions } from '../../components/global/DesktopEditor/Actions/DesktopActions';
import { useSession } from 'next-auth/react';

const CreateChart: NextPage = () => {
  const { pageOpacity } = usePageFadeIn();
  const { data: sessionData } = useSession();
  const {
    actions,
    childrenNodes: { chart },
    state: { showOnboardingFlow },
  } = useDesktopChartEditor({});
  const isLoading = chart.state.isCreateLoading || chart.state.isEditLoading;

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
            topSection={
              <>
                {sessionData ? (
                  <ActionButton
                    onClick={chart.actions.saveChart}
                    disabled={isLoading}
                    label="Save chart"
                    text={
                      !isLoading ? (
                        <CloudArrowUpIcon className={ICON_STYLE} />
                      ) : (
                        <LoadingBouncer />
                      )
                    }
                  />
                ) : null}
                {chart.state.savedChartId ? (
                  <>
                    <Link href={`/charts/${chart.state.savedChartId}`}>
                      <ActionButton
                        label="View newly saved chart"
                        onClick={() => undefined}
                        text={<ArrowRightIcon className={ICON_STYLE} />}
                      />
                    </Link>
                    <ActionButton
                      label="Delete chart"
                      hasGradientIndicator={false}
                      onClick={() => chart.actions.deleteChart()}
                      text={<TrashIcon className={ICON_STYLE} />}
                    />
                  </>
                ) : null}
              </>
            }
            bottomSection={<ProfileCircle />}
          />
        }
        backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
        sidebar={
          <a.div style={pageOpacity} className="h-full overflow-x-visible">
            <DesktopSidebar
              isChartOwner={true}
              pageTitle={
                showOnboardingFlow ? 'getting started' : 'create chart'
              }
              pageTitleBorderBottom={Color.fuchsia}
              settings={chart.childrenNodes.settings}
              showOnboardingFlow={showOnboardingFlow}
              toggleAlbums={actions.toggleAlbums}
              toggleTitle={actions.toggleTitle}
            />
          </a.div>
        }
        pageContent={
          <DesktopEditor
            chart={chart}
            showOnboardingFlow={showOnboardingFlow}
          />
        }
      />
    </DndContext>
  );
};

export default CreateChart;
