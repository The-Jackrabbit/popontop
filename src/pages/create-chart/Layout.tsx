import React from 'react';

export interface Props {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
}

// Desktop App Layout
const Layout: React.FC<Props> = ({ children }) => {
  if (!children || children.length < 3) {
    return null;
  }
  const sidebarComponent = children[0];
  const bottomNavComponent = children[1];
  const subPageComponent = children[2];

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
          px-4
          py-4 md:w-[945px]
          lg:w-[1200px] 
        "
      >
        <div
          // border-4 border-red-500
          className="
            flex
            w-3/12 flex-col justify-between
            border-r-2
            border-neutral-300  px-4 dark:border-neutral-800
          "
        >
          <div
            // border-4 border-green-500
            className="
           
            "
          >
            {sidebarComponent}
          </div>
          <div
            // border-4 border-blue-500
            className="
              basis-auto
            "
          >
            {bottomNavComponent}
          </div>
        </div>
        <div
          // border-4 border-purple-500
          className="
            w-9/12
          "
        >
          {subPageComponent}
        </div>
      </div>
    </div>
  );
};

export default Layout;
