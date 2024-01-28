import React from 'react';
import { CHART_TEMPLATES } from '../../../../constants/chart-types';
import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { ChartFormat } from '../DesktopPreview/DesktopPreview';

export interface Props {
  chart: React.ReactNode;
  chartNode: ChartHookNode;
  list: React.ReactNode;
  title: React.ReactNode;
  uuid: string;
}

const getWidth = (chart: ChartHookNode) => {
  if (
    chart &&
    chart.settings &&
    chart.settings.state &&
    chart.settings.state.chartFormat
  ) {
    const width = (
      CHART_TEMPLATES.get(chart.settings.state.chartFormat) as ChartFormat
    ).list.width;

    if (width) {
      return width;
    }
  }

  return 240;
};

const Layout: React.FC<Props> = ({ chart, chartNode, list, title, uuid }) => (
  <div
    key={uuid}
    className="box-content flex h-full flex-row justify-between overflow-y-auto pt-4"
  >
    {/* this is a hack to ensure the basis widths in CHART_TEMPLATES are compiled in the included css classes so the rules will actually work */}
    <div
      style={{ display: 'none' }}
      className="basis-[400px] basis-[300px] basis-[340px] basis-[240px]"
    />
    <div className="relative flex h-screen w-full flex-col items-center gap-8 overflow-y-hidden px-4">
      <div className="min-h-min w-full">{title}</div>
      <div className="flex w-full justify-between overflow-y-auto">
        {/** DESKTOP_CHART_WIDTH */}
        <div className={`basis-[${getWidth(chartNode)}px]`}>{chart}</div>
        <div className="shrink-0 grow basis-1/3">{list}</div>
      </div>
    </div>
  </div>
);

export default Layout;
