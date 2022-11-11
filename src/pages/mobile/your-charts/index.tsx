import { NextPage } from "next";
import { useRouter } from "next/router";
import { ActionBar } from "../../../components/global/MobileEditor/ActionBar/ActionBar";
import { useDragSheetDown } from "../../../frontend/hooks/use-drag-sheet-down";
import { trpc } from "../../../utils/trpc";

const height = 667;
const YourCharts: NextPage = () => {
  const { data } = trpc.charts.getUserCharts.useQuery();
  const router = useRouter();
  const {

    windowHeight,
  } = useDragSheetDown(height, () => undefined);

  if (!data) {
    return <p>loading...</p>
  }
  
  return (
    <div
      className="overflow-y-hidden flex "
      style={{ height: windowHeight }}
    >
      <div  
         style={{ height: windowHeight }}
      className="w-screen p-4 overflow-y-hidden">
     {/* <ActionBar
        isLoading={false}
        onClickSettings={() => undefined}
        onClickSearch={() => undefined}
        isActive={true}
        setIsActive={() => undefined}
        saveChart={() => new Promise((res) => res(''))}
        /> */}
      {data.map((chart: {
        uuid?: string;
        name?: string;
      })=> (
        <div
          className="
            absolute
            bg-neutral-200 dark:bg-neutral-900
            h-[52px]
            overflow-hidden w-full
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between
            gap-2 my-0
            "
          key={JSON.stringify(chart)}
        >
          <p onClick={() => router.push(`/mobile/charts/${chart.uuid}`)}>{chart.name}</p>
        </div>
      ))}
     
        </div>
    </div>
  );
}

export default YourCharts;
