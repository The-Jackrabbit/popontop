import type { NextPage } from 'next';
import Layout from '../create-chart/Layout';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { colorMap } from '../../constants/colors';

const Credits: NextPage = () => {
  return (
    <Layout
      actions={null}
      backgroundColor={undefined}
      hasActions={false}
      pageContent={<div>credits will be here</div>}
      sidebar={
        <SidebarLayout
          nav={<SidebarNav />}
          title={
            <>
              <h1 className="text-4xl font-bold">credits</h1>
              <div
                className={`
                  ${colorMap.blue}
                  my-4
                  h-1 w-full rounded-full shadow-md
                `}
              />
            </>
          }
          sidebarContent={
            <div className="h-full overflow-x-visible">
            </div>
          }
        />
        }
    />
  );
};

export default Credits;
