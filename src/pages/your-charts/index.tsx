import { useRouter } from 'next/router';
import React from 'react';
import { SidebarLayout } from '../../components/global/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import Layout from '../create-chart/Layout';

export function YourCharts() {
  const router = useRouter();

  return (
    <Layout
      actions={null}
      hasActions={false}
      pageContent={
        <div className="h-full p-4">
          <div className="px-4">
            <h1 className="mb-8 text-4xl font-bold">
              Welcome to your charts list!
            </h1>
            <ul className="list-inside list-disc text-xl">
              <li>
                To view a chart, click the chart you wanna see on the left
              </li>
              <li>
                From there, you can share these charts, edit them further, or
                delete them
              </li>
              <li>[TODO] Allow for sorting by chart size, created at, etc</li>
            </ul>
          </div>
        </div>
      }
      sidebar={
        <SidebarLayout
          title={null}
          nav={<SidebarNav />}
          sidebarContent={
            <div className="h-full overflow-x-visible">
              <ListOfCharts
                isMobile={false}
                activeChartUuid=""
                setChartBeingViewed={(uuid: string) => {
                  router.push(`/your-charts/${uuid}`);
                }}
              />
            </div>
          }
        />
      }
    />
  );
}

export default YourCharts;
