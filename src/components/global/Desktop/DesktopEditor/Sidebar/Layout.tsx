import React from 'react';

export interface Props {
  nav: React.ReactNode;
  sidebarContent: React.ReactNode;
  title: React.ReactNode;
}

const Layout: React.FC<Props> = ({ nav, sidebarContent, title }) => {
  return (
    <>
      <div
        // border-4 border-red-500
        className="
          flex h-full
          flex-col
          justify-between border-r-2
          border-neutral-300
          p-4  px-4 dark:border-neutral-800
        "
      >
        <div className="basis-1/12">{title}</div>
        <div
          // border-4 border-green-500
          className="
            basis-10/12
            overflow-y-auto
            pr-2
          "
        >
          {sidebarContent}
        </div>
        <div
          // border-4 border-blue-500
          className="
            basis-[4%]
          "
        >
          {nav}
        </div>
      </div>
    </>
  );
};

export default Layout;
export const SidebarLayout = Layout;
