import React from 'react';

export interface Props {
  actions: React.ReactNode;
  backgroundColor?: string | null;
  hasActions?: boolean;
  pageContent: React.ReactNode;
  sidebar: React.ReactNode;
}

export const LAYOUT_CONFIG_WITH_ACTIONS = {
  actions:
    'flex shrink-0 basis-1/12 max-w-[5%] flex-col justify-between border-l-2 border-neutral-300 p-4 pl-4 dark:border-neutral-800',
  pageContent: ' h-basis-8/12  min-w-[66.666667%]',
  sidebar: 'shrink-0 grow basis-3/12 max-w-[20%]',
};

export const LAYOUT_CONFIG_WITHOUT_ACTIONS = {
  actions: '',
  pageContent:
    'overflow-y-auto shrink grow-0 basis-9/12 min-w-9/12 max-w-9/12 min-w-[75%] p-4',
  sidebar: 'shrink-0 grow basis-3/12',
};

// Desktop App Layout
const DesktopPage: React.FC<Props> = ({
  actions,
  backgroundColor,
  hasActions = true,
  pageContent,
  sidebar,
}) => {
  const layoutStyle = hasActions
    ? LAYOUT_CONFIG_WITH_ACTIONS
    : LAYOUT_CONFIG_WITHOUT_ACTIONS;
  return (
    <div
      // full frame
      // border-4 border-black
      className="
        flex h-screen
        w-screen min-w-[800px]
        justify-center
        overflow-hidden
      "
    >
      <div
        // app
        // border-4 border-amber-500
        className="
          //md:bg-blue-300
          //lg:bg-red-300
          flex
          min-w-[870px]
          max-w-[1200px]
          lg:w-[1000px]
          xl:w-[90vw]
          xl:max-w-[90vw]
        "
      >
        <div className={layoutStyle.sidebar}>{sidebar}</div>
        <div
          // border-4 border-purple-500
          className={layoutStyle.pageContent}
          style={backgroundColor ? { backgroundColor } : {}}
        >
          {pageContent}
        </div>
        {hasActions ? (
          <div className={layoutStyle.actions}>{actions}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DesktopPage;
