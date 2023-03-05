import React from 'react';

export interface Props {
  actions: React.ReactNode;
  backgroundColor: string;
  hasActions?: boolean;
  pageContent: React.ReactNode;
  sidebar: React.ReactNode;
}

export const LAYOUT_CONFIG_WITH_ACTIONS = {
  actions:
    'flex shrink-0 basis-1/12 flex-col justify-between border-l-2 border-neutral-300 p-4 pl-4 dark:border-neutral-800',
  pageContent: 'shrink grow-0 basis-8/12 p-4 min-w-[66.666667%]',
  sidebar: 'shrink-0 grow basis-3/12 max-w-[25%]',
};

export const LAYOUT_CONFIG_WITHOUT_ACTIONS = {
  actions: '',
  pageContent: 'shrink grow-0 basis-9/12 min-w-9/12 min-w-[75%] p-4',
  sidebar: 'shrink-0 grow basis-3/12',
};

// Desktop App Layout
const Layout: React.FC<Props> = ({
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
        w-screen justify-center
        overflow-hidden
        min-w-[800px]
      "
    >
      <div
        // app
        // border-4 border-amber-500
        className="
          flex
          w-[90%]
          max-w-[1200px]
          md:w-[768px] 
          lg:w-[830px]
          xl:w-[1200px]
        "
      >
        <div className={layoutStyle.sidebar}>{sidebar}</div>
        <div
          // border-4 border-purple-500
          className={layoutStyle.pageContent}
          style={{ backgroundColor }}
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

export default Layout;
