import React from 'react';
import { trpc } from '../../../../../utils/trpc';
import { Loader } from './Loader';
import { useRouter } from 'next/router';
import { genUuid } from '../../../../../pages/mobile/charts/[uuid]';
import useDesktopChartEditor from '../../../../../frontend/hooks/singletons/use-desktop-chart-editor';
import { ChartSettings } from '@prisma/client';
import { Album } from '../../../../../types/Albums';
import DesktopEditor from '../../../DesktopEditor/DesktopEditor';

const ApiWrapper = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data, isLoading } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      cacheTime: 0,
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  const isDoneLoading =
    data && data?.albums?.length > 0 && data.name && data.settings
      ? true
      : false;

  if (isLoading || !isDoneLoading) {
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
  const {
    childrenNodes: { chart },
  } = useDesktopChartEditor({
    initialList: albums,
    chartName: name,
    chartUuid: uuid,
    initialSettings: settings,
  });
  return (
    <div
      style={{
        backgroundColor: chart.settings.state.backgroundColor,
      }}
    >
      <DesktopEditor
        chart={chart}
        readonly={false}
        showOnboardingFlow={false}
      />
    </div>
  );
};

export default ApiWrapper;
