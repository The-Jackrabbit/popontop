import type { NextPage } from "next";
import { useRouter } from "next/router";
import DesktopEditor from "../../components/global/DesktopEditor/DesktopEditor";
import { trpc } from "../../utils/trpc";
import { genUuid } from "../mobile/charts/[uuid]";


const Chart: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });
  
  return (
    <div className="w-screen p-4">
      {data && data?.albums?.length > 0 && (
        <DesktopEditor
          readonly={true}
          albums={data?.albums}
          chartName={data?.name}
          settings={data?.settings ?? null}
        />
      )}
    </div>
  )
};

export default Chart;
