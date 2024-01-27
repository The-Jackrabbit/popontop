import React from 'react';
import { trpc } from '../../../../../server/utils/trpc';
import { Loader } from './Loader';
import { genUuid } from '../../../../../pages/mobile/charts/[uuid]';
import { ChartSettings } from '@prisma/client';
import { Album } from '../../../../../types/Albums';
import DesktopEditor from '../../DesktopEditor/DesktopEditor';
import useChart from '../../../../../frontend/hooks/use-chart/use-chart';

const ApiWrapper = ({ uuid }: { uuid: string }) => {
  const n = genUuid(uuid);

  const { data, isLoading } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      cacheTime: 0,
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !data) {
    return <Loader />;
  }

  if (!data?.albums || !data.uuid) {
    return <div>error</div>;
  }

  if (!data) {
    return <div>not found</div>;
  }

  return (
    <ViewChart
      albums={data.albums}
      name={data?.name}
      settings={data?.settings ?? undefined}
      uuid={data.uuid}
    />
  );
};

export const ViewChart: React.FC<{
  albums: Album[];
  name: string;
  settings?: ChartSettings;
  uuid: string;
}> = ({ albums, name, settings, uuid }) => {
  const chart = useChart({
    initialSettings: settings,
    chartUuid: uuid,
    initialChartTitle: name,
    initialList: albums,
  });

  return (
    <div
      style={
        chart.settings.state.backgroundColor
          ? {
              backgroundColor: chart.settings.state.backgroundColor,
            }
          : {}
      }
    >
      <DesktopEditor
        isDragging={false}
        chart={chart}
        readonly={false}
        showOnboardingFlow={false}
      />
    </div>
  );
};

export default ApiWrapper;
