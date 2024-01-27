import { DndContext } from '@dnd-kit/core';
import {
  CloudArrowUpIcon,
  ArrowRightIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { a } from 'react-spring';
import ActionButton from '../components/global/Desktop/DesktopEditor/Actions/ActionButton/ActionButton';
import { DesktopActions } from '../components/global/Desktop/DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../components/global/Desktop/DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import DesktopEditor from '../components/global/Desktop/DesktopEditor/DesktopEditor';
import DesktopSidebar from '../components/global/Desktop/DesktopEditor/Sidebar/DesktopSidebar';
import { Color } from '../components/global/Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { DesktopPreview } from '../components/global/Desktop/DesktopPreview/DesktopPreview';
import DesktopPage from '../components/lib/DesktopPage/DesktopPage';
import { ICON_STYLE } from '../components/lib/FilterButton/FilterButton';
import LoadingBouncer from '../components/lib/LoadingBouncer/LoadingBouncer';
import useDesktopChartEditor from '../frontend/hooks/singletons/use-desktop-chart-editor';
import { usePageFadeIn } from '../frontend/hooks/springs/use-page-fade-in';
import { DraggedEntry } from '../frontend/hooks/use-chart/use-chart';
import NoSsr from './NoSsr';

const Home = () => {
  const { pageOpacity } = usePageFadeIn();
  const { data: sessionData } = useSession();
  const {
    actions,
    chart,
    state: { isDragging, previewIndex, isPreviewVisible, showOnboardingFlow },
  } = useDesktopChartEditor({});
  const isLoading = chart.state.isCreateLoading || chart.state.isEditLoading;

  return (
    <DndContext
      autoScroll={false}
      onDragStart={(event) => {
        chart.list.actions.setDraggedEntry(
          event.active.data.current as DraggedEntry
        );
        actions.setIsDragging(true);
      }}
      onDragEnd={(args) => {
        chart.list.actions.handleDragEnd(args);
        actions.setIsDragging(false);
      }}
    >
      <DesktopPage
        actions={
          <DesktopActions
            topSection={
              <>
                {sessionData ? (
                  <ActionButton
                    onClick={chart.actions.createChart}
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
        backgroundColor={chart.settings.state.backgroundColor}
        sidebar={
          <a.div style={pageOpacity} className="h-full overflow-x-visible">
            <DesktopSidebar
              isChartOwner={true}
              pageTitle={
                showOnboardingFlow ? 'getting started' : 'create chart'
              }
              isPreviewVisible={isPreviewVisible}
              setIsPreviewVisible={actions.setIsPreviewVisible}
              pageTitleBorderBottom={Color.fuchsia}
              settings={chart.settings}
              showOnboardingFlow={showOnboardingFlow}
              toggleEntries={actions.toggleEntries}
              toggleTitle={actions.toggleTitle}
            />
          </a.div>
        }
        pageContent={
          isPreviewVisible ? (
            <DesktopPreview
              isMobile={false}
              chart={chart}
              previewIndex={previewIndex}
            />
          ) : (
            <DesktopEditor
              isDragging={isDragging}
              chart={chart}
              showOnboardingFlow={showOnboardingFlow}
            />
          )
        }
      />
    </DndContext>
  );
};

const Page = () => {
  return (
    <NoSsr>
      <Home />
    </NoSsr>
  );
};

export default Page;
