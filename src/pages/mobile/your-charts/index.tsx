import { NextPage } from "next";
import { useRouter } from "next/router";
import { ActionBar } from "../../../components/global/MobileEditor/ActionBar/ActionBar";
import { trpc } from "../../../utils/trpc";

const YourCharts: NextPage = () => {
  const { data } = trpc.charts.getUserCharts.useQuery();
  const router = useRouter();

  if (!data) {
    return <p>loading...</p>
  }
  return (
    <div>
      {data.map((chart: {
        uuid?: string;
        name?: string;
      })=> (
        <div key={JSON.stringify(chart)}>
          <p onClick={() => router.push(`/mobile/charts/${chart.uuid}`)}>{chart.name}</p>
        </div>
      ))}
      <ActionBar
        isLoading={false}
        onClickSettings={() => undefined}
        onClickSearch={() => undefined}
        isActive={false}
        setIsActive={() => undefined}
        saveChart={() => undefined}
     />
    </div>
  );
}

export default YourCharts;
