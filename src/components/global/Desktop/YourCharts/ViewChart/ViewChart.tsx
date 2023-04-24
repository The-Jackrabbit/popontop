import { trpc } from '../../../../../utils/trpc';
import DesktopChart from '../../../DesktopEditor/DesktopChart/DesktopChart';
import Title from '../../../../lib/Title/Title';
import { Layout } from './Layout';
import { Loader } from './Loader';
import LinkPill from '../../../../lib/LinkPill/LinkPill';
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
  console.log({ data });
  return (
    <ViewChart
      albums={data.albums}
      name={data?.name}
      settings={data?.settings}
      uuid={data.uuid}
    />
  );
}

export const ViewChart: React.FC<{
  albums: Album[]
  name: string;
  settings: ChartSettings | null;
  uuid: string;
}> = ({
  albums,
  name,
  settings,
  uuid,
}) => {
  const {
    childrenNodes: { chart },
  } = useDesktopChartEditor({
    initialList: albums,
    chartName: name,
    chartUuid: uuid,
    defaultSettings: settings,
  });
  return (
    <Layout
      backgroundColor={chart.childrenNodes.settings.state.backgroundColor ?? ''}
      title={null}
      chart={() => (
        <>
          <DesktopEditor
            chart={chart}

            // listStyles={state.listStyle}
            readonly={false}
            showOnboardingFlow={false}
          />
        </>
      )}
      modifyChartButton={null}
    />
  );
};

export default ApiWrapper;

