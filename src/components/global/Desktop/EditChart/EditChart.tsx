import { DndContext } from '@dnd-kit/core';
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { ChartSettings } from '@prisma/client';
import useDesktopChartEditor from '../../../../frontend/hooks/singletons/use-desktop-chart-editor';
import { DraggedAlbum } from '../../../../frontend/hooks/use-chart/use-chart';
import Layout from '../../../../pages/create-chart/Layout';
import { Album } from '../../../../types/Albums';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import LoadingBouncer from '../../../lib/LoadingBouncer/LoadingBouncer';
import ActionButton from '../../DesktopEditor/Actions/ActionButton/ActionButton';
import { DesktopActions } from '../../DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../../DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import DesktopEditor from '../../DesktopEditor/DesktopEditor';
import DesktopSidebar from '../../DesktopEditor/Sidebar/DesktopSidebar';
import { Color } from '../../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

const EditChart = ({
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
                    variant="primary"
                  />
                ) : null}
                <ActionButton
                  onClick={chart.actions.saveChart}
                  disabled={chart.state.isCreateLoading}
                  hasGradientIndicator={false}
                  label="Copy chart"
                  text={
                    !chart.state.isCreateLoading ? (
                      <PencilSquareIcon className={ICON_STYLE} />
                    ) : (
                      <LoadingBouncer />
                    )
                  }
                  variant="regular"
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
                    variant="regular"
                  />
                ) : null}
              </>
            }
          />
        }
        backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
        pageContent={
          <div className="h-full">
            <DesktopEditor
              chart={chart}
              readonly={false}
              showOnboardingFlow={false}
            />
          </div>
        }
        sidebar={
          <div className="h-full overflow-x-visible">
            <DesktopSidebar
              isChartOwner={isChartOwner}
              pageTitleBorderBottom={Color.blue}
              pageTitle={isChartOwner ? 'edit chart' : 'viewing chart'}
              settings={chart.childrenNodes.settings}
              showOnboardingFlow={false}
              toggleAlbums={actions.toggleAlbums}
              toggleTitle={actions.toggleTitle}
            />
          </div>
        }
      />
    </DndContext>
  );
};

export default EditChart;
