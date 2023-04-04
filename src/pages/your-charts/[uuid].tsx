import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { a } from 'react-spring';
import { ViewChart } from '../../components/global/Desktop/YourCharts/ViewChart/ViewChart';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import { usePageFadeIn } from '../../frontend/hooks/springs/use-page-fade-in';
import { trpc } from '../../utils/trpc';
import Layout from '../create-chart/Layout';
import { genUuid } from '../mobile/charts/[uuid]';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';

export const ViewYourChart: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const n = genUuid(uuid);

  const { data } = trpc.charts.getById.useQuery(
    { uuid: n },
    {
      enabled: true, // disable this query from automatically running
    }
  );

  const { pageOpacity, animateFadeIn } = usePageFadeIn();
  useEffect(() => {
    animateFadeIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDoneLoading =
    data && data?.albums?.length > 0 && data.name && data.settings;

  if (!isDoneLoading) {
    return null;
  }

  return (
    <Layout
      actions={null}
      backgroundColor=""
      pageContent={
        <a.div style={pageOpacity} className="h-full">
          <ViewChart chartUuid={n} />
        </a.div>
      }
      sidebar={
        <SidebarLayout
          nav={<SidebarNav />}
          sidebarContent={
            <a.div style={pageOpacity} className="h-full overflow-x-visible">
              <ListOfCharts isMobile={false} titleText={data.name} />
            </a.div>
          }
        />
      }
    />
  );
};

export default ViewYourChart;
