import React from 'react';

export interface Props {
  backgroundColor: string;
  isReadonly: boolean;
  title: React.ReactNode;
  chart: React.ReactNode;
  list: React.ReactNode;
  actions: React.ReactNode;
}

const Layout: React.FC<Props> = ({ 
  backgroundColor,
  isReadonly,
  title,
  chart,
  list,
  actions,
}) => (
  <div
    className="flex flex-row h-full justify-between"
  >
    <div style={{ backgroundColor }}>
      <div className="flex flex-col items-center px-4 relative">
        {title}
        <div>
          {chart}
        </div>
      </div>

      {list}
      </div>
    <div
      className="
        border-neutral-300 dark:border-neutral-800 border-l-2
        flex flex-col justify-between
        pl-4
      "
    >
      {!isReadonly
        ? actions
        : null
      }
    </div>
  </div>
);

export default Layout;
