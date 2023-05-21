import { useRouter } from 'next/router';
import React from 'react';
import { SidebarLayout } from '../../components/global/Desktop/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/Desktop/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import DesktopPage from '../../components/lib/DesktopPage/DesktopPage';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import { trpc } from '../../utils/trpc';

export function YourCharts() {
  const router = useRouter();
  const { data, isLoading } = trpc.charts.getUserCharts.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <DesktopPage
      actions={null}
      hasActions={false}
      pageContent={
        <div className="h-full">
          <h1 className="mb-8 text-4xl font-bold">
            Welcome to your charts list!
          </h1>
          <ul className="list-inside list-disc text-xl">
            <li>To view a chart, click the chart you wanna see on the left</li>
            <li>
              From there, you can share these charts, edit them further, or
              delete them
            </li>
            <li>[TODO] Allow for sorting by chart size, created at, etc</li>
          </ul>
        </div>
      }
      sidebar={
        <SidebarLayout
          title={null}
          nav={<SidebarNav />}
          sidebarContent={
            <div className="h-full overflow-x-visible">
              <ListOfCharts
                isLoading={isLoading}
                listOfCharts={data}
                setChartBeingViewed={(uuid: string) => {
                  router.push(`/your-charts/${uuid}`);
                }}
                titleText="your charts"
              />
            </div>
          }
        />
      }
    />
  );
}

export default YourCharts;
