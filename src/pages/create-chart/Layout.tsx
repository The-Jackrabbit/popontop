import React from 'react';

export interface Props {
  actions: React.ReactNode;
  backgroundColor: string;
  pageContent: React.ReactNode;
  sidebar: React.ReactNode;
}

// Desktop App Layout
const Layout: React.FC<Props> = ({
  actions,
  backgroundColor,
  pageContent,
  sidebar,
}) => {
  return (
    <div
      // full frame
      // border-4 border-black
      className="
        flex h-screen
        w-screen justify-center
        overflow-hidden
      "
    >
      <div
        // app
        // border-4 border-amber-500
        className="
          flex
          w-[800px]
          md:w-[945px]
          lg:w-[1200px] 
        "
      >
        {sidebar}
        <div
          // border-4 border-purple-500
          className="
            w-9/12
            p-4
          "
          style={{ backgroundColor }}
        >
          {pageContent}
        </div>
        <div
          className="
          flex flex-col justify-between
          border-l-2 border-neutral-300 p-4
          pl-4
          dark:border-neutral-800
        "
        >
          {actions}
        </div>
      </div>
    </div>
  );
};

export default Layout;
