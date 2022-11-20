import type { NextPage } from "next";
import MobileEditor from "../../components/global/MobileEditor/MobileEditor";
import { UseChartListContext } from "../../frontend/hooks/use-chart-list";

const Mobile: NextPage = () => {
  return (
    <MobileEditor context={UseChartListContext.ADD} />
  );
};

export default Mobile;
