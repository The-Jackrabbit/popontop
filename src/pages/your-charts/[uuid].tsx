import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ViewChart from '../../components/global/Desktop/YourCharts/ViewChart/ViewChart';
import ActionButton from '../../components/global/DesktopEditor/Actions/ActionButton/ActionButton';
import { DesktopActions } from '../../components/global/DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../../components/global/DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import { SidebarLayout } from '../../components/global/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { ICON_STYLE } from '../../components/lib/FilterButton/FilterButton';
import { ListOfCharts } from '../../components/lib/ListOfCharts/ListOfCharts';
import { trpc } from '../../utils/trpc';
import DesktopPage from '../../components/lib/DesktopPage/DesktopPage';

const YourCharts: React.FC = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  const { data, isLoading } = trpc.charts.getUserCharts.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <DesktopPage
      actions={
        <DesktopActions
          topSection={
            <Link href={`/charts/${uuid}`}>
              <ActionButton
                label="Edit chart"
                onClick={() => undefined}
                text={<ArrowRightIcon className={ICON_STYLE} />}
              />
            </Link>
          }
          bottomSection={<ProfileCircle />}
        />
      }
      backgroundColor={''}
      hasActions={true}
      pageContent={
        <div className="h-full">
          <ViewChart />
        </div>
      }
      sidebar={
        <SidebarLayout
          title={null}
          nav={<SidebarNav />}
          sidebarContent={
            <div className="h-full overflow-x-visible">
              <ListOfCharts
                activeChartUuid={uuid}
                isLoading={isLoading}
                listOfCharts={data}
                setChartBeingViewed={(uuid: string) => {
                  router.push(`/your-charts/${uuid}`);
                }}
                titleText="preview chart"
              />
            </div>
          }
        />
      }
    />
  );
};

export default YourCharts;
