import React from 'react';
import { colorMap } from '../../../../../constants/colors';
import { Color } from './SidebarNav/NavDot/NavDot';
import Layout from './Layout';
import SidebarNav from './SidebarNav/SidebarNav';

export interface Props {
  pageTitle: string;
  pageTitleBorderBottom: Color;
}

export const Loader: React.FC<Props> = ({
  pageTitle,
  pageTitleBorderBottom,
}) => (
  <Layout
    title={
      <>
        <h1 className="text-4xl font-bold">{pageTitle}</h1>
        <div
          className={`
              ${colorMap[pageTitleBorderBottom]}
              my-4
              h-1 w-full rounded-full shadow-md
            `}
        />
      </>
    }
    nav={<SidebarNav />}
    sidebarContent={<></>}
  />
);

export default Loader;
export const DesktopSidebarLoader = Loader;
