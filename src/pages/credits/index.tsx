import type { NextPage } from 'next';
import Layout from '../create-chart/Layout';
import SidebarLayout from '../../components/global/DesktopEditor/Sidebar/Layout';
import SidebarNav from '../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav';
import { colorMap } from '../../constants/colors';
import Image from 'next/image';

const Credits: NextPage = () => {
  return (
    <Layout
      actions={null}
      backgroundColor={undefined}
      hasActions={false}
      pageContent={
        <div className="">
          <figure className="mx-auto my-8 flex max-w-sm flex-row items-end">
            <Image
              src="/assets/dads-record-bin.png"
              width={`${1318 * 0.3}px`}
              height={`${1474 * 0.3}px`}
              className="self-end"
              alt="dads-record-bin-example"
            />
            <figcaption className="bg-gray-100 p-2 text-center">
              <ol className="inline list-inside list-decimal text-sm">
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
                  If you are the owner of the chart, you will see some
                  customization options in the sidebar.
                </li>
                <li>
                  To change the background color of the chart{"'"}s title, click
                  on the{' '}
                  <code>
                    {'"'}Title background color{'"'}
                  </code>{' '}
                  pill and select a color from the color picker.
                </li>
                <li>
                  To change the background color of the chart, click on the{' '}
                  <code>
                    {'"'}Background color{'"'}
                  </code>{' '}
                  pill and select a color from the color picker.
                </li>
                <li>
                  To change the text color of the chart, click on the{' '}
                  <code>
                    {'"'}Text color{'"'}
                  </code>{' '}
                  pill and select a color from the color picker.
                </li>
                <li>
                  To change the border color of the chart, click on the{' '}
                  <code>
                    {'"'}Border color{'"'}
                  </code>{' '}
                  pill and select a color from the color picker.
                </li>
                <li>
                  To toggle whether the chart displays a list of albums, click
                  on the{' '}
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
                  To remove an album from the chart, click on the{' '}
                  <code>
                    {'"'}x{'"'}
                  </code>{' '}
                  button next to the album in the chart.
                </li>
                <li>
                  To save your changes, click the{' '}
                  <code>
                    {'"'}Save{'"'}
                  </code>{' '}
                  button.
                </li>
              </ol>
            </figcaption>
          </figure>
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
              <h2 className="text-sm font-bold">Tutorial</h2>
            </>
          }
          sidebarContent={<div className="h-full overflow-x-visible"></div>}
        />
      }
    />
  );
};

export default Credits;
