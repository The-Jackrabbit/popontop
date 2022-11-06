import React from 'react';

export interface Props {
  isReadonly: boolean;
  title: React.ReactNode;
  chart: React.ReactNode;
  list: React.ReactNode;
  actions: React.ReactNode;
}

const Layout: React.FC<Props> = ({ 
  isReadonly,
  title,
  chart,
  list,
  actions,
}) => (
  <div className="flex flex-row h-full justify-between">

    <div className="flex flex-col items-center px-4">
      {title}
      {chart}
    </div>

    {list}
    <div className="
      border-neutral-300 dark:border-neutral-800 border-l-2
      flex flex-col justify-between
      pl-4
    ">
      {!isReadonly
        ? actions
        : null
      }
    </div>
  </div>
);

export default Layout;
