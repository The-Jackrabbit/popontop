import React from "react";

export interface Props {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
}

// Desktop App Layout
export const Layout: React.FC<Props> = ({ children }) => {
  const sidebarComponent = children[0];
  const bottomNavComponent = children[1];
  const subPageComponent = children[2];
 
  return (
    <div
    // full frame
    // border-4 border-black
    className="
        h-screen w-screen
        flex justify-center
        overflow-x-visible
      "
    >
      <div
        // app
        // border-4 border-amber-500
        className="
          min-w-[200px]
          px-4 py-4
          flex 
        "
      >
        <div
          // border-4 border-red-500
          className="

            basis-3/12 grow-0 shrink-0
            flex flex-col justify-between
            px-4
            border-neutral-300  dark:border-neutral-800 border-r-2
            "
        >
          <div
          // border-4 border-green-500
            className="
              basis-11/12
            "
          >
            {sidebarComponent}
          </div>
          <div
            // border-4 border-blue-500
            className="
              basis-auto
            ">
            {bottomNavComponent}
          </div>
        </div>
        <div
          // border-4 border-purple-500
          className="
            basis-10/12
          "
        >
          {subPageComponent}
        </div>
      </div>
      </div>
    );
  }