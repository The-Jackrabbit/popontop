import type { NextPage } from "next";
import { a } from "react-spring";
import { SidebarNav } from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import Layout from "../create-chart/Layout";
import { ListOfCharts } from "../../components/lib/ListOfCharts/ListOfCharts";

const YourCharts: NextPage = () => {
  const { pageOpacity, animateFadeOut, animateFadeIn } = usePageFadeIn();

  return (
    <Layout>
      <a.div style={pageOpacity} className="overflow-x-visible h-full">
        <ListOfCharts />
      </a.div>
      <SidebarNav
        page="your-charts"
        setPage={() => {
          animateFadeOut(() => {
            animateFadeIn();
          });  
        }}
      />
      <a.div style={pageOpacity} className="h-full">
      </a.div>
    </Layout>
  );
};

export default YourCharts;
