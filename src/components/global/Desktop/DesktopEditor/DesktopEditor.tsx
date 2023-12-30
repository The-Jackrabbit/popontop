import React from 'react';
import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import Title from '../../../lib/Title/Title';
import ListOfAlbums from './ListOfAlbums/ListOfAlbums';
import DesktopChart from './DesktopChart/DesktopChart';
import Layout from './Layout';
import { useDroppable } from '@dnd-kit/core';

export interface Props {
  chart: ChartHookNode;
  isDragging: boolean;
  readonly?: boolean;
  showOnboardingFlow: boolean;
}

const DynamicList = ({
  chart,
  isDragging,
  showAlbums,
}: {
  chart: ChartHookNode;
  isDragging: boolean;
  showAlbums: boolean;
}) => {
  const { setNodeRef } = useDroppable({ id: 'delete' });
  if (isDragging) {
    return (
      <div className="min-h-[300px] bg-red-300 text-white" ref={setNodeRef}>
        drag here to delete album
      </div>
    );
  }
  if (showAlbums) {
    return (
      <ListOfAlbums
        textColor={chart.settings.state.textColor}
        columnCount={1}
        list={chart.state.numberedList}
      />
    );
  }

  return null;
};

const DesktopEditor: React.FC<Props> = ({
  chart,
  isDragging,
  readonly = false,
  showOnboardingFlow,
}) => (
  <>
    {showOnboardingFlow ? (
      <div>
        <p className="text-2xl">
          to get quickly started,
          <kbd className="mx-4">click</kbd>
          anywhere on the sidebar
        </p>
      </div>
    ) : (
      <Layout
        uuid={chart.state.savedChartId}
        title={
          chart.settings.state.showTitle ? (
            <Title
              backgroundColor={chart.settings.state.titleBackgroundColor}
              chartTitle={chart.state.chartTitle}
              isReadOnly={false}
              setValue={chart.actions.setChartTitle}
              showIntroduction={!true}
              textColor={chart.settings.state.textColor}
            />
          ) : null
        }
        list={
          <DynamicList
            chart={chart}
            isDragging={isDragging}
            showAlbums={chart.settings.state.showAlbums}
          />
        }
        chart={
          <DesktopChart
            borderColor={chart.settings.state.borderColor}
            borderSize={chart.settings.state.borderSize}
            isReadOnly={readonly}
            items={chart.state.numberedList}
          />
        }
      />
    )}
  </>
);

export default DesktopEditor;
