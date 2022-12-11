import type { NextPage } from "next";
import { a } from "react-spring";
import { SidebarNav } from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import Layout from "../create-chart/Layout";
import { ListOfCharts } from "../../components/lib/ListOfCharts/ListOfCharts";
import { useState } from "react";
import { ViewChart } from "../../components/global/Desktop/YourCharts/ViewChart/ViewChart";

const YourCharts: NextPage = () => {
  const { pageOpacity, animateFadeOut, animateFadeIn } = usePageFadeIn();
  const [selectedChartUuid, setSelectedChartUuid] = useState<string | null>(null);
  return (
    <Layout>
      <a.div style={pageOpacity} className="overflow-x-visible h-full">
        <ListOfCharts
          isMobile={false}
          setChartBeingViewed={setSelectedChartUuid}
        />
      </a.div>
      <SidebarNav /> 
      <a.div style={pageOpacity} className="h-full">
        {selectedChartUuid !== null ? (
          <ViewChart chartUuid={selectedChartUuid} />
        ) : null}
      </a.div>
    </Layout>
  );
};

export default YourCharts;
