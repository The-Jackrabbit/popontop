import { NextPage } from 'next';
import { useRouter } from 'next/router';
import MobileEditor from '../../../components/global/MobileEditor/MobileEditor';
import { UseChartListContext } from '../../../frontend/hooks/singletons/use-mobile-chart-editor';
import { Album } from '../../../types/Albums';
import { trpc } from '../../../utils/trpc';

export const genUuid = (uuid: string | string[] | undefined): string => {
  if (typeof uuid === 'string') {
    return uuid;
  }
  return uuid && uuid.length > 0 ? (uuid[0] as string) : '';
};

const ChartPage: NextPage = () => {
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

  return (
    <MobileEditor
      chartName={data?.name}
      chartUuid={uuid as string}
      context={UseChartListContext.EDIT}
      initialList={
        data?.albums?.length && data?.albums?.length > 0
          ? data?.albums
          : ([] as Album[])
      }
      initialSettings={data?.settings}
      isLoading={isLoading}
      isReadOnly={data?.isReadOnly}
    />
  );
};

export default ChartPage;
