import type { NextPage } from "next";
import { useRouter } from "next/router";
import DesktopEditor from "../../components/global/DesktopEditor/DesktopEditor";
import { trpc } from "../../utils/trpc";
import { genUuid } from "../mobile/charts/[uuid]";


const Chart: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  console.log({ n })

  const { data } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });
  
  return (

    <div className="w-screen p-4">
      <div className="rounded-lg bg-white dark:bg-[#0a0a0a]
        px-6 py-4 sm:px-4 sm:py-3
        overflow-hidden">
        <div className=" flex justify-between text-lg text-neutral-500 dark:text-neutral-200">
          <p>{data?.name}</p>
        </div>
      </div>
      {data && data?.albums?.length > 0 && (
        <DesktopEditor
          readonly={true}
          albums={data?.albums}
          chartName={data?.name}
        />
      )}
    </div>
  )
};

export default Chart;
