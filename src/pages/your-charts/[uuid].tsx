import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ViewChart } from '../../components/global/Desktop/YourCharts/ViewChart/ViewChart';
import { trpc } from '../../utils/trpc';
import { genUuid } from '../mobile/charts/[uuid]';
import SharedWrapper from './SharedWrapper';

export const ViewYourChart: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      enabled: true, // disable this query from automatically running
    }
  );

  const isDoneLoading =
    data && data?.albums?.length > 0 && data.name && data.settings;

  if (!isDoneLoading) {
    return null;
  }

  return (
    <SharedWrapper
      page={
        <div className="h-full">
          <ViewChart chartUuid={n} />
        </div>
      }
    />
  );
};

export default ViewYourChart;
