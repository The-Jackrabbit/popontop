import { ChartSettings } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { a } from "react-spring";
import DesktopEditor from "../../components/global/DesktopEditor/DesktopEditor";
import SidebarNav from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import { Album } from "../../styles/types/Albums";
import { trpc } from "../../utils/trpc";
import Layout from "../create-chart/Layout";
import { genUuid } from "../mobile/charts/[uuid]";
import useDesktopChartEditor from "../../frontend/hooks/singletons/use-desktop-chart-editor";

const ApiWrapper: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery({ uuid: n }, {
    enabled: true, // disable this query from automatically running
  });

  const isDoneLoading = data && data?.albums?.length > 0 && data.name && data.settings;

  if (!isDoneLoading) {
    return null;
  }

  return (
    <Chart
      albums={data.albums}
      chartName={data.name}
      settings={data.settings}
    />
  )
};

const Chart = ({
  albums,
  chartName,
  settings,
}: { 
  albums: Album[];
  chartName: string;
  settings: ChartSettings | null;
}) => {
  const {
    pageOpacity,
    animateFadeOut,
    animateFadeIn,
  } = usePageFadeIn();
  const { childrenNodes: { chart }, state } = useDesktopChartEditor({
    initialList: albums,
    chartName,
    defaultSettings: settings, 
  });
  
  return (
    <Layout>
      <a.div
        style={pageOpacity}
        className="overflow-x-visible h-full"
      >
      </a.div>
      <SidebarNav
        page={'editor'}
        setPage={() => {
          animateFadeOut(() => animateFadeIn());  
        }}
      />
      <a.div style={pageOpacity} className="h-full">
        <DesktopEditor
          chart={chart}
          listStyles={state.listStyle}
          readonly={true}
          isLoading={chart.state.isEditLoading}
          titleStyle={state.titleStyle}
        />
      </a.div>
    </Layout>
  )
};

export default ApiWrapper;
