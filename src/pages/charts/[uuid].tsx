import { ChartSettings } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { a } from "react-spring";
import DesktopEditor from "../../components/global/DesktopEditor/DesktopEditor";
import SidebarNav from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import useChart from "../../frontend/hooks/use-chart";
import { Album } from "../../types/Albums";
import { trpc } from "../../utils/trpc";
import Layout from "../create-chart/Layout";
import { genUuid } from "../mobile/charts/[uuid]";

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
  const [page, setPage] = useState('editor');
  const {
    pageOpacity,
    animateFadeOut,
    animateFadeIn,
  } = usePageFadeIn();
  const {
    isLoading,
    titleStyle,
    listStyles,
    chart,
  } = useChart({
    albums,
    chartName,
    settings,
  });
  
  return (
    <Layout>
      <a.div
        style={pageOpacity}
        className="overflow-x-visible h-full"
      >
      </a.div>
      <SidebarNav
       page={page}
       setPage={(page) => {
         animateFadeOut(() => {
           setPage(page);
           animateFadeIn();
         });  
       }}
      />
      <a.div style={pageOpacity} className="h-full">
        {page === 'editor' 
          ? (
              <DesktopEditor
                chart={chart}
                listStyles={listStyles}
                readonly={true}
                isLoading={isLoading}
                titleStyle={titleStyle}
              />
            )
          : null
        }
      </a.div>
    </Layout>
  )
};

export default ApiWrapper;
