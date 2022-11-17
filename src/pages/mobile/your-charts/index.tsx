import { NextPage } from "next";
import { useRouter } from "next/router";
import ActionBar from "../../../components/global/MobileEditor/ActionBar/ActionBar";
import { ListRowMode } from "../../../components/lib/Mobile/ListRow/ListRow";
import MobilePage from "../../../components/lib/MobilePage/MobilePage";
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
        <ActionBar
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
