import { SidebarNav } from '../../DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import SidebarLayout from '../../../../components/global/DesktopEditor/Sidebar/Layout';
import { useRouter } from 'next/router';
import Layout from '../../../../pages/create-chart/Layout';
import { ListOfCharts } from '../../../lib/ListOfCharts/ListOfCharts';
import { DesktopActions } from '../../DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../../DesktopEditor/Actions/ProfileCircle/ProfileCircle';

const SearchResultsWrapper: React.FC<{
  activeChartUuid?: string;
  page: React.ReactNode;
}> = ({ activeChartUuid, page }) => {
  const router = useRouter();

  return (
    <Layout
      actions={
        <DesktopActions topSection={<></>} bottomSection={<ProfileCircle />} />
      }
      backgroundColor={''}
      hasActions={true}
      pageContent={page}
      sidebar={
        <SidebarLayout
          title={null}
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

export default SearchResultsWrapper;
