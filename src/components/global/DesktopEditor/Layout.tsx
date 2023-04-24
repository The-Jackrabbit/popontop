import React from 'react';

export interface Props {
  backgroundColor: string;
  chart: React.ReactNode;
  list: React.ReactNode;
  title: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  backgroundColor,
  chart,
  list,
  title,
}) => (
  <div
    style={{ backgroundColor }}
    className="flex h-full flex-row justify-between"
  >
    <div className="overflow-y-scroll h-screen relative flex w-full flex-col items-center gap-8 px-4">
      <div className="pt-4 min-h-min w-full">{title}</div>
      <div className="flex w-full justify-between">
        {/** DESKTOP_CHART_WIDTH */}
        <div className="basis-[300px]">
          {chart}
        </div>
        <div className="basis-1/3 grow shrink-0">{list}</div>
      </div>
    </div>
  </div>
);

export default Layout;
