import { NextPage } from 'next';
import { useRouter } from 'next/router'
import List from '../../../components/global/MobileEditor/List/List';
import MobileEditor from '../../../components/global/MobileEditor/MobileEditor';
import { ListRowMode } from '../../../components/lib/Mobile/ListRow/ListRow';
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

  const { data } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });

  if (!data) {
    return <p>loading</p>;
  }
  
  return (
    <MobileEditor
      chartName={data.name}
      chartUuid={uuid as string}
      initialList={data.albums}
      initialSettings={data.settings}
      isReadOnly={false}
    />
  );
}

export default ChartPage;