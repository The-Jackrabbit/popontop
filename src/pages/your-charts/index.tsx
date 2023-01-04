import type { NextPage } from 'next';
import { a } from 'react-spring';
import { SidebarNav } from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { usePageFadeIn } from '../../frontend/hooks/springs/use-page-fade-in';
import Layout from '../create-chart/Layout';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import { useEffect, useState } from 'react';
import { ViewChart } from '../../components/global/Desktop/YourCharts/ViewChart/ViewChart';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';

const YourCharts: NextPage = () => {
  const { pageOpacity, animateFadeIn } = usePageFadeIn();
  useEffect(() => {
    animateFadeIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedChartUuid, setSelectedChartUuid] = useState<string | null>(
    null
  );
  return (
    <Layout
      actions={null}
      backgroundColor={''}
      hasActions={false}
      pageContent={
        <a.div style={pageOpacity} className="h-full">
          {selectedChartUuid !== null ? (
            <ViewChart chartUuid={selectedChartUuid} />
          ) : (
            <div className="px-4">
              <h1 className="mb-8 text-4xl font-bold">
                Welcome to your charts list!
              </h1>
              <ul className="list-inside list-disc text-xl">
                <li>
                  To view a chart, simply click the chart you wanna see on the
                  left
                </li>
                <li>
                  From there, you can share these charts, edit them further, or
                  delete them
                </li>
                <li>[TODO] Allow for sorting by chart size, created at, etc</li>
              </ul>
            </div>
          )}
        </a.div>
      }
      sidebar={
        <SidebarLayout
          nav={<SidebarNav />}
          sidebarContent={
            <a.div style={pageOpacity} className="h-full overflow-x-visible">
              <ListOfCharts
                isMobile={false}
                setChartBeingViewed={setSelectedChartUuid}
              />
            </a.div>
          }
        />
      }
    />
  );
};

export default YourCharts;
