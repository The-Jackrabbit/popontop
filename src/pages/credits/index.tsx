import type { NextPage } from 'next';
import Layout from '../create-chart/Layout';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { colorMap } from '../../constants/colors';
import Image from 'next/image';
import { DesktopActions } from '../../components/global/DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../../components/global/DesktopEditor/Actions/ProfileCircle/ProfileCircle';

const Credits: NextPage = () => {
  return (
    <Layout
      actions={
        <DesktopActions bottomSection={<ProfileCircle />} topSection={null} />
      }
      backgroundColor={undefined}
      hasActions={false}
      pageContent={
        <div>
          <div className="float-left mr-8">
            <Image
              src="/assets/dads-record-bin.png"
              width={`${1318 * 0.3}px`}
              height={`${1474 * 0.3}px`}
              alt="dads-record-bin-example"
            />
          </div>
          <h1 className="mb-4 text-2xl font-bold">tutorial</h1>
          <ol className="inline list-inside list-decimal text-lg">
            <li>
              To search for albums to add to the chart, type the name of an
              album into the{' '}
              <code>
                {'"'}Search albums{'"'}
              </code>{' '}
              pill and press Enter. The chart will display a list of search
              results.
            </li>
            <li>
              If you are the owner of the chart, you will see some customization
              options in the sidebar.
            </li>
            <li>
              I havent added a color picker just yet, so typing will have to do.
              A limited set of plain english colors work, hex, and rgb are also
              supported.
            </li>
            <li>
              To toggle whether the chart displays a list of albums, click on
              the{' '}
              <code>
                {'"'}list albums?{'"'}
              </code>{' '}
              switch and toggle it on or off.
            </li>
            <li>
              To toggle whether the chart displays a title, click on the{' '}
              <code>
                {'"'}show title?{'"'}
              </code>{' '}
              switch and toggle it on or off.
            </li>
            <li>
              To add an album to the chart, click on the album in the search
              results.
            </li>
            <li>
              To save your changes, click the{' '}
              <code>
                {'"'}Save{'"'}
              </code>{' '}
              button.
            </li>
          </ol>
        </div>
      }
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
          sidebarContent={<div className="h-full overflow-x-visible"></div>}
        />
      }
    />
  );
};

export default Credits;
