import { DndContext } from '@dnd-kit/core';
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { ChartSettings } from '@prisma/client';
import useDesktopChartEditor from '../../../../frontend/hooks/singletons/use-desktop-chart-editor';
import { DraggedEntry } from '../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../types/Albums';
import DesktopPage from '../../../lib/DesktopPage/DesktopPage';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import LoadingBouncer from '../../../lib/LoadingBouncer/LoadingBouncer';
import ActionButton from '../DesktopEditor/Actions/ActionButton/ActionButton';
import { DesktopActions } from '../DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import DesktopEditor from '../DesktopEditor/DesktopEditor';
import DesktopSidebar from '../DesktopEditor/Sidebar/DesktopSidebar';
import PreviewSidebar from '../DesktopEditor/Sidebar/PreviewSidebar';
import { Color } from '../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { DesktopPreview } from '../DesktopPreview/DesktopPreview';

const EditChart = ({
  albums,
  chartName,
  chartUuid,
  isChartOwner,
  initialSettings,
}: {
  albums: Album[];
  chartName: string;
  chartUuid: string;
  isChartOwner: boolean;
  initialSettings?: ChartSettings;
}) => {
  const desktopChartEditor = useDesktopChartEditor({
    initialList: albums,
    chartName,
    chartUuid,
    initialSettings,
  });
  const { actions, chart, state } = desktopChartEditor;

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
        actions.setIsDragging(false);
        chart.list.actions.handleDragEnd(args);
      }}
    >
      <DesktopPage
        actions={
          <DesktopActions
            bottomSection={<ProfileCircle />}
            topSection={
              <>
                {isChartOwner ? (
                  <ActionButton
                    onClick={chart.actions.editChart}
                    disabled={chart.state.isEditLoading}
                    label="Save changes"
                    text={
                      !chart.state.isEditLoading ? (
                        <CloudArrowUpIcon className={ICON_STYLE} />
                      ) : (
                        <LoadingBouncer />
                      )
                    }
                  />
                ) : null}
                <ActionButton
                  onClick={chart.actions.copyChart}
                  disabled={chart.state.isCopyLoading}
                  hasGradientIndicator={false}
                  label="Copy chart"
                  text={
                    !chart.state.isCopyLoading ? (
                      <PencilSquareIcon className={ICON_STYLE} />
                    ) : (
                      <LoadingBouncer />
                    )
                  }
                />
                {isChartOwner ? (
                  <ActionButton
                    label="Delete chart"
                    hasGradientIndicator={false}
                    onClick={chart.actions.deleteChart}
                    text={
                      !chart.state.isDeleteLoading ? (
                        <TrashIcon className={ICON_STYLE} />
                      ) : (
                        <LoadingBouncer />
                      )
                    }
                  />
                ) : null}
              </>
            }
          />
        }
        backgroundColor={chart.settings.state.backgroundColor}
        pageContent={
          <div className="h-full">
            {state.isPreviewVisible ? (
              <DesktopPreview
                chart={chart}
                previewIndex={state.previewIndex}
                isMobile={false}
              />
            ) : (
              <DesktopEditor
                isDragging={state.isDragging}
                chart={chart}
                readonly={false}
                showOnboardingFlow={false}
              />
            )}
          </div>
        }
        sidebar={
          <div className="h-full overflow-x-visible">
            {!state.isPreviewVisible ? (
              <DesktopSidebar
                isChartOwner={isChartOwner}
                pageTitleBorderBottom={Color.blue}
                pageTitle={isChartOwner ? 'edit chart' : 'viewing chart'}
                settings={chart.settings}
                setIsPreviewVisible={actions.setIsPreviewVisible}
                isPreviewVisible={state.isPreviewVisible}
                showOnboardingFlow={false}
                toggleEntries={actions.toggleEntries}
                toggleTitle={actions.toggleTitle}
              />
            ) : (
              <PreviewSidebar
                desktopChartEditor={desktopChartEditor}
                isChartOwner={isChartOwner}
                pageTitleBorderBottom={Color.blue}
                pageTitle={isChartOwner ? 'edit chart' : 'viewing chart'}
                setIsPreviewVisible={actions.setIsPreviewVisible}
                isPreviewVisible={state.isPreviewVisible}
              />
            )}
          </div>
        }
      />
    </DndContext>
  );
};

export default EditChart;
