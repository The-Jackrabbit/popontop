import { NextPage } from 'next';
import { useRouter } from 'next/router'
import List from '../../../components/global/MobileEditor/List/List';
import MobileEditor from '../../../components/global/MobileEditor/MobileEditor';
import { ListRowMode } from '../../../components/lib/Mobile/ListRow/ListRow';
import { UseChartListContext } from '../../../frontend/hooks/use-chart-list';
import { trpc } from '../../../utils/trpc';

export const genUuid = (uuid: string | string[] | undefined): string  => {
  if (typeof uuid === 'string' ) {
    return uuid;
  }
  return uuid && uuid.length > 0 ? uuid[0] as string : '';
}

const ChartPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data, isLoading } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });

  return (
    <MobileEditor
      chartName={data?.name}
      chartUuid={uuid as string}
      context={UseChartListContext.EDIT}
      initialList={data?.albums}
      initialSettings={data?.settings}
      isLoading={isLoading}
      isReadOnly={data?.isReadOnly}
    />
  );
}

export default ChartPage;