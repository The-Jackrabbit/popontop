import React from 'react';

export interface Props {
  isReadonly: boolean;
  sidebar: React.ReactNode;
  title: React.ReactNode;
  chart: React.ReactNode;
  list: React.ReactNode;
  actions: React.ReactNode;
}

const Layout: React.FC<Props> = ({ 
  isReadonly,
  sidebar,
  title,
  chart,
  list,
  actions,
}) => (
  <div className="flex flex-row basis-[content]">
    {!isReadonly && (
      <div className="sidebar-container">{sidebar}</div>
    )}
    <div className="flex justify-center">
      <div className="flex flex-col items-center basis-[65%] px-4 py-8">
        {title}
        {chart}
      </div>
    </div>
    {list}
    {!isReadonly
      ? actions
      : null
    }
  </div>
);

export default Layout;
