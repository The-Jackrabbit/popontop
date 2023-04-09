import { a } from 'react-spring';
import { SidebarNav } from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import Layout from '../create-chart/Layout';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';
import { useRouter } from 'next/router';

const SharedWrapper: React.FC<{
  activeChartUuid?: string;
  page: React.ReactNode;
}> = ({
  activeChartUuid,
  page,
}) => {
  const router = useRouter();

  return (
    <Layout
      actions={null}
      backgroundColor={''}
      hasActions={false}
      pageContent={page}
      sidebar={
        <SidebarLayout
          nav={<SidebarNav />}
          sidebarContent={
            <div className="h-full overflow-x-visible">
              <ListOfCharts
                isMobile={false}
                activeChartUuid={activeChartUuid}
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
};

export default SharedWrapper;

export function DefaultContent() {
  return (
    <a.div className="h-full">
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
    </a.div>
  );
}
