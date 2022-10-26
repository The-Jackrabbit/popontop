import { uniqueId } from 'lodash';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { useState } from 'react';
import List from '../../components/global/MobileEditor/List/List';
import { trpc } from '../../utils/trpc';
const genUuid = (uuid: string | string[] | undefined): string  => {
  if (typeof uuid === 'string' ) {
    return uuid;
  }
  return uuid && uuid.length > 0 ? uuid[0] as string : '';
}

const ChartPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;


  const n = genUuid(uuid);
  console.log({ n })
  const { data, isLoading, refetch, isFetching } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });

  if (data) {
    debugger;
  }
  
  return (
    <>
      <List
        list={data?.albums ?? []}
        removeAlbumAtIndex={() => undefined}
        advanceAlbumAtIndex={() => undefined}
        lowerAlbumAtIndex={() => undefined}
      />
    </>
  )
}

export default ChartPage;