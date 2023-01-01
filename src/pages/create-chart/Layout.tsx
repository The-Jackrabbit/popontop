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
          w-[90%]
          max-w-[1200px]
          md:w-[80%] 
          lg:w-[70%] 
          xl:w-[80%]
        "
      >
        <div className="shrink-0 grow basis-3/12">{sidebar}</div>
        <div
          // border-4 border-purple-500
          className="
            shrink grow-0
            basis-8/12
            p-4
          "
          style={{ backgroundColor }}
        >
          {pageContent}
        </div>
        <div
          className="
          flex shrink-0
          basis-1/12 flex-col justify-between
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
