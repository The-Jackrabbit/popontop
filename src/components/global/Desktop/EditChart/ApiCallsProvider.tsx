import { genUuid } from '../../../../pages/mobile/charts/[uuid]';
import { trpc } from '../../../../server/utils/trpc';
import EditChart from './EditChart';
import { EditChartLoader } from './Loader';

export interface Props {
  uuid: string;
}

const ApiCallsProvider: React.FC<Props> = ({ uuid }) => {
  const n = genUuid(uuid);

  const { data, isLoading } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !data) {
    return <EditChartLoader isChartOwner={true} />;
  }

  return (
    <EditChart
      albums={data.albums}
      chartName={data.name}
      chartUuid={uuid as string}
      isChartOwner={!data.isReadOnly}
      initialSettings={data.settings ?? undefined}
    />
  );
};

export default ApiCallsProvider;
