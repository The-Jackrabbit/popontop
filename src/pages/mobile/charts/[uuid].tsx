import { NextPage } from 'next';
import { useRouter } from 'next/router'
import List from '../../../components/global/MobileEditor/List/List';
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
  
  return (

    <div className="w-screen p-4">
      <div className="rounded-lg bg-white dark:bg-[#0a0a0a]
        px-6 py-4 sm:px-4 sm:py-3
        overflow-hidden">
        <div
          className="
            flex justify-between text-lg  text-neutral-500 dark:text-neutral-200
          "
        >
          <p>{data?.name}</p>
        </div>
      </div>
     
      <List
        isInteractive={false}
        list={data?.albums ?? []}
        removeAlbumAtIndex={() => undefined}
        advanceAlbumAtIndex={() => undefined}
        lowerAlbumAtIndex={() => undefined}
        openRearrangeView={() => undefined}
      />
    </div>
  )
}

export default ChartPage;