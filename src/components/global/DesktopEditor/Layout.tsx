import React from 'react';

export interface Props {
  chart: React.ReactNode;
  list: React.ReactNode;
  title: React.ReactNode;
  uuid: string;
}

const Layout: React.FC<Props> = ({ chart, list, title, uuid }) => (
  <div key={uuid} className="flex h-full flex-row justify-between pt-4">
    <div className="relative flex h-screen w-full flex-col items-center gap-8 overflow-y-scroll px-4">
      <div className="min-h-min w-full">{title}</div>
      <div className="flex w-full justify-between">
        {/** DESKTOP_CHART_WIDTH */}
        <div className="basis-[260px]">{chart}</div>
        <div className="shrink-0 grow basis-1/3">{list}</div>
      </div>
    </div>
  </div>
);

export default Layout;
