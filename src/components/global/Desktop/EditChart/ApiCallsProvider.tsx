import { genUuid } from '../../../../pages/mobile/charts/[uuid]';
import { trpc } from '../../../../utils/trpc';
import EditChart from './EditChart';

export interface Props {
  uuid: string;
}

const ApiCallsProvider: React.FC<Props> = ({ uuid }) => {
  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  const isDoneLoading =
    data && data?.albums?.length > 0 && data.name && data.settings;

  if (!isDoneLoading) {
    return null;
  }

  return (
    <EditChart
      albums={data.albums}
      chartName={data.name}
      chartUuid={uuid as string}
      isChartOwner={!data.isReadOnly}
      settings={data.settings}
    />
  );
};

export default ApiCallsProvider;
