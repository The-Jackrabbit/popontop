import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ActionBar from "../../../components/global/MobileEditor/ActionBar/ActionBar";
import { ListRowMode } from "../../../components/lib/Mobile/ListRow/ListRow";
import MobilePage from "../../../components/lib/MobilePage/MobilePage";
import { ROW_HEIGHT_WITH_UNIT } from "../../../frontend/hooks/use-disappear-row";
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
    <MobilePage>
      <div>
        {data.map((chart, index) => (
          <Link
          
            href={`/mobile/charts/${chart.uuid}`}
            key={JSON.stringify(chart) + index.toString()}
          >
            <div   className={`${ROW_HEIGHT_WITH_UNIT}
            w-full overflow-hidden 
            last-of-type:border-b-0
            text-neutral-900 dark:text-neutral-50
            flex justify-between gap-2
            my-0`}>
            <p>{chart.name}</p>
            <p>{chart.created_at ? chart.created_at.toDateString() : ''}</p>
            </div>
          </Link>
        ))}
        <ActionBar
          actionOverlayClassName="-translate-x-0 asdf"
          hasNonEmptyList={false}
          listMode={ListRowMode.NORMAL}
          onClickDeleteMode={() => undefined}
          onClickRearrangeMode={() => undefined} 
          isLoading={false}
          onClickSettings={() => undefined}
          onClickSearch={() => undefined}
          isActive={true}
          setIsActive={() => undefined}
          saveChart={() => new Promise((res) => res(''))}
        />
      </div>
    </MobilePage>
  );
}

export default YourCharts;
